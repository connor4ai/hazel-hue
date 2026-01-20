import { DatabaseStorage, type IStorage } from './storage';
import { cache } from './redis';
import type { User, UserSession, Order, PromoCode } from '@shared/schema';

/**
 * Cached storage layer that wraps DatabaseStorage with Redis caching
 * Significantly reduces database load for frequently accessed data
 */
export class CachedStorage implements IStorage {
  private storage: DatabaseStorage;
  private readonly SESSION_CACHE_TTL = 7 * 24 * 60 * 60; // 7 days
  private readonly USER_CACHE_TTL = 5 * 60; // 5 minutes
  private readonly ORDER_CACHE_TTL = 2 * 60; // 2 minutes
  private readonly PROMO_CACHE_TTL = 10 * 60; // 10 minutes

  constructor() {
    this.storage = new DatabaseStorage();
  }

  // Helper methods for cache key generation
  private sessionKey(token: string) {
    return `session:${token}`;
  }

  private userKey(id: number) {
    return `user:${id}`;
  }

  private userEmailKey(email: string) {
    return `user:email:${email}`;
  }

  private orderKey(id: number) {
    return `order:${id}`;
  }

  private orderPaymentIntentKey(paymentIntentId: string) {
    return `order:payment:${paymentIntentId}`;
  }

  private promoCodeKey(code: string) {
    return `promo:${code}`;
  }

  // User operations with caching
  async getUser(id: number): Promise<User | undefined> {
    const cached = await cache.get<User>(this.userKey(id));
    if (cached) return cached;

    const user = await this.storage.getUser(id);
    if (user) {
      await cache.set(this.userKey(id), user, this.USER_CACHE_TTL);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const cached = await cache.get<User>(this.userEmailKey(email));
    if (cached) return cached;

    const user = await this.storage.getUserByEmail(email);
    if (user) {
      await cache.set(this.userEmailKey(email), user, this.USER_CACHE_TTL);
      await cache.set(this.userKey(user.id), user, this.USER_CACHE_TTL);
    }
    return user;
  }

  async createUser(user: any): Promise<User> {
    const newUser = await this.storage.createUser(user);
    // Cache the new user
    await cache.set(this.userKey(newUser.id), newUser, this.USER_CACHE_TTL);
    if (newUser.email) {
      await cache.set(this.userEmailKey(newUser.email), newUser, this.USER_CACHE_TTL);
    }
    return newUser;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    const user = await this.storage.updateStripeCustomerId(userId, stripeCustomerId);
    // Invalidate user cache
    await cache.del(this.userKey(userId));
    if (user.email) {
      await cache.del(this.userEmailKey(user.email));
    }
    return user;
  }

  async registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
    const user = await this.storage.registerUser(email, password, firstName, lastName);
    // Cache the new user
    await cache.set(this.userKey(user.id), user, this.USER_CACHE_TTL);
    await cache.set(this.userEmailKey(email), user, this.USER_CACHE_TTL);
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    // Don't cache authentication attempts (security)
    return await this.storage.authenticateUser(email, password);
  }

  // Session operations with caching
  async createSession(userId: number): Promise<string> {
    const sessionToken = await this.storage.createSession(userId);

    // Cache the session
    const session = await this.storage.getSession(sessionToken);
    if (session) {
      await cache.set(this.sessionKey(sessionToken), session, this.SESSION_CACHE_TTL);
    }

    return sessionToken;
  }

