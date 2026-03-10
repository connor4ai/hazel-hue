import type { UserId } from '@domain/shared/types';
import type { User } from '../entities/User';
import type { Purchase } from '../entities/Purchase';
import type { Entitlement } from '../entities/Entitlement';

export interface IUserRepository {
  getUser(userId: UserId): Promise<User | null>;
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;

  getPurchases(userId: UserId): Promise<Purchase[]>;
  createPurchase(purchase: Purchase): Promise<void>;
  updatePurchase(purchase: Purchase): Promise<void>;

  getEntitlements(userId: UserId): Promise<Entitlement[]>;
  createEntitlement(entitlement: Entitlement): Promise<void>;
  updateEntitlement(entitlement: Entitlement): Promise<void>;
}
