import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  List,
  Avatar,
  Surface,
  Divider,
  Switch,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          // Handle sign out
          Alert.alert('Signed Out', 'You have been signed out successfully.');
        }},
      ]
    );
  };

  const menuItems = [
    {
      title: 'My Color Analysis',
      description: 'View your saved results',
      icon: 'color-palette',
      onPress: () => navigation.navigate('Results', { orderId: 'saved_analysis' }),
    },
    {
      title: 'Account Settings',
      description: 'Manage your account',
      icon: 'settings',
      onPress: () => Alert.alert('Coming Soon', 'Account settings will be available in a future update.'),
    },
    {
      title: 'Order History',
      description: 'View past analyses',
      icon: 'receipt',
      onPress: () => Alert.alert('Coming Soon', 'Order history will be available in a future update.'),
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      onPress: () => Alert.alert('Support', 'For support, please email us at support@huematcher.com'),
    },
    {
      title: 'About HueMatcher',
      description: 'Learn more about the app',
      icon: 'information-circle',
      onPress: () => Alert.alert('HueMatcher', 'AI-powered personal color analysis app. Version 1.0.0'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Surface style={styles.profileHeader} elevation={2}>
        <Avatar.Icon 
          size={80} 
          icon="account" 
          style={styles.avatar}
          theme={{ colors: { primary: '#E85AA0' } }}
        />
        <Text variant="headlineSmall" style={styles.profileName}>
          Welcome Back!
        </Text>
        <Text variant="bodyMedium" style={styles.profileEmail}>
          guest@huematcher.com
        </Text>
        <Button
          mode="outlined"
          onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available in a future update.')}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
      </Surface>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        
        <View style={styles.quickActionsGrid}>
          <Card style={styles.quickActionCard} mode="contained" onPress={() => navigation.navigate('Camera')}>
            <Card.Content style={styles.quickActionContent}>
              <Ionicons name="camera" size={32} color="#E85AA0" />
              <Text variant="bodyMedium" style={styles.quickActionText}>
                New Analysis
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.quickActionCard} mode="contained" onPress={() => navigation.navigate('Results', { orderId: 'saved_analysis' })}>
            <Card.Content style={styles.quickActionContent}>
              <Ionicons name="color-palette" size={32} color="#E85AA0" />
              <Text variant="bodyMedium" style={styles.quickActionText}>
                My Colors
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Menu Items */}
      <Card style={styles.menuCard} mode="contained">
        <List.Section>
          {menuItems.map((item, index) => (
            <View key={index}>
              <List.Item
                title={item.title}
                description={item.description}
                left={() => <List.Icon icon={item.icon} color="#E85AA0" />}
                right={() => <List.Icon icon="chevron-right" />}
                onPress={item.onPress}
                style={styles.menuItem}
              />
              {index < menuItems.length - 1 && <Divider />}
            </View>
          ))}
        </List.Section>
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard} mode="contained">
        <Card.Content>
          <Text variant="titleMedium" style={styles.settingsTitle}>
            Preferences
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications" size={24} color="#E85AA0" />
              <View style={styles.settingText}>
                <Text variant="bodyLarge">Push Notifications</Text>
                <Text variant="bodySmall" style={styles.settingDescription}>
                  Get notified when your analysis is ready
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              color="#E85AA0"
            />
          </View>
          
          <Divider style={styles.settingDivider} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="moon" size={24} color="#E85AA0" />
              <View style={styles.settingText}>
                <Text variant="bodyLarge">Dark Mode</Text>
                <Text variant="bodySmall" style={styles.settingDescription}>
                  Switch to dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              color="#E85AA0"
            />
          </View>
        </Card.Content>
      </Card>

      {/* App Info */}
      <Surface style={styles.appInfo} elevation={0}>
        <Text variant="bodySmall" style={styles.appInfoText}>
          HueMatcher v1.0.0
        </Text>
        <Text variant="bodySmall" style={styles.appInfoText}>
          Made with ❤️ for color enthusiasts
        </Text>
      </Surface>

      {/* Sign Out */}
      <View style={styles.signOutSection}>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
          textColor="#FF5252"
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EE',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  profileName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    borderColor: '#E85AA0',
  },
  quickActionsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  quickActionContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  quickActionText: {
    marginTop: 8,
    fontWeight: '500',
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  menuItem: {
    paddingVertical: 8,
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  settingsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingDescription: {
    color: '#666',
    marginTop: 2,
  },
  settingDivider: {
    marginVertical: 16,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  appInfoText: {
    color: '#666',
    marginBottom: 4,
  },
  signOutSection: {
    padding: 16,
    paddingBottom: 32,
  },
  signOutButton: {
    borderColor: '#FF5252',
  },
});