import { PROJECTS as DEFAULT_PROJECTS } from './../data/projects';
import { STORE_PRODUCTS as DEFAULT_PRODUCTS } from './../data/store';

// A simple LocalStorage-based DB to make the site dynamic immediately 
// without needing complex API keys for the first demo.
export const db = {
  getProjects: () => {
    if (typeof window === 'undefined') return DEFAULT_PROJECTS;
    const data = localStorage.getItem('salah_projects');
    return data ? JSON.parse(data) : DEFAULT_PROJECTS;
  },
  saveProjects: (projects: any[]) => {
    localStorage.setItem('salah_projects', JSON.stringify(projects));
  },
  getProducts: () => {
    if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
    const data = localStorage.getItem('salah_products');
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
  },
  saveProducts: (products: any[]) => {
    localStorage.setItem('salah_products', JSON.stringify(products));
  },
  getSettings: () => {
    if (typeof window === 'undefined') return {
      github: 'https://github.com/Salahsayid2023',
      facebook: 'https://www.facebook.com/SALAH05AI',
      linkedin: 'https://www.linkedin.com/in/salah-sayid-2692283a0/',
      whatsapp: 'https://wa.me/201229102164',
      siteName: 'SALAH05AI',
      footerText: '© 2026 All rights reserved. Built for the future.'
    };
    const data = localStorage.getItem('salah_settings');
    return data ? JSON.parse(data) : {
      github: 'https://github.com/Salahsayid2023',
      facebook: 'https://www.facebook.com/SALAH05AI',
      linkedin: 'https://www.linkedin.com/in/salah-sayid-2692283a0/',
      whatsapp: 'https://wa.me/201229102164',
      siteName: 'SALAH05AI',
      footerText: '© 2026 All rights reserved. Built for the future.'
    };
  },
  saveSettings: (settings: any) => {
    localStorage.setItem('salah_settings', JSON.stringify(settings));
  }
};
