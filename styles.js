import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Modern color palette for private chef app
export const colors = {
  primary: '#C87941',          // Warm brown/copper
  primaryLight: '#D4A574',     // Lighter copper
  secondary: '#E8B882',        // Cream
  accent: '#FF6B35',           // Vibrant orange
  background: '#FDFCFA',       // Off-white
  white: '#FFFFFF',
  card: '#FFFFFF',
  text: '#2C2C2C',            // Dark gray
  textLight: '#666666',
  textLighter: '#999999',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FFB74D',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)'
};

// Typography scale
export const typography = {
  h1: { fontSize: 34, fontWeight: 'bold', lineHeight: 42 },
  h2: { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
  h3: { fontSize: 22, fontWeight: 'bold', lineHeight: 30 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
  body: { fontSize: 16, lineHeight: 24 },
  bodySmall: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 18 },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  round: 50
};

// Enhanced shadow styles
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 10,
  }
};

export const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    padding: spacing.md,
  },
  content: {
    flex: 1,
  },
  
  // Header
  header: {
    paddingTop: height * 0.06,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    ...shadows.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  
  // Hero Section
  heroSection: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroGradient: {
    padding: spacing.xl,
    alignItems: 'center',
    borderRadius: borderRadius.xl,
  },
  chefBadge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.white,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    ...typography.h4,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
    opacity: 0.95,
  },
  heroTagline: {
    ...typography.body,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  
  // Cards
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumberWhite: {
    ...typography.h4,
    color: colors.white,
    marginVertical: spacing.xs,
    fontWeight: 'bold',
  },
  statLabelWhite: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  
  // Text Styles
  statNumber: {
    ...typography.h4,
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  
  // Specials & Menu
  featuredSection: {
    marginBottom: spacing.xl,
  },
  specialsScroll: {
    paddingVertical: spacing.sm,
  },
  specialCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginRight: spacing.md,
    width: width * 0.65,
    alignItems: 'center',
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specialImage: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  specialEmoji: {
    fontSize: 32,
  },
  specialName: {
    ...typography.h4,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  specialPrice: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
    fontWeight: 'bold',
  },
  specialServes: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  specialButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  specialButtonText: {
    ...typography.bodySmall,
    color: colors.white,
    fontWeight: 'bold',
  },
  
  // Quick Actions
  quickActionsSection: {
    marginBottom: spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  quickActionGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  quickActionText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  
  // About Section
  aboutSection: {
    marginBottom: spacing.xl,
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aboutText: {
    ...typography.body,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    ...typography.caption,
    color: colors.textLight,
    marginTop: spacing.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Services Section
  servicesSection: {
    marginBottom: spacing.xl,
  },
  servicesList: {
    gap: spacing.md,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  serviceTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    ...typography.caption,
    color: colors.textLight,
  },
  
  // Category Tabs
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
  },
  categoryTabEmoji: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  categoryTabText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textLight,
  },
  categoryTabTextActive: {
    color: colors.white,
  },
  
  // Menu Items
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  menuItemEmoji: {
    fontSize: 26,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  menuItemDescription: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  menuItemMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  menuItemMetaText: {
    ...typography.caption,
    color: colors.textLight,
    fontSize: 11,
  },
  menuItemPrice: {
    ...typography.h4,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  // Cart Styles
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCartText: {
    ...typography.h3,
    color: colors.textLight,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyCartSubtext: {
    ...typography.bodySmall,
    color: colors.textLighter,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  browseButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  cartItemEmoji: {
    fontSize: 22,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  cartItemPrice: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: 2,
  },
  cartItemServes: {
    ...typography.caption,
    color: colors.textLighter,
    fontSize: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  quantityButton: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    marginHorizontal: spacing.sm,
    minWidth: 24,
    textAlign: 'center',
    color: colors.text,
  },
  removeButton: {
    backgroundColor: colors.error,
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  cartFooter: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.text,
    fontWeight: '600',
  },
  totalPrice: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: 'bold',
  },
  checkoutButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  checkoutButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  checkoutButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  
  // Profile Styles
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  profileName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: 'bold',
  },
  profileTitle: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  profileSection: {
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
  },
  specializationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    width: (width - spacing.md * 3) / 2,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specText: {
    ...typography.caption,
    color: colors.text,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  bookingButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  bookingButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  bookingButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  historySubtext: {
    ...typography.caption,
    color: colors.textLighter,
  },
  
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.lg,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabIconContainer: {
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: colors.error,
    borderRadius: borderRadius.round,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textLight,
    marginTop: spacing.xs,
    fontSize: 11,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  
  // Badge
  cartBadge: {
    position: 'absolute',
    right: 20,
    top: height * 0.06 + 8,
    backgroundColor: colors.error,
    borderRadius: borderRadius.round,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    ...shadows.md,
  },
  cartBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    maxHeight: height * 0.85,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: 'bold',
  },
  inputLabel: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  submitButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginTop: spacing.lg,
    ...shadows.md,
  },
  submitButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  // Average Price Styles
averagePriceContainer: {
  marginBottom: spacing.lg,
},
averagePriceCard: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: spacing.lg,
  borderRadius: borderRadius.xl,
  ...shadows.md,
},
averagePriceInfo: {
  flex: 1,
  marginLeft: spacing.md,
},
averagePriceLabel: {
  ...typography.bodySmall,
  color: colors.white,
  opacity: 0.9,
},
averagePriceValue: {
  ...typography.h3,
  color: colors.white,
  fontWeight: 'bold',
},
averagePriceCategory: {
  ...typography.caption,
  color: colors.white,
  opacity: 0.8,
  fontStyle: 'italic',
},

// Profile Stats
statsGrid: {
  flexDirection: 'row',
  gap: spacing.md,
  marginBottom: spacing.md,
},
statCardProfile: {
  flex: 1,
  backgroundColor: colors.card,
  borderRadius: borderRadius.lg,
  padding: spacing.md,
  alignItems: 'center',
  ...shadows.sm,
  borderWidth: 1,
  borderColor: colors.border,
},
statNumberProfile: {
  ...typography.h4,
  color: colors.primary,
  marginVertical: spacing.xs,
  fontWeight: 'bold',
},
statLabelProfile: {
  ...typography.caption,
  color: colors.textLight,
  textAlign: 'center',
},

// Floating Add Button
floatingAddButton: {
  position: 'absolute',
  bottom: spacing.lg,
  right: spacing.lg,
  borderRadius: borderRadius.round,
  ...shadows.lg,
},
floatingAddButtonGradient: {
  width: 60,
  height: 60,
  borderRadius: borderRadius.round,
  justifyContent: 'center',
  alignItems: 'center',
},

// Category Picker
categoryPicker: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: spacing.sm,
  marginBottom: spacing.md,
},
categoryOption: {
  flex: 1,
  minWidth: '45%',
  backgroundColor: colors.background,
  borderRadius: borderRadius.md,
  padding: spacing.md,
  alignItems: 'center',
  borderWidth: 2,
  borderColor: colors.border,
},
categoryOptionActive: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},
categoryOptionEmoji: {
  fontSize: 20,
  marginBottom: spacing.xs,
},
categoryOptionText: {
  ...typography.bodySmall,
  color: colors.text,
  fontWeight: '600',
},
categoryOptionTextActive: {
  color: colors.white,
},

// Emoji Picker
emojiPicker: {
  marginBottom: spacing.sm,
},
emojiOption: {
  width: 50,
  height: 50,
  borderRadius: borderRadius.md,
  backgroundColor: colors.background,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: spacing.sm,
  borderWidth: 2,
  borderColor: colors.border,
},
emojiOptionActive: {
  backgroundColor: colors.primaryLight,
  borderColor: colors.primary,
},
emojiText: {
  fontSize: 24,
},
selectedEmojiText: {
  ...typography.bodySmall,
  color: colors.textLight,
  textAlign: 'center',
  marginBottom: spacing.md,
},
});