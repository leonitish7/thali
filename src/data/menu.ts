import { MenuItem } from '../types';

export const menuData: MenuItem[] = [
  { id: '1', name: 'Wild Mushroom & Truffle Khichdi Croquettes', description: 'Crispy khichdi balls, wild mushroom, truffle notes', price: '$18', category: 'Starters', isPopular: true, tags: ['Nut-Free'] },
  { id: '2', name: 'Mint-Basil Burrata', description: 'Creamy burrata over charred heirloom tomatoes, fresh mint-basil chutney pesto, aged tamarind-balsamic glaze, cumin-infused virgin olive oil.', price: '$18', category: 'Starters', tags: ['Gluten-Free'] },
  { id: '3', name: 'Wagyu Beef Boti Carpaccio', description: 'Thinly sliced wagyu beef with aromatic boti spices', price: '$36', category: 'Starters', tags: ['Gluten-Free', 'Nut-Free'] },
  
  { id: '4', name: 'Coastal-Spiced Scallops', description: 'Velvety spiced sweet corn purée, curry leaf brown butter, crispy lamb bacon bits.', price: '$36', category: 'Mains', isPopular: true, tags: ['Gluten-Free'] },
  { id: '5', name: 'Tandoori Herb-Crusted Rack of Lamb', description: 'Tandoori spiced herb-crusted lamb rack', price: '$30', category: 'Mains', tags: ['Gluten-Free', 'Nut-Free'] },
  { id: '6', name: 'Himalayan Morel Risotto', description: 'Premium Arborio rice slow-cooked with Himalayan morels (Guchhi), saffron-infused broth, topped with a crisp parmesan-phulka wafer.', price: '$28', category: 'Mains', tags: ['Nut-Free'] },
  { id: '7', name: 'Kolkata Mustard Glazed Sea Bass', description: 'Mustard glazed tender sea bass, aromatic broth', price: '$38', category: 'Mains', tags: ['Gluten-Free', 'Nut-Free'] },

  { id: '8', name: 'Cutting Chai Tiramisu', description: 'Parle-G and ladyfinger biscuits soaked in cutting chai espresso, layered with cardamom-spiced mascarpone cream.', price: '$12', category: 'Desserts', isPopular: true, tags: [] },
  { id: '9', name: 'Alphonso Mango & Saffron Panna Cotta', description: 'Rich Alphonso mango, saffron-infused elements', price: '$10', category: 'Desserts', tags: ['Gluten-Free'] },
  
  { id: '10', name: 'Spiced Craft Negroni', description: 'Jaisalmer Indian Craft Gin, Campari infused with smoky black cardamom, sweet vermouth, orange peel.', price: '$16', category: 'Drinks', tags: ['Vegan', 'Gluten-Free', 'Nut-Free'] },
  { id: '11', name: 'Artisan Ayurvedic Kombucha', description: 'House-fermented rotating seasonal flavors: Ginger-Tulsi, Hibiscus-Rose, or Jamun-Mint.', price: '$8', category: 'Drinks', tags: ['Vegan', 'Gluten-Free', 'Nut-Free'] },
];
