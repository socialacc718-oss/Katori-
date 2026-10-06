import heroBowlImg from '../assets/images/katori_hero_bowl_1791221961342.jpg';
import arabianBowlImg from '../assets/images/katori_arabian_bowl_1791222051549.jpg';
import loadedFriesImg from '../assets/images/katori_loaded_fries_1791221972901.jpg';
import shrimpBowlImg from '../assets/images/katori_shrimp_bowl_1791221983605.jpg';
import beefDonerImg from '../assets/images/katori_beef_doner_1791221994994.jpg';
import saladBowlImg from '../assets/images/katori_salad_bowl_1791222012878.jpg';
import dipsImg from '../assets/images/katori_dips_sauces_1791222062246.jpg';
import drinksImg from '../assets/images/katori_drinks_1791222076182.jpg';

export interface MenuItem {
  id: string;
  name: string;
  category: 'chicken-bowls' | 'ocean-obsession' | 'katori-special' | 'fries' | 'salads' | 'dips' | 'drinks';
  categoryLabel: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  spiceLevel?: 0 | 1 | 2 | 3;
  popular?: boolean;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  spiceLevel?: string;
  selectedDips?: { name: string; price: number }[];
  instruction?: string;
  totalPrice: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'takeaway' | 'dinein';
  deliveryAddress: string;
  instructions: string;
  paymentMethod: 'Cash on Delivery' | 'JazzCash / EasyPaisa / Bank Transfer';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export const RESTAURANT_INFO = {
  name: 'KATORI',
  tagline: 'RICE • SALADS • FRIES',
  phone: '0342 5392026',
  whatsappNumber: '923425392026',
  address: 'KATORI Restaurant, Pakistan',
  mapsUrl: 'https://maps.app.goo.gl/QhqQaJzuBREZ4foTA',
  deliveryFee: 150,
  freeDeliveryThreshold: 2500,
  estimatedTime: '25-40 Mins',
  hours: '12:00 PM – 02:00 AM Daily',
  logoBowlImg: heroBowlImg
};

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'chicken-bowls', label: 'Chicken Rice Bowls', icon: 'Utensils' },
  { id: 'ocean-obsession', label: 'Ocean Obsession', icon: 'Fish' },
  { id: 'katori-special', label: 'Katori Special', icon: 'Crown' },
  { id: 'fries', label: 'Fries', icon: 'Flame' },
  { id: 'salads', label: 'Salads', icon: 'Leaf' },
  { id: 'dips', label: 'Dips & Sauces', icon: 'Droplets' },
  { id: 'drinks', label: 'Drinks', icon: 'CupSoda' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // 1. Chicken Rice Bowls
  {
    id: 'mexican-fiesta',
    name: 'Mexican Fiesta',
    category: 'chicken-bowls',
    categoryLabel: 'Chicken Rice Bowls',
    price: 749,
    description: 'Zesty grilled chicken strips over spiced fragrant yellow rice, roasted sweet corn, diced salsa, pickled jalapeños & signature cream drizzle.',
    image: heroBowlImg,
    badge: 'Best Seller',
    spiceLevel: 2,
    popular: true,
  },
  {
    id: 'arabian-chicken',
    name: 'Arabian Chicken',
    category: 'chicken-bowls',
    categoryLabel: 'Chicken Rice Bowls',
    price: 749,
    description: 'Authentic Middle Eastern spiced tender chicken served on aromatic mandi rice, house garlic toum cream, pickled cucumber & toasted nuts.',
    image: arabianBowlImg,
    badge: 'Chef Favorite',
    spiceLevel: 1,
    popular: true,
  },
  {
    id: 'new-york',
    name: 'New York',
    category: 'chicken-bowls',
    categoryLabel: 'Chicken Rice Bowls',
    price: 749,
    description: 'Iconic NYC street cart style! Savory grilled seasoned chicken over turmeric rice, crunchy shredded lettuce, and the famous tangy white & fiery red sauce.',
    image: heroBowlImg,
    badge: 'Popular',
    spiceLevel: 2,
    popular: true,
  },

  // 2. Ocean Obsession
  {
    id: 'mexican-shrimps',
    name: 'Mexican Shrimps',
    category: 'ocean-obsession',
    categoryLabel: 'Ocean Obsession',
    price: 1199,
    description: 'Juicy jumbo spiced grilled shrimps tossed in Mexican fajita peppers, sweet corn salsa & garlic lime cilantro drizzle over buttery rice.',
    image: shrimpBowlImg,
    badge: 'Seafood Special',
    spiceLevel: 2,
    popular: true,
  },
  {
    id: 'dynamite-shrimps',
    name: 'Dynamite Shrimps',
    category: 'ocean-obsession',
    categoryLabel: 'Ocean Obsession',
    price: 1199,
    description: 'Crispy golden batter-fried succulent shrimps generously drenched in our secret creamy, fiery dynamite sauce on seasoned rice.',
    image: shrimpBowlImg,
    badge: 'Top Rated',
    spiceLevel: 3,
    popular: true,
  },

  // 3. Katori Special
  {
    id: 'beef-doner',
    name: 'Beef Doner',
    category: 'katori-special',
    categoryLabel: 'Katori Special',
    price: 999,
    description: 'Thinly shaved succulent Turkish-style seasoned beef doner, grilled herb tomatoes, sumac onions, garlic yogurt glaze and saffron basmati rice.',
    image: beefDonerImg,
    badge: 'Katori Special',
    spiceLevel: 1,
    popular: true,
  },

  // 4. Fries
  {
    id: 'katori-classic-fries',
    name: 'Katori Classic Fries',
    category: 'fries',
    categoryLabel: 'Fries',
    price: 699,
    description: 'Golden crispy skin-on potato fries, tossed in Katori house secret seasoning blend, served piping hot and crunchy.',
    image: loadedFriesImg,
    badge: 'Crunchy',
    spiceLevel: 0,
    popular: false,
  },
  {
    id: 'loaded-fries-supreme',
    name: 'Loaded Fries Supreme',
    category: 'fries',
    categoryLabel: 'Fries',
    price: 749,
    description: 'Crispy golden fries smothered in warm molten cheddar cheese, seasoned chicken chunks, sliced black olives, green onions & spicy mayo swirl.',
    image: loadedFriesImg,
    badge: 'Crowd Favorite',
    spiceLevel: 2,
    popular: true,
  },

  // 5. Salads
  {
    id: 'vege-delight',
    name: 'Vege Delight',
    category: 'salads',
    categoryLabel: 'Salads',
    price: 599,
    description: 'Crisp iceberg lettuce, garden fresh cucumber slices, juicy tomato wedges, sweet corn, black olives, finished with lemon-herb vinaigrette.',
    image: saladBowlImg,
    badge: 'Fresh & Light',
    spiceLevel: 0,
    popular: false,
  },
  {
    id: 'katori-chicken-salad',
    name: 'Katori Chicken Salad',
    category: 'salads',
    categoryLabel: 'Salads',
    price: 749,
    description: 'Tender slices of char-grilled chicken breast over farm-fresh mixed greens, sliced cucumbers, ripe cherry tomatoes and house creamy dressing.',
    image: saladBowlImg,
    badge: 'High Protein',
    spiceLevel: 1,
    popular: true,
  },

  // 6. Dips
  {
    id: 'katori-white-sauce',
    name: 'Katori White Sauce',
    category: 'dips',
    categoryLabel: 'Dips',
    price: 99,
    description: 'Signature creamy, garlicky NYC-style white sauce with secret herbs. The perfect dip for bowls & fries.',
    image: dipsImg,
    badge: 'Signature Dip',
    spiceLevel: 0,
  },
  {
    id: 'katori-mandi',
    name: 'Katori Mandi',
    category: 'dips',
    categoryLabel: 'Dips',
    price: 99,
    description: 'Authentic Arabic smoky tomato & herb relish, crafted specially to complement our spiced rice bowls.',
    image: dipsImg,
    badge: 'Arabic Flavor',
    spiceLevel: 1,
  },
  {
    id: 'dynamite-sauce',
    name: 'Dynamite Sauce',
    category: 'dips',
    categoryLabel: 'Dips',
    price: 99,
    description: 'Creamy, sweet, and fiery kick of sriracha mayo glaze for those who love bold flavors.',
    image: dipsImg,
    badge: 'Fiery Dip',
    spiceLevel: 3,
  },
  {
    id: 'hot-sauce',
    name: 'Hot Sauce',
    category: 'dips',
    categoryLabel: 'Dips',
    price: 99,
    description: 'Real aged chili pepper hot sauce with an intense, tongue-tingling spicy punch.',
    image: dipsImg,
    badge: 'Spicy',
    spiceLevel: 3,
  },
  {
    id: 'chili-garlic',
    name: 'Chili Garlic',
    category: 'dips',
    categoryLabel: 'Dips',
    price: 99,
    description: 'Zesty aromatic garlic infused with crushed red chilies and tangy tomato base.',
    image: dipsImg,
    badge: 'Classic',
    spiceLevel: 2,
  },

  // 7. Drinks
  {
    id: 'pepsi',
    name: 'Pepsi',
    category: 'drinks',
    categoryLabel: 'Drinks',
    price: 149,
    description: 'Chilled refreshing classic cola 345ml served cold.',
    image: drinksImg,
    badge: 'Chilled',
  },
  {
    id: '7up',
    name: '7up',
    category: 'drinks',
    categoryLabel: 'Drinks',
    price: 149,
    description: 'Chilled crisp lemon-lime refreshment 345ml served ice cold.',
    image: drinksImg,
    badge: 'Chilled',
  },
];

export const AVAILABLE_DIPS_ADDON = [
  { name: 'Katori White Sauce', price: 99 },
  { name: 'Dynamite Sauce', price: 99 },
  { name: 'Katori Mandi Sauce', price: 99 },
  { name: 'Hot Sauce', price: 99 },
  { name: 'Chili Garlic', price: 99 },
];
