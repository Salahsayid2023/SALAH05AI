"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://faatuljctwkrvzyphx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhYXR1bGpjdHdza3J2enlqcGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzQ5NzEsImV4cCI6MjA5NTcxMDk3MX0.PrLeasAhK_zIv1igV-AsjxrHMLD3i-pkpwIlubdt2PA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  getProjects: async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('DB Error (getProjects):', e);
      return [];
    }
  },
  saveProjects: async (projects: any[]) => {
    try {
      // Delete all existing projects and re-insert to keep it simple and consistent with the Admin UI
      await supabase.from('projects').delete({ count: 'full' });
      const { error } = await supabase.from('projects').insert(projects);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('DB Error (saveProjects):', e);
      return false;
    }
  },
  getProducts: async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('DB Error (getProducts):', e);
      return [];
    }
  },
  saveProducts: async (products: any[]) => {
    try {
      await supabase.from('products').delete({ count: 'full' });
      const { error } = await supabase.from('products').insert(products);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('DB Error (saveProducts):', e);
      return false;
    }
  },
  getSettings: async () => {
    try {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('DB Error (getSettings):', e);
      return {
        github: 'https://github.com/Salahsayid2023',
        facebook: 'https://www.facebook.com/SALAH05AI',
        linkedin: 'https://www.linkedin.com/in/salah-sayid-2692283a0/',
        whatsapp: 'https://wa.me/201229102164',
        siteName: 'SALAH05AI',
        footerText: '© 2026 All rights reserved. Built for the future.'
      };
    }
  },
  saveSettings: async (settings: any) => {
    try {
      const { error } = await supabase.from('settings').upsert({ id: 1, ...settings });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('DB Error (saveSettings):', e);
      return false;
    }
  }
};
