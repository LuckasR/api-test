import supabase from '../config/supabaseClient.js';

// CREATE
export const createCompany = async (data) => {
  const { data: result, error } = await supabase
    .from('company')
    .insert([data])
    .select();

  if (error) throw error;
  return result;
};

// READ ALL
export const getAllCompanies = async () => {
  const { data, error } = await supabase
    .from('company')
    .select('*');

  if (error) throw error;
  return data;
};

// READ ONE
export const getCompanyById = async (id) => {
  const { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// UPDATE
export const updateCompany = async (id, updates) => {
  const { data, error } = await supabase
    .from('company')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

// DELETE
export const deleteCompany = async (id) => {
  const { error } = await supabase
    .from('company')
    .delete()
    .eq('id', id);

  if (error) throw error;
};