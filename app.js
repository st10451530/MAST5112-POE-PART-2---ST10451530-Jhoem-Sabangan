import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles, colors } from './styles';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Complete menu data for Christoffel's Kitchen
  const menuCategories = {
    breakfast: [
      {
        id: 1,
        name: 'Farmhouse Breakfast',
        description: 'Eggs, bacon, toast, and seasonal vegetables',
        price: 12.99,
        image: '🍳',
        category: 'breakfast'
      },
      {
        id: 2,
        name: 'Avocado Toast',
        description: 'Sourdough bread with smashed avocado and poached eggs',
        price: 10.99,
        image: '🥑',
        category: 'breakfast'
      },
      {
        id: 3,
        name: 'Pancake Stack',
        description: 'Fluffy pancakes with maple syrup and fresh berries',
        price: 9.99,
        image: '🥞',
        category: 'breakfast'
      },
      {
        id: 4,
        name: 'Greek Yogurt Bowl',
        description: 'Greek yogurt with honey, granola, and mixed berries',
        price: 8.99,
        image: '🥣',
        category: 'breakfast'
      }
    ],
    lunch: [
      {
        id: 5,
        name: 'Gourmet Burger',
        description: 'Angus beef burger with special sauce and fries',
        price: 15.99,
        image: '🍔',
        category: 'lunch'
      },
      {
        id: 6,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan and croutons',
        price: 11.99,
        image: '🥗',
        category: 'lunch'
      },
      {
        id: 7,
        name: 'Club Sandwich',
        description: 'Triple-decker sandwich with turkey and bacon',
        price: 13.99,
        image: '🥪',
        category: 'lunch'
      },
      {
        id: 8,
        name: 'Margherita Pizza',
        description: 'Wood-fired pizza with fresh mozzarella and basil',
        price: 14.99,
        image: '🍕',
        category: 'lunch'
      }
    ],
    dinner: [
      {
        id: 9,
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce and vegetables',
        price: 22.99,
        image: '🐟',
        category: 'dinner'
      },
      {
        id: 10,
        name: 'Ribeye Steak',
        description: '12oz ribeye with mashed potatoes and asparagus',
        price: 28.99,
        image: '🥩',
        category: 'dinner'
      },
      {
        id: 11,
        name: 'Vegetable Pasta',
        description: 'Fresh pasta with seasonal vegetables in tomato sauce',
        price: 16.99,
        image: '🍝',
        category: 'dinner'
      },
      {
        id: 12,
        name: 'Chicken Parmesan',
        description: 'Breaded chicken with marinara and melted cheese',
        price: 18.99,
        image: '🍗',
        category: 'dinner'
      }
    ],
    drinks: [
      {
        id: 13,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        image: '🧃',
        category: 'drinks'
      },
      {
        id: 14,
        name: 'Iced Coffee',
        description: 'Cold brew coffee with milk and syrup',
        price: 3.99,
        image: '🥤',
        category: 'drinks'
      },
      {
        id: 15,
        name: 'Sparkling Water',
        description: 'Imported sparkling water with lemon',
        price: 2.99,
        image: '💧',
        category: 'drinks'
      }
    ]
  };

  useEffect(() => {
    setMenuItems(menuCategories.breakfast);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const addToCart = (item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setCart(currentCart => currentCart.filter(item => item.id !== itemId))
        },
      ]
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCategoryChange = (category) => {
    setMenuItems(menuCategories[category] || []);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please add some items to your cart first.');
      return;
    }
    
    Alert.alert(
      'Order Confirmed!',
      `Your order of $${getTotalPrice()} has been placed successfully!`,
      [
        {
          text: 'Great!',
          onPress: () => {
            setCart([]);
            setActiveTab('home');
          }
        }
      ]
    );
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.heroTitle}>Christoffel's Kitchen</Text>
        <Text style={styles.heroSubtitle}>Fine Dining Experience</Text>
        <View style={styles.heroStats}>
          <View style={styles.statCard}>
            <MaterialIcons name="restaurant" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>16+</Text>
            <Text style={styles.statLabel}>Menu Items</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="clock" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>15min</Text>
            <Text style={styles.statLabel}>Avg. Wait</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Today's Specials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialsScroll}>
          {menuCategories.dinner.map((item) => (
            <Animated.View 
              key={item.id}
              style={[styles.specialCard, { opacity: fadeAnim }]}
            >
              <View style={styles.specialImage}>
                <Text style={styles.specialEmoji}>{item.image}</Text>
              </View>
              <Text style={styles.specialName}>{item.name}</Text>
              <Text style={styles.specialPrice}>${item.price}</Text>
              <TouchableOpacity 
                style={styles.specialButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.specialButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Our Kitchen</Text>
        <Text style={styles.aboutText}>
          Christoffel's Kitchen brings you the finest culinary experience with locally sourced ingredients 
          and traditional recipes passed down through generations. Our chefs create memorable dishes that 
          celebrate both innovation and tradition.
        </Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <Ionicons name="leaf" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Fresh Ingredients</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="local-shipping" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome5 name="award" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Award Winning</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderMenuScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.categoryTabs}>
        {['breakfast', 'lunch', 'dinner', 'drinks'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              menuItems[0]?.category === category && styles.categoryTabActive
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text style={[
              styles.categoryTabText,
              menuItems[0]?.category === category && styles.categoryTabTextActive
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <Animated.View 
            key={item.id}
            style={[styles.menuItem, { opacity: fadeAnim }]}
          >
            <View style={styles.menuItemImage}>
              <Text style={styles.menuItemEmoji}>{item.image}</Text>
            </View>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <Ionicons name="add" size={20} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  const renderCartScreen = () => (
    <View style={styles.screenContainer}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color={colors.textLighter} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some delicious items from our menu!</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemImage}>
                  <Text style={styles.cartItemEmoji}>{item.image}</Text>
                </View>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>${item.price} each</Text>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Ionicons name="remove" size={16} color={colors.white} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="trash" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.cartFooter}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderProfileScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImage}>
          <Ionicons name="restaurant" size={50} color={colors.primary} />
        </View>
        <Text style={styles.profileName}>Christoffel's Kitchen</Text>
        <Text style={styles.profileEmail}>info@christoffelskitchen.com</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Restaurant Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.infoText}>123 Gourmet Street, Food City</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color={colors.primary} />
            <Text style={styles.infoText}>Open: 8:00 AM - 10:00 PM</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={20} color={colors.primary} />
            <Text style={styles.infoText}>(555) 123-4567</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Order History</Text>
        <View style={styles.historyCard}>
          <Ionicons name="receipt" size={40} color={colors.textLighter} />
          <Text style={styles.historyText}>Recent orders will appear here</Text>
          <Text style={styles.historySubtext}>Start ordering to see your history</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Christoffel's Kitchen</Text>
        {activeTab === 'cart' && cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
          </View>
        )}
      </LinearGradient>

      <View style={styles.content}>
        {activeTab === 'home' && renderHomeScreen()}
        {activeTab === 'menu' && renderMenuScreen()}
        {activeTab === 'cart' && renderCartScreen()}
        {activeTab === 'profile' && renderProfileScreen()}
      </View>

      <View style={styles.tabBar}>
        {[
          { key: 'home', icon: 'home', label: 'Home' },
          { key: 'menu', icon: 'restaurant', label: 'Menu' },
          { key: 'cart', icon: 'cart', label: 'Cart' },
          { key: 'profile', icon: 'person', label: 'Profile' }
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.key ? colors.primary : colors.textLight}
            />
            <Text style={[
              styles.tabLabel,
              activeTab === tab.key && styles.tabLabelActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}