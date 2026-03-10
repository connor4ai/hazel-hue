import type { UserId } from '@domain/shared/types';
import type { User } from '@domain/user/entities/User';
import type { Purchase } from '@domain/user/entities/Purchase';
import type { Entitlement } from '@domain/user/entities/Entitlement';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

export class ApiUserRepository implements IUserRepository {
  async getUser(userId: UserId): Promise<User | null> {
    try {
      return await apiClient.get<User>(`${endpoints.user.profile}?userId=${userId}`);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createUser(user: User): Promise<void> {
    await apiClient.post(endpoints.user.profile, user);
  }

  async updateUser(user: User): Promise<void> {
    await apiClient.put(endpoints.user.profile, user);
  }

  async getPurchases(userId: UserId): Promise<Purchase[]> {
    return apiClient.get<Purchase[]>(`${endpoints.user.purchases}?userId=${userId}`);
  }

  async createPurchase(purchase: Purchase): Promise<void> {
    await apiClient.post(endpoints.user.purchases, purchase);
  }

  async updatePurchase(purchase: Purchase): Promise<void> {
    await apiClient.put(endpoints.user.purchases, purchase);
  }

  async getEntitlements(userId: UserId): Promise<Entitlement[]> {
    return apiClient.get<Entitlement[]>(`${endpoints.user.entitlements}?userId=${userId}`);
  }

  async createEntitlement(entitlement: Entitlement): Promise<void> {
    await apiClient.post(endpoints.user.entitlements, entitlement);
  }

  async updateEntitlement(entitlement: Entitlement): Promise<void> {
    await apiClient.put(endpoints.user.entitlements, entitlement);
  }
}
