import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color palette
export const colors = {
  primary: '#8B4513',
  primaryLight: '#A0522D',
  secondary: '#D2691E',
  accent: '#FF6B35',
  background: '#f8f9fa',
  white: '#FFFFFF',
  card: '#FFFFFF',
  text: '#2D3436',
  textLight: '#636E72',
  textLighter: '#B2BEC3',
  success: '#00B894',
  error: '#D63031',
  warning: '#FDCB6E',
  border: '#DFE6E9'
};

// Typography scale
export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: 'bold', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: 'bold', lineHeight: 24 },
  body: { fontSize: 16, lineHeight: 22 },
  bodySmall: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28
};

// Shadow styles
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
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
  },
  headerTitle: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: spacing.sm,
  },
  
  // Cards
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flex: 1,
    ...shadows.md,
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
    color: colors.primary,
    marginBottom: spacing.md,
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
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    width: width * 0.6,
    alignItems: 'center',
    ...shadows.md,
  },
  specialImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  specialEmoji: {
    fontSize: 28,
  },
  specialName: {
    ...typography.h4,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  specialPrice: {
    ...typography.h4,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  specialButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
  },
  specialButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
  
  // About Section
  aboutSection: {
    marginBottom: spacing.xl,
  },
  aboutText: {
    ...typography.body,
    color: colors.textLight,
    lineHeight: 22,
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
  },
  
  // Category Tabs
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    ...shadows.sm,
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
  categoryTabText: {
    ...typography.bodySmall,
    fontWeight: 'bold',
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
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  menuItemImage: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemEmoji: {
    fontSize: 22,
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
  },
  menuItemPrice: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: borderRadius.xxl,
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
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  cartItemImage: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cartItemEmoji: {
    fontSize: 20,
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
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  quantityButton: {
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: borderRadius.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  quantityText: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    marginHorizontal: spacing.sm,
    minWidth: 20,
    textAlign: 'center',
    color: colors.text,
  },
  removeButton: {
    backgroundColor: colors.error,
    width: 36,
    height: 36,
    borderRadius: borderRadius.xxl,
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
  },
  totalPrice: {
    ...typography.h2,
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.md,
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
    width: 100,
    height: 100,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary,
    ...shadows.md,
  },
  profileName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.body,
    color: colors.textLight,
  },
  profileSection: {
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
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
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  historyText: {
    ...typography.body,
    color: colors.textLight,
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
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  
  // Badge
  cartBadge: {
    position: 'absolute',
    right: 20,
    top: height * 0.06,
    backgroundColor: colors.error,
    borderRadius: borderRadius.xxl,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  cartBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
});