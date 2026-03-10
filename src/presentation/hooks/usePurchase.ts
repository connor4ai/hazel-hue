import { useState, useCallback, useEffect } from 'react';
import type { Contact, ExistingContact } from 'expo-contacts';
import {
  requestContactsAccess,
  shareWithContact,
  getLocalShares,
  hasUnlockedAccess,
  getRemainingShares,
  type ShareRecord,
} from '@infrastructure/sharing/ShareGateProvider';
import { REQUIRED_SHARES_TO_UNLOCK } from '@config/constants';

interface UseShareGateReturn {
  isUnlocked: boolean;
  shares: ShareRecord[];
  remainingShares: number;
  contacts: Contact[];
  isLoadingContacts: boolean;
  isSharing: boolean;
  error: string | null;
  loadContacts: () => Promise<void>;
  shareWith: (contact: Contact) => Promise<void>;
  checkUnlockStatus: () => Promise<boolean>;
}

export function useShareGate(): UseShareGateReturn {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shares, setShares] = useState<ShareRecord[]>([]);
  const [remainingShares, setRemainingShares] = useState(REQUIRED_SHARES_TO_UNLOCK);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check initial unlock state
  useEffect(() => {
    (async () => {
      const unlocked = await hasUnlockedAccess();
      const existing = await getLocalShares();
      const remaining = await getRemainingShares();
      setIsUnlocked(unlocked);
      setShares(existing);
      setRemainingShares(remaining);
    })();
  }, []);

  const loadContacts = useCallback(async () => {
    setIsLoadingContacts(true);
    setError(null);
    try {
      const list = await requestContactsAccess();
      // Filter out contacts already shared with
      const existingIds = new Set(shares.map((s) => s.contactId));
      setContacts(list.filter((c) => !existingIds.has((c as ExistingContact).id ?? '')));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
    } finally {
      setIsLoadingContacts(false);
    }
  }, [shares]);

  const shareWith = useCallback(async (contact: Contact) => {
    setIsSharing(true);
    setError(null);
    try {
      // Generate a simple referral code from userId or random
      const referralCode = `HH${Date.now().toString(36).toUpperCase()}`;
      const record = await shareWithContact(contact, referralCode);

      const updated = [...shares, record];
      setShares(updated);

      const remaining = Math.max(0, REQUIRED_SHARES_TO_UNLOCK - updated.length);
      setRemainingShares(remaining);

      if (remaining === 0) {
        setIsUnlocked(true);
      }

      // Remove shared contact from the list
      setContacts((prev) => prev.filter((c) => (c as ExistingContact).id !== (contact as ExistingContact).id));
    } catch (err) {
      if (err instanceof Error && err.message.includes('cancelled')) {
        return; // User dismissed share sheet
      }
      setError(err instanceof Error ? err.message : 'Failed to share');
    } finally {
      setIsSharing(false);
    }
  }, [shares]);

  const checkUnlockStatus = useCallback(async (): Promise<boolean> => {
    const unlocked = await hasUnlockedAccess();
    setIsUnlocked(unlocked);
    return unlocked;
  }, []);

  return {
    isUnlocked,
    shares,
    remainingShares,
    contacts,
    isLoadingContacts,
    isSharing,
    error,
    loadContacts,
    shareWith,
    checkUnlockStatus,
  };
}
