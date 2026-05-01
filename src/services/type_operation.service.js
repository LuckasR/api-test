import supabase from '../config/supabaseClient.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('type_operation').select('*');
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('type_operation')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const create = async (data) => {
  const { error } = await supabase.from('type_operation').insert([data]);
  if (error) throw error;
};

export const update = async (id, data) => {
  const { error } = await supabase
    .from('type_operation')
    .update(data)
    .eq('id', id);

  if (error) throw error;
};

export const deletes = async (id) => {
  const { error } = await supabase
    .from('type_operation')
    .delete()
    .eq('id', id);

  if (error) throw error;
};