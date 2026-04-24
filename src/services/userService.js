import supabase from '../config/supabaseClient.js';

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*');

  if (error) throw error;

  return data;
}
 

export const createUser = async (data) => {
  const { data: result, error } = await supabase
    .from('utilisateurs')
    .insert([data]);

  if (error) throw error;
  return result;
};

export const getUsersByCompany = async (companyId) => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*')
    .eq('company_id', companyId);

  if (error) throw error;
  return data;
};

