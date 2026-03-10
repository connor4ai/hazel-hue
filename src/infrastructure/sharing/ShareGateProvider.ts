import * as Contacts from 'expo-contacts';
import { Share, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHARE_BASE_URL, REQUIRED_SHARES_TO_UNLOCK } from '@config/constants';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

const SHARES_STORAGE_KEY = '@hazel_hue_shares';

export interface ShareRecord {
  contactId: string;
  contactName: string;
  sharedAt: string;
}

/**
 * Request contacts permission and return the contact list for the user to pick from.
 */
export async function requestContactsAccess(): Promise<Contacts.Contact[]> {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Contacts access is required to share with friends');
  }

  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.Name,
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Emails,
    ],
    sort: Contacts.SortTypes.FirstName,
  });

  return data.filter(
    (c) =>
      c.name &&
      ((c.phoneNumbers && c.phoneNumbers.length > 0) ||
        (c.emails && c.emails.length > 0)),
  );
}

/**
 * Share the app with a selected contact via the system share sheet.
 * Records the share locally and on the backend.
 */
export async function shareWithContact(
  contact: Contacts.Contact,
  referralCode: string,
): Promise<ShareRecord> {
  const shareUrl = `${SHARE_BASE_URL}?ref=${referralCode}`;
  const message =
    Platform.OS === 'ios'
      ? `Hey ${contact.firstName ?? ''}! I just discovered my perfect color palette with Hazel & Hue — it's free! Try it: ${shareUrl}`
      : `Hey ${contact.firstName ?? ''}! I just discovered my perfect color palette with Hazel & Hue — it's free! Try it: ${shareUrl}`;

  const result = await Share.share(
    Platform.OS === 'ios'
      ? { message, url: shareUrl }
      : { message },
    { dialogTitle: 'Share Hazel & Hue' },
  );

  if (result.action === Share.dismissedAction) {
    throw new Error('Share cancelled');
  }

  const record: ShareRecord = {
    contactId: contact.id ?? contact.name ?? '',
    contactName: contact.name ?? 'Unknown',
    sharedAt: new Date().toISOString(),
  };

  // Persist locally
  const existing = await getLocalShares();
  existing.push(record);
  await AsyncStorage.setItem(SHARES_STORAGE_KEY, JSON.stringify(existing));

  // Record on backend
  try {
    await apiClient.post(endpoints.experience.referral, {
      contactName: record.contactName,
      referralCode,
    });
  } catch {
    // Non-critical — local record is sufficient for gate check
  }

  return record;
}

/**
 * Get all locally recorded shares.
 */
export async function getLocalShares(): Promise<ShareRecord[]> {
  const raw = await AsyncStorage.getItem(SHARES_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ShareRecord[];
  } catch {
    return [];
  }
}

/**
 * Check if the user has shared with enough contacts to unlock analysis.
 */
export async function hasUnlockedAccess(): Promise<boolean> {
  const shares = await getLocalShares();
  return shares.length >= REQUIRED_SHARES_TO_UNLOCK;
}

/**
 * Get the number of remaining shares needed to unlock.
 */
export async function getRemainingShares(): Promise<number> {
  const shares = await getLocalShares();
  return Math.max(0, REQUIRED_SHARES_TO_UNLOCK - shares.length);
}
