import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, X } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menu';

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'] as const;
const filterTags = ['Vegan', 'Gluten-Free', 'Nut-Free'];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [instructions, setInstructions] = useState('');
  const { addToCart } = useCart();

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = activeTags.length === 0 || activeTags.every(tag => item.tags?.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, instructions);
      setSelectedItem(null);
      setInstructions('');
    }
  };

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">
            Culinary Masterpieces
          </h3>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-full text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Category Toggle */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeTags.includes(tag)
                    ? 'bg-accent/10 text-accent border-accent'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-x-16 gap-y-10"
            >
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2 border-b border-stone-200 pb-2 border-dashed group-hover:border-accent transition-colors">
                      <h4 className="text-xl font-serif font-bold text-stone-900 group-hover:text-accent transition-colors w-2/3">
                        {item.name}
                        {item.isPopular && (
                          <span className="ml-3 inline-block px-2 py-0.5 text-[10px] uppercase font-sans tracking-wider bg-accent/10 text-accent rounded-full align-middle mb-1">
                            Popular
                          </span>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map(tag => (
                              <span key={tag} className="inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-stone-100 text-stone-500 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-medium text-stone-900">{item.price}</span>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setInstructions('');
                          }}
                          className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all opacity-0 group-hover:opacity-100"
                          title="Add to order"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-stone-500 font-light text-sm pr-12">
                      {item.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-stone-500 font-medium text-lg">No menu items found</p>
                  <p className="text-stone-400 text-sm mt-1">Try adjusting your search or category filter.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Item Modal for Modifiers */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden pointer-events-auto"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-start bg-stone-50">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">{selectedItem.name}</h3>
                  <p className="text-stone-500 font-medium mt-1">{selectedItem.price}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-200"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-stone-600 font-light mb-6">
                  {selectedItem.description}
                </p>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-stone-900">
                    Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Extra spicy, no onions, sauce on the side..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 mt-8 bg-stone-900 text-white rounded-2xl font-semibold hover:bg-stone-800 transition-colors"
                >
                  Add to Order - {selectedItem.price}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
