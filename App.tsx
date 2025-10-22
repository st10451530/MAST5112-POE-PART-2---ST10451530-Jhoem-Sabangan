import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, ResItem } from './type';

/**
 * Predefined healthy and high-rated menu items
 */
const predefinedItems: ResItem[] = [
  {
    Nameitem: 'Quinoa Buddha Bowl',
    description: 'Nutrient-packed bowl with quinoa, roasted vegetables, and tahini dressing.',
    category: 'Healthy',
    Amount: 45,
    intensity: 'Balanced',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ingredients: ['Quinoa', 'Roasted vegetables', 'Tahini', 'Chickpeas', 'Avocado'],
  },
  
  {
    Nameitem: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herb crust and seasonal vegetables.',
    category: 'Healthy',
    Amount: 65,
    intensity: 'Strong',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
    ingredients: ['Atlantic salmon', 'Lemon', 'Fresh herbs', 'Asparagus', 'Olive oil'],
  },

  {
    Nameitem: 'Mediterranean Wrap',
    description: 'Fresh wrap with hummus, grilled chicken, and Mediterranean vegetables.',
    category: 'Healthy',
    Amount: 35,
    intensity: 'Mild',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ingredients: ['Whole wheat wrap', 'Hummus', 'Grilled chicken', 'Tomatoes', 'Cucumber'],
  },

  {
    Nameitem: 'Acai Power Bowl',
    description: 'Superfood bowl with acai, granola, and fresh berries.',
    category: 'Healthy',
    Amount: 28,
    intensity: 'Mild',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ingredients: ['Acai puree', 'Granola', 'Mixed berries', 'Coconut flakes', 'Honey'],
  },
];

/**
 * Screen for adding a new menu item
 */
function ManageMenuScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ManageScreen'>
) {
  const [Nameitem, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('Healthy');
  const [Amount, setAmount] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = () => {
    if (Nameitem && description && category && Amount) {
      const AmountValue = parseFloat(Amount);

      if (AmountValue > 0) {
        // Calculate intensity based on price
        const intensity =
          AmountValue < 45 ? 'Mild' : AmountValue < 65 ? 'Balanced' : 'Strong';

        // Create a new CafeItem object
        const newItem: ResItem = {
          Nameitem,
          description,
          category,
          Amount: AmountValue,
          intensity,
          image,
          ingredients: ingredients.split(',').map((i) => i.trim()),
        };

        // Update parent screen state using the passed setter function
        props.route.params.setItems([
          ...props.route.params.items,
          newItem,
        ]);

        props.navigation.goBack();
      } else {
        Alert.alert('Invalid Price', 'Price must be greater than 0.');
      }
    } else {
      Alert.alert('Missing Fields', 'Please fill out all fields before saving.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add Healthy Meal</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={Nameitem}
            onChangeText={setItemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Picker */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#bba005ff"
                style={styles.pickerStyle}
                itemStyle={{ height: 50 }}
              >
                <Picker.Item
                  label="Select a Category"
                  value=""
                  color="#999"
                />
                <Picker.Item label="Healthy" value="Healthy" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 50)"
            keyboardType="numeric"
            value={Amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {/* Image preview */}
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/**
 * Home screen that displays the menu list
 */
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
) {
  const [items, setItems] = useState<ResItem[]>(predefinedItems);

  const removeItem = (index: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () =>
          setItems(items.filter((_, i) => i !== index)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Christoffel's Kitchen</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || '' }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.Nameitem}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category} · R{item.Amount} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add New Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          props.navigation.navigate('ManageScreen', {
            items,
            setItems,
          })
        }
      >
        <Text style={styles.addText}>Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**
 * Simple welcome screen that leads to the home page
 */
function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>) {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',
        }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome to Christoffel's Kitchen</Text>
        <Text style={styles.welcomeText}>
          Healthy, high-rated meals crafted with passion and care.
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.startText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Stack navigation setup
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ManageScreen" component={ManageMenuScreen} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

/**
 * Styles for the app - Sleek modern design
 */
const styles = StyleSheet.create({
  welcomeContainer: { 
    flex: 1, 
    backgroundColor: '#0a0a0a' 
  },
  heroImage: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute' 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  welcomeText: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startText: { 
    color: '#ffffff', 
    fontWeight: '700', 
    fontSize: 18,
    letterSpacing: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', 
    padding: 20 
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginVertical: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardImage: { 
    width: '100%', 
    height: 200,
    backgroundColor: '#f8f9fa',
  },
  cardContent: { 
    padding: 20 
  },
  cardTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardDesc: { 
    color: '#6c757d', 
    fontSize: 15, 
    marginBottom: 12,
    lineHeight: 22,
  },
  cardMeta: { 
    color: '#4CAF50', 
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  removeText: { 
    color: '#ffffff', 
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: '700',
    letterSpacing: 1,
  },

  formContainer: { 
    backgroundColor: '#f8f9fa', 
    padding: 25,
    flex: 1,
  },
  formHeader: {
    fontSize: 28,
    color: '#2c3e50',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderColor: '#e9ecef',
    borderWidth: 2,
    paddingHorizontal: 20,
    height: 55,
    justifyContent: 'center',
    marginVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerWrapper: { 
    marginVertical: 15 
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    height: 55,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerStyle: {
    height: 55,
    width: '100%',
    color: '#2c3e50',
    fontSize: 16,
    paddingHorizontal: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: '#f8f9fa',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 15,
    marginTop: 25,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: { 
    color: '#ffffff', 
    fontWeight: '700', 
    fontSize: 18,
    letterSpacing: 1,
  },
  cancelButton: { 
    alignItems: 'center', 
    marginTop: 15 
  },
  cancelButtonText: { 
    color: '#6c757d', 
    fontWeight: '600',
    fontSize: 16,
  },
});