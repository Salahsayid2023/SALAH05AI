import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://faatuljctwkrvzyphx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhYXR1bGpjdHdza3J2enlqcGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzQ5NzEsImV4cCI6MjA5NTcxMDk3MX0.PrLeasAhK_zIv1igV-AsjxrHMLD3i-pkpwIlubdt2PA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
