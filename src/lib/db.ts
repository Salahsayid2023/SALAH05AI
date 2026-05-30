"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://faatuljctwkrvzyphx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhYXR1bGpjdHdza3J2enlqcGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzQ5NzEsImV4cCI6MjA5NTcxMDk3MX0.PrLeasAhK_zIv1igV-AsjxrHMLD3i-pkpwIlubdt2PA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  getProjects: async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase Error:', error);
      return [];
    }
    return data || [];
  },
  saveProjects: async (projects: any[]) => {
    // Simple overwrite: delete all and insert new ones
    const { error: delError } = await supabase.from('projects').delete({ count: 'full' }); 
    if (delError) console.error('Delete Error:', delError);
    
    const { error: insError } = await supabase.from('projects').insert(projects);
    if (insError) console.error('Insert Error:', insError);
  },
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase Error:', error);
      return [];
    }
    return data || [];
  },
  saveProducts: async (products: any[]) => {
    const { error: delError } = await supabase.from('products').delete({ count: 'full' });
    if (delError) console.error('Delete Error:', delError);
    
    const { error: insError } = await supabase.from('products').insert(products);
    if (insError) console.error('Insert Error:', insError);
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
    if (error) console.error('Savesettings Error:', error);
  }
};
