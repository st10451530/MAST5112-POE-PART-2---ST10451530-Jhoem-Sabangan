import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  StatusBar,
  Modal,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, colors } from './styles';

// Simple icon component using emojis
const Icon = ({ emoji, size = 24 }) => (
  <Text style={{ fontSize: size }}>{emoji}</Text>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('signature');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', date: '', guests: '', eventType: ''
  });
  
  const [newMenuItem, setNewMenuItem] = useState({
    name: '', description: '', price: '', category: 'signature',
    serves: '', prepTime: '', image: '🍽️'
  });

  const emojiOptions = ['🍽️', '🥩', '🎨', '🐟', '💼', '💍', '🕯️', '🎄', '📦', '🍱', '🌹', '👨‍👩‍👧‍👦', '🌱', '🧪', '🌾', '🌍'];

  // Private Chef Menu Categories
  const [menuCategories, setMenuCategories] = useState({
    signature: [
      {
        id: 1, name: 'Signature Tasting Menu', description: '7-course gourmet experience showcasing chef\'s finest creations',
        price: 125.00, image: '🍽️', category: 'signature', serves: '2-4 guests', prepTime: '3-4 hours'
      },
      {
        id: 2, name: 'Luxury Surf & Turf', description: 'Premium wagyu beef with lobster, seasonal vegetables',
        price: 95.00, image: '🥩', category: 'signature', serves: '2 guests', prepTime: '2-3 hours'
      },
      {
        id: 3, name: 'Chef\'s Degustation', description: '9-course journey through modern culinary techniques',
        price: 150.00, image: '🎨', category: 'signature', serves: '2-6 guests', prepTime: '4-5 hours'
      },
      {
        id: 4, name: 'Mediterranean Feast', description: 'Fresh seafood, grilled vegetables, and artisan breads',
        price: 85.00, image: '🐟', category: 'signature', serves: '4-6 guests', prepTime: '2.5 hours'
      }
    ],
    catering: [
      {
        id: 5, name: 'Corporate Event Package', description: 'Full-service catering for business events (15-50 guests)',
        price: 45.00, image: '💼', category: 'catering', serves: 'Per person', prepTime: 'Custom'
      },
      {
        id: 6, name: 'Wedding Reception', description: 'Complete wedding catering with multiple courses',
        price: 75.00, image: '💍', category: 'catering', serves: 'Per person', prepTime: 'Full day'
      },
      {
        id: 7, name: 'Intimate Dinner Party', description: 'Personalized menu for special occasions (8-12 guests)',
        price: 65.00, image: '🕯️', category: 'catering', serves: 'Per person', prepTime: '3-4 hours'
      },
      {
        id: 8, name: 'Holiday Celebration', description: 'Traditional and modern dishes for holiday gatherings',
        price: 55.00, image: '🎄', category: 'catering', serves: 'Per person', prepTime: 'Custom'
      }
    ],
    mealPlans: [
      {
        id: 9, name: 'Weekly Meal Prep', description: '12 prepared meals, chef-curated menu for the week',
        price: 180.00, image: '📦', category: 'mealPlans', serves: '12 meals', prepTime: 'Weekly delivery'
      },
      {
        id: 10, name: 'Gourmet Lunch Box', description: 'Premium lunch options delivered daily (5-day plan)',
        price: 75.00, image: '🍱', category: 'mealPlans', serves: '5 lunches', prepTime: 'Daily'
      },
      {
        id: 11, name: 'Date Night Package', description: 'Romantic dinner for two with wine pairing suggestions',
        price: 110.00, image: '🌹', category: 'mealPlans', serves: '2 guests', prepTime: '2 hours'
      },
      {
        id: 12, name: 'Family Feast', description: 'Complete family dinner with multiple courses',
        price: 95.00, image: '👨‍👩‍👧‍👦', category: 'mealPlans', serves: '4-6 guests', prepTime: '2-3 hours'
      }
    ],
    specialties: [
      {
        id: 13, name: 'Vegan Gourmet Experience', description: 'Plant-based fine dining with innovative techniques',
        price: 70.00, image: '🌱', category: 'specialties', serves: '2-4 guests', prepTime: '2.5 hours'
      },
      {
        id: 14, name: 'Molecular Gastronomy', description: 'Science meets cuisine with unique presentations',
        price: 130.00, image: '🧪', category: 'specialties', serves: '2-6 guests', prepTime: '4 hours'
      },
      {
        id: 15, name: 'Farm-to-Table Experience', description: 'Locally sourced, seasonal ingredients prepared fresh',
        price: 80.00, image: '🌾', category: 'specialties', serves: '2-4 guests', prepTime: '3 hours'
      },
      {
        id: 16, name: 'International Fusion', description: 'Blend of Asian, European, and American flavors',
        price: 75.00, image: '🌍', category: 'specialties', serves: '2-4 guests', prepTime: '2.5 hours'
      }
    ]
  });

  // Calculate average price for current category - POE REQUIREMENT
  const calculateAveragePrice = () => {
    const items = menuCategories[selectedCategory] || [];
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return (total / items.length).toFixed(2);
  };

  useEffect(() => {
    setMenuItems(menuCategories.signature);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true })
    ]).start();
  }, []);

  const addToCart = (item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const removeFromCart = (itemId) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', onPress: () => setCart(currentCart => currentCart.filter(item => item.id !== itemId)) }
    ]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(currentCart => currentCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  const getCartItemCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMenuItems(menuCategories[category] || []);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please add some items to your cart first.');
      return;
    }
    Alert.alert('Order Confirmed!', `Your order of $${getTotalPrice()} has been placed successfully! Chef Christoffel will contact you shortly to finalize details.`, [
      { text: 'Perfect!', onPress: () => { setCart([]); setActiveTab('home'); } }
    ]);
  };

  const handleBookingSubmit = () => {
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    Alert.alert('Booking Request Sent!', 'Chef Christoffel will contact you soon to confirm your event details.', [
      { text: 'Great!', onPress: () => {
        setBookingModalVisible(false);
        setBookingForm({ name: '', email: '', phone: '', date: '', guests: '', eventType: '' });
      }}
    ]);
  };

  // POE REQUIREMENT: Separate screen for adding menu items
  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.price) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newMenuItem.name,
      description: newMenuItem.description,
      price: parseFloat(newMenuItem.price),
      image: newMenuItem.image,
      category: newMenuItem.category,
      serves: newMenuItem.serves || '2-4 guests',
      prepTime: newMenuItem.prepTime || '2-3 hours'
    };

    setMenuCategories(prev => ({
      ...prev,
      [newMenuItem.category]: [...prev[newMenuItem.category], newItem]
    }));

    if (selectedCategory === newMenuItem.category) {
      setMenuItems(prev => [...prev, newItem]);
    }

    Alert.alert('Success', 'Menu item added successfully!');
    setAddItemModalVisible(false);
    setNewMenuItem({
      name: '', description: '', price: '', category: 'signature',
      serves: '', prepTime: '', image: '🍽️'
    });
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.heroGradient}>
          <View style={styles.chefBadge}>
            <Icon emoji="👨‍🍳" size={32} />
          </View>
          <Text style={styles.heroTitle}>Chef Christoffel</Text>
          <Text style={styles.heroSubtitle}>Private Chef & Catering Specialist</Text>
          <Text style={styles.heroTagline}>Culinary Excellence Delivered to Your Door</Text>
          
          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <Icon emoji="🍽️" size={24} />
              <Text style={styles.statNumberWhite}>{Object.values(menuCategories).flat().length}+</Text>
              <Text style={styles.statLabelWhite}>Menu Items</Text>
            </View>
            <View style={styles.statCard}>
              <Icon emoji="⭐" size={24} />
              <Text style={styles.statNumberWhite}>5.0</Text>
              <Text style={styles.statLabelWhite}>Chef Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Icon emoji="🏆" size={24} />
              <Text style={styles.statNumberWhite}>500+</Text>
              <Text style={styles.statLabelWhite}>Events Served</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>🎯 Today's Featured Creations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialsScroll}>
          {menuCategories.signature.slice(0, 3).map((item) => (
            <Animated.View key={item.id} style={[styles.specialCard, { opacity: fadeAnim }]}>
              <View style={styles.specialImage}>
                <Text style={styles.specialEmoji}>{item.image}</Text>
              </View>
              <Text style={styles.specialName}>{item.name}</Text>
              <Text style={styles.specialPrice}>${item.price}</Text>
              <Text style={styles.specialServes}>{item.serves}</Text>
              <TouchableOpacity style={styles.specialButton} onPress={() => addToCart(item)}>
                <Text style={styles.specialButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard} onPress={() => setBookingModalVisible(true)}>
            <LinearGradient colors={[colors.accent, colors.secondary]} style={styles.quickActionGradient}>
              <Icon emoji="📅" size={32} />
              <Text style={styles.quickActionText}>Book Event</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveTab('menu')}>
            <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.quickActionGradient}>
              <Icon emoji="📋" size={32} />
              <Text style={styles.quickActionText}>View Menu</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard} onPress={() => setAddItemModalVisible(true)}>
            <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.quickActionGradient}>
              <Icon emoji="➕" size={32} />
              <Text style={styles.quickActionText}>Add Item</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>👨‍🍳 About Chef Christoffel</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            With over 15 years of culinary expertise, Chef Christoffel brings fine dining 
            directly to your home. Specializing in personalized menus, event catering, and 
            premium meal preparation, every dish is crafted with passion, precision, and 
            the finest ingredients.
          </Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}><Icon emoji="🌿" size={28} /><Text style={styles.featureText}>Fresh Ingredients</Text></View>
            <View style={styles.featureItem}><Icon emoji="🚚" size={28} /><Text style={styles.featureText}>Personal Service</Text></View>
            <View style={styles.featureItem}><Icon emoji="🏅" size={28} /><Text style={styles.featureText}>Award Winner</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>🍽️ Our Services</Text>
        <View style={styles.servicesList}>
          <View style={styles.serviceItem}>
            <Icon emoji="🍴" size={24} />
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Signature Dining</Text>
              <Text style={styles.serviceDescription}>Intimate fine dining experiences</Text>
            </View>
          </View>
          <View style={styles.serviceItem}>
            <Icon emoji="🎉" size={24} />
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Event Catering</Text>
              <Text style={styles.serviceDescription}>Corporate events, weddings, parties</Text>
            </View>
          </View>
          <View style={styles.serviceItem}>
            <Icon emoji="📦" size={24} />
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Meal Plans</Text>
              <Text style={styles.serviceDescription}>Weekly prep and customized plans</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderMenuScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.categoryTabs}>
        {[
          { key: 'signature', label: 'Signature', icon: '⭐' },
          { key: 'catering', label: 'Catering', icon: '🎉' },
          { key: 'mealPlans', label: 'Meal Plans', icon: '📦' },
          { key: 'specialties', label: 'Specialties', icon: '✨' }
        ].map(category => (
          <TouchableOpacity
            key={category.key}
            style={[styles.categoryTab, selectedCategory === category.key && styles.categoryTabActive]}
            onPress={() => handleCategoryChange(category.key)}
          >
            <Text style={styles.categoryTabEmoji}>{category.icon}</Text>
            <Text style={[styles.categoryTabText, selectedCategory === category.key && styles.categoryTabTextActive]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* POE REQUIREMENT: Average price display */}
      <View style={styles.averagePriceContainer}>
        <LinearGradient colors={[colors.primaryLight, colors.primary]} style={styles.averagePriceCard}>
          <Icon emoji="💰" size={24} />
          <View style={styles.averagePriceInfo}>
            <Text style={styles.averagePriceLabel}>Average Price</Text>
            <Text style={styles.averagePriceValue}>${calculateAveragePrice()}</Text>
          </View>
          <Text style={styles.averagePriceCategory}>for {selectedCategory} items</Text>
        </LinearGradient>
      </View>

      <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <Animated.View key={item.id} style={[styles.menuItem, { opacity: fadeAnim }]}>
            <View style={styles.menuItemImage}>
              <Text style={styles.menuItemEmoji}>{item.image}</Text>
            </View>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <View style={styles.menuItemMeta}>
                <Text style={styles.menuItemMetaText}>👥 {item.serves}</Text>
                <Text style={styles.menuItemMetaText}>⏱️ {item.prepTime}</Text>
              </View>
              <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
              <Icon emoji="+" size={24} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* POE REQUIREMENT: Separate screen for adding menu items - Floating button */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={() => setAddItemModalVisible(true)}>
        <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.floatingAddButtonGradient}>
          <Icon emoji="+" size={28} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderCartScreen = () => (
    <View style={styles.screenContainer}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon emoji="🛒" size={80} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add delicious meals from our menu!</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => setActiveTab('menu')}>
            <Text style={styles.browseButtonText}>Browse Menu</Text>
          </TouchableOpacity>
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
                  <Text style={styles.cartItemPrice}>${item.price.toFixed(2)} each</Text>
                  <Text style={styles.cartItemServes}>{item.serves}</Text>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Icon emoji="-" size={18} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Icon emoji="+" size={18} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                  <Icon emoji="🗑️" size={20} />
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
              <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.checkoutButtonGradient}>
                <Text style={styles.checkoutButtonText}>Place Order</Text>
                <Icon emoji="→" size={22} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderProfileScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.profileImage}>
          <Icon emoji="👨‍🍳" size={50} />
        </LinearGradient>
        <Text style={styles.profileName}>Chef Christoffel</Text>
        <Text style={styles.profileTitle}>Executive Private Chef</Text>
        <Text style={styles.profileEmail}>chef@christoffelskitchen.com</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Menu Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCardProfile}>
            <Icon emoji="🍽️" size={28} />
            <Text style={styles.statNumberProfile}>{Object.values(menuCategories).flat().length}</Text>
            <Text style={styles.statLabelProfile}>Total Items</Text>
          </View>
          <View style={styles.statCardProfile}>
            <Icon emoji="💰" size={28} />
            <Text style={styles.statNumberProfile}>${calculateAveragePrice()}</Text>
            <Text style={styles.statLabelProfile}>Avg Price</Text>
          </View>
          <View style={styles.statCardProfile}>
            <Icon emoji="📁" size={28} />
            <Text style={styles.statNumberProfile}>{Object.keys(menuCategories).length}</Text>
            <Text style={styles.statLabelProfile}>Categories</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Icon emoji="📍" size={22} />
            <Text style={styles.infoText}>Serving Greater Metro Area</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon emoji="⏰" size={22} />
            <Text style={styles.infoText}>Available 7 Days a Week</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon emoji="📞" size={22} />
            <Text style={styles.infoText}>(555) 123-CHEF</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon emoji="📧" size={22} />
            <Text style={styles.infoText}>chef@christoffelskitchen.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Specializations</Text>
        <View style={styles.specializationsGrid}>
          <View style={styles.specCard}>
            <Icon emoji="🍴" size={28} />
            <Text style={styles.specText}>Fine Dining</Text>
          </View>
          <View style={styles.specCard}>
            <Icon emoji="🎉" size={28} />
            <Text style={styles.specText}>Event Catering</Text>
          </View>
          <View style={styles.specCard}>
            <Icon emoji="❤️" size={28} />
            <Text style={styles.specText}>Custom Menus</Text>
          </View>
          <View style={styles.specCard}>
            <Icon emoji="🌿" size={28} />
            <Text style={styles.specText}>Health Focused</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bookingButton} onPress={() => setBookingModalVisible(true)}>
        <LinearGradient colors={[colors.accent, colors.secondary]} style={styles.bookingButtonGradient}>
          <Icon emoji="📅" size={24} />
          <Text style={styles.bookingButtonText}>Book Your Event</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.bookingButton, { backgroundColor: '#4CAF50' }]} onPress={() => setAddItemModalVisible(true)}>
        <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.bookingButtonGradient}>
          <Icon emoji="➕" size={24} />
          <Text style={styles.bookingButtonText}>Add New Menu Item</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Order History</Text>
        <View style={styles.historyCard}>
          <Icon emoji="🧾" size={50} />
          <Text style={styles.historyText}>Your orders will appear here</Text>
          <Text style={styles.historySubtext}>Start ordering to see your history</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.header}>
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
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'menu', icon: '📋', label: 'Menu' },
          { key: 'cart', icon: '🛒', label: 'Cart', badge: getCartItemCount() },
          { key: 'profile', icon: '👤', label: 'Profile' }
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.key)}
          >
            <View style={styles.tabIconContainer}>
              <Text style={{fontSize: 26, color: activeTab === tab.key ? colors.primary : colors.textLight}}>
                {tab.icon}
              </Text>
              {tab.badge > 0 && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking Modal */}
      <Modal visible={bookingModalVisible} animationType="slide" transparent={true} onRequestClose={() => setBookingModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Your Event</Text>
              <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                <Icon emoji="❌" size={28} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput style={styles.input} placeholder="Enter your name" value={bookingForm.name} onChangeText={(text) => setBookingForm({...bookingForm, name: text})} />
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput style={styles.input} placeholder="your.email@example.com" keyboardType="email-address" value={bookingForm.email} onChangeText={(text) => setBookingForm({...bookingForm, email: text})} />
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput style={styles.input} placeholder="(555) 123-4567" keyboardType="phone-pad" value={bookingForm.phone} onChangeText={(text) => setBookingForm({...bookingForm, phone: text})} />
              <Text style={styles.inputLabel}>Event Date *</Text>
              <TextInput style={styles.input} placeholder="MM/DD/YYYY" value={bookingForm.date} onChangeText={(text) => setBookingForm({...bookingForm, date: text})} />
              <Text style={styles.inputLabel}>Number of Guests</Text>
              <TextInput style={styles.input} placeholder="Estimated number" keyboardType="numeric" value={bookingForm.guests} onChangeText={(text) => setBookingForm({...bookingForm, guests: text})} />
              <Text style={styles.inputLabel}>Event Type</Text>
              <TextInput style={styles.input} placeholder="e.g., Wedding, Corporate, Birthday" value={bookingForm.eventType} onChangeText={(text) => setBookingForm({...bookingForm, eventType: text})} />
            </ScrollView>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleBookingSubmit}>
              <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.submitButtonGradient}>
                <Text style={styles.submitButtonText}>Submit Booking Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* POE REQUIREMENT: Separate screen for adding menu items - Modal */}
      <Modal visible={addItemModalVisible} animationType="slide" transparent={true} onRequestClose={() => setAddItemModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Menu Item</Text>
              <TouchableOpacity onPress={() => setAddItemModalVisible(false)}>
                <Icon emoji="❌" size={28} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Item Name *</Text>
              <TextInput style={styles.input} placeholder="Enter item name" value={newMenuItem.name} onChangeText={(text) => setNewMenuItem({...newMenuItem, name: text})} />
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput style={[styles.input, { height: 80 }]} placeholder="Enter item description" multiline value={newMenuItem.description} onChangeText={(text) => setNewMenuItem({...newMenuItem, description: text})} />
              <Text style={styles.inputLabel}>Price *</Text>
              <TextInput style={styles.input} placeholder="0.00" keyboardType="decimal-pad" value={newMenuItem.price} onChangeText={(text) => setNewMenuItem({...newMenuItem, price: text})} />
              <Text style={styles.inputLabel}>Category *</Text>
              <View style={styles.categoryPicker}>
                {['signature', 'catering', 'mealPlans', 'specialties'].map(category => (
                  <TouchableOpacity key={category} style={[styles.categoryOption, newMenuItem.category === category && styles.categoryOptionActive]} onPress={() => setNewMenuItem({...newMenuItem, category})}>
                    <Text style={styles.categoryOptionEmoji}>
                      {category === 'signature' ? '⭐' : category === 'catering' ? '🎉' : category === 'mealPlans' ? '📦' : '✨'}
                    </Text>
                    <Text style={[styles.categoryOptionText, newMenuItem.category === category && styles.categoryOptionTextActive]}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.inputLabel}>Serves</Text>
              <TextInput style={styles.input} placeholder="e.g., 2-4 guests" value={newMenuItem.serves} onChangeText={(text) => setNewMenuItem({...newMenuItem, serves: text})} />
              <Text style={styles.inputLabel}>Preparation Time</Text>
              <TextInput style={styles.input} placeholder="e.g., 2-3 hours" value={newMenuItem.prepTime} onChangeText={(text) => setNewMenuItem({...newMenuItem, prepTime: text})} />
              <Text style={styles.inputLabel}>Select Emoji</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiPicker}>
                {emojiOptions.map((emoji, index) => (
                  <TouchableOpacity key={index} style={[styles.emojiOption, newMenuItem.image === emoji && styles.emojiOptionActive]} onPress={() => setNewMenuItem({...newMenuItem, image: emoji})}>
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Text style={styles.selectedEmojiText}>Selected: {newMenuItem.image}</Text>
            </ScrollView>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleAddMenuItem}>
              <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.submitButtonGradient}>
                <Text style={styles.submitButtonText}>Add Menu Item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}