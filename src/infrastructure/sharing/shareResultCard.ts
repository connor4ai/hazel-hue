import { Platform, Alert, Linking } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { File, Paths } from 'expo-file-system';

export type ShareTarget = 'instagram-stories' | 'tiktok' | 'camera-roll' | 'generic';

/**
 * Share the captured result card image to a specific platform.
 * `imageUri` should be a local file:// URI (from ViewShot).
 */
export async function shareResultCard(
  imageUri: string,
  target: ShareTarget,
  options?: { seasonName?: string },
): Promise<boolean> {
  switch (target) {
    case 'instagram-stories':
      return shareToInstagramStories(imageUri);
    case 'tiktok':
      return shareToTikTok(imageUri);
    case 'camera-roll':
      return saveToCameraRoll(imageUri);
    case 'generic':
      return shareGeneric(imageUri, options?.seasonName);
    default:
      return shareGeneric(imageUri, options?.seasonName);
  }
}

// ─── Instagram Stories ──────────────────────────────────────────────
async function shareToInstagramStories(imageUri: string): Promise<boolean> {
  try {
    // Check if Instagram is installed
    const igUrl = 'instagram-stories://share?source_application=com.hazelandhue.app';
    const canOpen = await Linking.canOpenURL(igUrl);

    if (!canOpen) {
      // Instagram not installed — fall back to share sheet
      // where user can pick Instagram if available
      return shareGeneric(imageUri);
    }

    // Use expo-sharing which presents the system share sheet.
    // On iOS, this lets users pick "Instagram Stories" directly.
    // On Android, it shows the intent chooser with Instagram as an option.
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(imageUri, {
        mimeType: 'image/png',
        ...(Platform.OS === 'ios' ? { UTI: 'public.png' } : {}),
        dialogTitle: 'Share to Instagram Stories',
      });
      return true;
    }

    return false;
  } catch {
    return shareGeneric(imageUri);
  }
}

// ─── TikTok ─────────────────────────────────────────────────────────
async function shareToTikTok(imageUri: string): Promise<boolean> {
  try {
    // Save to camera roll first so TikTok can access it,
    // then open TikTok's create flow.
    await saveToCameraRoll(imageUri);

    const tiktokUrl = 'snssdk1233://';
    const canOpen = await Linking.canOpenURL(tiktokUrl);

    if (canOpen) {
      await Linking.openURL(tiktokUrl);
      return true;
    }

    // TikTok not installed — let the user know it's saved
    Alert.alert(
      'Saved to Camera Roll',
      'Your palette card has been saved! Open TikTok and use it from your camera roll.',
      [{ text: 'OK' }],
    );
    return true;
  } catch {
    return shareGeneric(imageUri);
  }
}

// ─── Camera Roll ────────────────────────────────────────────────────
async function saveToCameraRoll(imageUri: string): Promise<boolean> {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'Please allow access to your photo library to save the image.',
        [{ text: 'OK' }],
      );
      return false;
    }

    // Copy from ViewShot's cache to documents directory for MediaLibrary
    const filename = `hazel-hue-palette-${Date.now()}.png`;
    const source = new File(imageUri);
    const dest = new File(Paths.document, filename);
    source.copy(dest);

    // Save to media library
    const asset = await MediaLibrary.createAssetAsync(dest.uri);

    // Organize into a Hazel & Hue album
    const album = await MediaLibrary.getAlbumAsync('Hazel & Hue');
    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    } else {
      await MediaLibrary.createAlbumAsync('Hazel & Hue', asset, false);
    }

    // Clean up temp copy
    dest.delete();

    return true;
  } catch {
    Alert.alert('Error', 'Failed to save image. Please try again.');
    return false;
  }
}

// ─── Generic Share ──────────────────────────────────────────────────
async function shareGeneric(imageUri: string, seasonName?: string): Promise<boolean> {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Sharing Not Available', 'Sharing is not available on this device.');
      return false;
    }

    await Sharing.shareAsync(imageUri, {
      mimeType: 'image/png',
      dialogTitle: seasonName
        ? `My ${seasonName} palette — Hazel & Hue`
        : 'My color palette — Hazel & Hue',
    });
    return true;
  } catch {
    return false;
  }
}
