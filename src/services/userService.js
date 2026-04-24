import supabase from '../config/supabaseClient.js';

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*');

  if (error) throw error;

  return data;
}