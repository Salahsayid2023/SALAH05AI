"use client";

import React from 'react';
import { supabase } from './supabase';

export const db = {
  getProjects: async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data || [];
  },
  saveProjects: async (projects: any[]) => {
    // Since we want to keep it simple for now, we'll overwrite/sync. 
    // A more robust way would be individual UPSERTs.
    const { error } = await supabase.from('projects').delete({}).then(() => {
      return supabase.from('projects').insert(projects);
    });
    if (error) console.error('Error saving projects:', error);
  },
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data || [];
  },
  saveProducts: async (products: any[]) => {
    const { error } = await supabase.from('products').delete({}).then(() => {
      return supabase.from('products').insert(products);
    });
    if (error) console.error('Error saving products:', error);
  },
  getSettings: async () => {
    const { data, error } = await supabase.from('settings').select('*').single();
    if (error || !data) {
      return {
        github: 'https://github.com/Salahsayid2023',
        facebook: 'https://www.facebook.com/SALAH05AI',
        linkedin: 'https://www.linkedin.com/in/salah-sayid-2692283a0/',
        whatsapp: 'https://wa.me/201229102164',
        siteName: 'SALAH05AI',
        footerText: '© 2026 All rights reserved. Built for the future.'
      };
    }
    return data;
  },
  saveSettings: async (settings: any) => {
    const { error } = await supabase.from('settings').upsert({ id: 1, ...settings });
    if (error) console.error('Error saving settings:', error);
  }
};
