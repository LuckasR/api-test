import supabase from '../config/supabaseClient.js';

export const getAll = async () => {
  const { data, error } = await supabase
    .from('grille_tarifaire')
    .select('*');

  if (error) throw error;
  return data;
};

export const getByType = async (type_operation_id) => {
  const { data, error } = await supabase
    .from('grille_tarifaire')
    .select('*')
    .eq('type_operation_id', type_operation_id);

  if (error) throw error;
  return data;
};

export const create = async (data) => {
  const { error } = await supabase
    .from('grille_tarifaire')
    .insert([data]);

  if (error) throw error;
};

export const update = async (id, data) => {
  const { error } = await supabase
    .from('grille_tarifaire')
    .update(data)
    .eq('id', id);

  if (error) throw error;
};

export const deletes = async (id) => {
  const { error } = await supabase
    .from('grille_tarifaire')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getGrilleTarif = async (companyId, zoneId, typeOperationId) => {
  if(typeOperationId == 1) {
    zoneId = null; // Traiter la zone 1 comme une valeur nulle
  }
  const { data, error } = await supabase.rpc('get_grille_tarif', {
    p_company_id: companyId,
    p_zone_id: zoneId,
    p_type_operation_id: typeOperationId
  });

  if (error) throw error;
  return data;
};
