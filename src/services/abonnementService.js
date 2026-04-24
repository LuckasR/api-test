import supabase from '../config/supabaseClient.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('abonnements').select('*');
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('abonnements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const create = async (data) => {
  const { error } = await supabase.from('abonnements').insert([data]);
  if (error) throw error;
};

export const update = async (id, data) => {
  const { error } = await supabase
    .from('abonnements')
    .update(data)
    .eq('id', id);

  if (error) throw error;
};

export const deletes = async (id) => {
  const { error } = await supabase
    .from('abonnements')
    .delete()
    .eq('id', id);

  if (error) throw error;
};