  async getSession(sessionToken: string): Promise<UserSession | undefined> {
    // Try cache first
    const cached = await cache.get<UserSession>(this.sessionKey(sessionToken));
    if (cached) {
      // Check if still valid
      if (new Date(cached.expiresAt) > new Date()) {
        return cached;
      }
      // Expired, delete from cache
      await cache.del(this.sessionKey(sessionToken));
      return undefined;
    }

    // Not in cache, get from database
    const session = await this.storage.getSession(sessionToken);
    if (session) {
      // Cache for future requests
      const ttl = Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000);
      if (ttl > 0) {
        await cache.set(this.sessionKey(sessionToken), session, ttl);
      }
    }
    return session;
  }

  async deleteSession(sessionToken: string): Promise<void> {
    await this.storage.deleteSession(sessionToken);
    // Remove from cache
    await cache.del(this.sessionKey(sessionToken));
  }

  async getUserFromSession(sessionToken: string): Promise<User | undefined> {
    const session = await this.getSession(sessionToken);
    if (!session) return undefined;
    return await this.getUser(session.userId);
  }

  // Order operations with caching
  async getOrder(id: number): Promise<Order | undefined> {
    const cached = await cache.get<Order>(this.orderKey(id));
    if (cached) return cached;

    const order = await this.storage.getOrder(id);
    if (order) {
      await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    }
    return order;
  }

  async getOrderByPaymentIntent(paymentIntentId: string): Promise<Order | undefined> {
    const cached = await cache.get<Order>(this.orderPaymentIntentKey(paymentIntentId));
    if (cached) return cached;

    const order = await this.storage.getOrderByPaymentIntent(paymentIntentId);
    if (order) {
      await cache.set(this.orderPaymentIntentKey(paymentIntentId), order, this.ORDER_CACHE_TTL);
      await cache.set(this.orderKey(order.id), order, this.ORDER_CACHE_TTL);
    }
    return order;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    // Don't cache list operations (could be large and change frequently)
    return await this.storage.getUserOrders(userId);
  }

  async createOrder(order: any): Promise<Order> {
    const newOrder = await this.storage.createOrder(order);
    await cache.set(this.orderKey(newOrder.id), newOrder, this.ORDER_CACHE_TTL);
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.storage.updateOrderStatus(id, status);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    if (order.paymentIntentId) {
      await cache.set(this.orderPaymentIntentKey(order.paymentIntentId), order, this.ORDER_CACHE_TTL);
    }
    return order;
  }

  async updateOrderImages(id: number, images: string[]): Promise<Order> {
    const order = await this.storage.updateOrderImages(id, images);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async updateOrderAnalysis(id: number, analysisResult: any, pdfPath: string): Promise<Order> {
    const order = await this.storage.updateOrderAnalysis(id, analysisResult, pdfPath);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async updateOrderEmail(id: number, email: string): Promise<Order> {
    const order = await this.storage.updateOrderEmail(id, email);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async updateOrderEmailSent(id: number): Promise<Order> {
    const order = await this.storage.updateOrderEmailSent(id);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async updateOrderPaymentIntent(id: number, paymentIntentId: string): Promise<Order> {
    const order = await this.storage.updateOrderPaymentIntent(id, paymentIntentId);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    await cache.set(this.orderPaymentIntentKey(paymentIntentId), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async updateOrderPaymentStatus(id: number, paymentStatus: string): Promise<Order> {
    const order = await this.storage.updateOrderPaymentStatus(id, paymentStatus);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    if (order.paymentIntentId) {
      await cache.set(this.orderPaymentIntentKey(order.paymentIntentId), order, this.ORDER_CACHE_TTL);
    }
    return order;
  }

  async updateOrderPromoInfo(id: number, promoInfo: {
    originalAmount: number;
    promoCodeId: number;
    discountAmount: number;
    amount: number;
  }): Promise<Order> {
    const order = await this.storage.updateOrderPromoInfo(id, promoInfo);
    await cache.set(this.orderKey(id), order, this.ORDER_CACHE_TTL);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    // Don't cache admin operations
    return await this.storage.getAllOrders();
  }

  // Promo code operations with caching
  async getPromoCodeByCode(code: string): Promise<PromoCode | undefined> {
    const cached = await cache.get<PromoCode>(this.promoCodeKey(code));
    if (cached) return cached;

    const promoCode = await this.storage.getPromoCodeByCode(code);
    if (promoCode) {
      await cache.set(this.promoCodeKey(code), promoCode, this.PROMO_CACHE_TTL);
    }
    return promoCode;
  }

  async createPromoCode(promoCode: any): Promise<PromoCode> {
    const newPromoCode = await this.storage.createPromoCode(promoCode);
    await cache.set(this.promoCodeKey(newPromoCode.code), newPromoCode, this.PROMO_CACHE_TTL);
    return newPromoCode;
  }

  async incrementPromoCodeUsage(id: number): Promise<PromoCode> {
    const promoCode = await this.storage.incrementPromoCodeUsage(id);
    // Invalidate cache so next request gets fresh data
    await cache.del(this.promoCodeKey(promoCode.code));
    return promoCode;
  }
}

// Export singleton instance
export const storage = new CachedStorage();
