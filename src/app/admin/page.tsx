"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Save, LogOut, LayoutDashboard, Package, Globe, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/db';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentItem, setCurrentItem] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    category: '', 
    price: '', 
    link: '', 
    impact: '', 
    features: '' 
  });

  const [settings, setSettings] = useState({
    github: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    siteName: '',
    footerText: ''
  });

  const loadData = async () => {
    if (activeTab === 'projects') {
      const data = await db.getProjects();
      setItems(data);
    } else if (activeTab === 'store') {
      const data = await db.getProducts();
      setItems(data);
    }
  };

  useEffect(() => {
    const initData = async () => {
      await loadData();
      if (activeTab === 'settings') {
        const settingsData = await db.getSettings();
        setSettings(settingsData);
      }
    };
    initData();
  }, [activeTab]);
  const handleSaveSettings = () => {
    db.saveSettings(settings);
    alert('Settings saved successfully!');
  };

  const handleOpenModal = (index?: number) => {
    if (index !== undefined) {
      setEditIndex(index);
      setCurrentItem(items[index]);
    } else {
      setEditIndex(null);
      setCurrentItem({ title: '', description: '', image: '', category: '', price: '', link: '', impact: '', features: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    let updatedItems = [...items];
    
    const finalItem = { ...currentItem } as any;
    if (activeTab === 'store' && typeof currentItem.features === 'string') {
      finalItem.features = currentItem.features.split(',').map((f: string) => f.trim());
    }

    if (editIndex !== null) {
      updatedItems[editIndex] = finalItem;
    } else {
      updatedItems.push({ ...finalItem, id: Date.now().toString() });
    }

    if (activeTab === 'projects') {
      await db.saveProjects(updatedItems);
    } else {
      await db.saveProducts(updatedItems);
    }
    
    setItems(updatedItems);
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const filtered = items.filter((_, i) => i !== index);
    if (activeTab === 'projects') {
      db.saveProjects(filtered);
    } else {
      db.saveProducts(filtered);
    }
    setItems(filtered);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-surface border border-white/10 backdrop-blur-xl shadow-2xl text-center"
        >
          <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Empire Access</h1>
          <p className="text-muted mb-8">Enter the secret key to manage your portal</p>
          <div className="flex flex-col gap-4">
            <input 
              type="password" 
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-center text-white"
              placeholder="Secret Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={() => password === 'salah05' ? setIsAuth(true) : alert('Wrong Key!')}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-accent hover:text-white transition-all"
            >
              Unlock Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-surface/50 backdrop-blur-xl p-6 flex flex-col gap-8">
        <div className="text-xl font-bold tracking-tighter mb-8">
          ADMIN<span className="text-accent">05</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={cn("flex items-center gap-3 p-3 rounded-xl transition-all", activeTab === 'projects' ? "bg-accent text-white" : "text-muted hover:bg-white/5")}
          >
            <LayoutDashboard className="w-5 h-5" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('store')}
            className={cn("flex items-center gap-3 p-3 rounded-xl transition-all", activeTab === 'store' ? "bg-accent text-white" : "text-muted hover:bg-white/5")}
          >
            <Package className="w-5 h-5" /> Digital Store
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("flex items-center gap-3 p-3 rounded-xl transition-all", activeTab === 'settings' ? "bg-accent text-white" : "text-muted hover:bg-white/5")}
          >
            <Globe className="w-5 h-5" /> Site Settings
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => setIsAuth(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            {activeTab === 'projects' ? 'Manage Projects' : activeTab === 'store' ? 'Manage Store' : 'Settings'}
          </h2>
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-accent rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'settings' ? (
            <div className="bg-surface border border-white/10 rounded-3xl p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold mb-6">Site Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">Site Name</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">Footer Text</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.footerText}
                    onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">GitHub URL</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.github}
                    onChange={(e) => setSettings({...settings, github: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">Facebook URL</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.facebook}
                    onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">LinkedIn URL</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest">WhatsApp URL</label>
                  <input 
                    type="text" 
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  onClick={handleSaveSettings}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-accent hover:text-white transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save All Settings
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-muted text-xs uppercase tracking-widest">
                  <tr className="border-b border-white/5">
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-12 text-center text-muted italic">
                        No items found. Start by adding your first project!
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                            ) : (
                              <div className="w-full h-full bg-accent/30 flex items-center justify-center text-[10px] text-white/50">No Img</div>
                            )}
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </td>
                        <td className="p-4 text-muted text-sm">{item.category}</td>
                        <td className="p-4 flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(index)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(index)}
                            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h3 className="text-xl font-bold">{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[80vh]">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted uppercase tracking-widest">Title</label>
                      <input 
                        type="text" 
                        className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                        value={currentItem.title}
                        onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted uppercase tracking-widest">Category</label>
                      <input 
                        type="text" 
                        className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                        value={currentItem.category}
                        onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted uppercase tracking-widest">Image URL</label>
                      <input 
                        type="text" 
                        className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                        value={currentItem.image}
                        onChange={(e) => setCurrentItem({...currentItem, image: e.target.value})}
                      />
                    </div>
                    {activeTab === 'store' && (
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-muted uppercase tracking-widest">Price</label>
                        <input 
                          type="text" 
                          className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={currentItem.price}
                          onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted uppercase tracking-widest">Description</label>
                      <textarea 
                        className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none h-32"
                        value={currentItem.description}
                        onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted uppercase tracking-widest">Link/URL</label>
                      <input 
                        type="text" 
                        className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                        value={currentItem.link}
                        onChange={(e) => setCurrentItem({...currentItem, link: e.target.value})}
                      />
                    </div>
                    {activeTab === 'projects' ? (
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-muted uppercase tracking-widest">Impact</label>
                        <input 
                          type="text" 
                          className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none"
                          value={currentItem.impact}
                          onChange={(e) => setCurrentItem({...currentItem, impact: e.target.value})}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-muted uppercase tracking-widest">Features (comma separated)</label>
                        <textarea 
                          className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent outline-none h-20"
                          value={currentItem.features}
                          onChange={(e) => setCurrentItem({...currentItem, features: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-6 py-2 rounded-full text-muted hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave} 
                    className="px-8 py-2 rounded-full bg-white text-black font-bold hover:bg-accent hover:text-white transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Item
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
