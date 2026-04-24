import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bujcwseuzzhzznychtzt.supabase.co';
const supabaseKey = 'sb_publishable_0Yivj5XZwUzMjC96n_DOig_LTXzF355'; 

export const supabase = createClient(supabaseUrl, supabaseKey);