import supabase from '../config/supabaseClient.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('frais').select('*');
  if (error) throw error;
  return data;
};

export const getByGrille = async (grille_id) => {
  const { data, error } = await supabase
    .from('frais')
    .select('*')
    .eq('grille_id', grille_id);

  if (error) throw error;
  return data;
};


export const getByCompanyAndGrille = async (company_id, grille_id) => {
   console.log("hello service");
  const { data, error } = await supabase
    .from('frais')
    .select('*')
    .eq('company_id', company_id)
    .eq('grille_id', grille_id);
   console.log("mba eto aloha ");
   console.log(data);
  if (error) throw error;
  return data;
};
 
 

export const create = async (data) => {
  console.log("data:", data);

  const { data: insertedData, error } = await supabase
    .from('frais')
    .insert(data)
    .select();

  if (error) {
    console.error("ERROR INSERT:", error);
    throw error;
  }

  console.log("Inserted:", insertedData);

  return insertedData;
};

export const update = async (id_company, id_grille, data) => {
  console.log("Updating with data:", { id_company, id_grille, data });
  const { data: updatedData, error } = await supabase
    .from('frais')
    .update(data)
    .eq('company_id', id_company)
    .eq('grille_id', id_grille)
    .select();

  if (error) {
    console.error("❌ ERREUR UPDATE:");
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    console.error("Code:", error.code);
    throw error;
  }

  if (!updatedData || updatedData.length === 0) {
    console.warn("⚠️ Aucune ligne mise à jour");
  } else {
    console.log("✅ Update réussi:", updatedData);
  }

  return updatedData;
};

export const deletes = async (id) => {
  const { error } = await supabase
    .from('frais')
    .delete()
    .eq('id', id);

  if (error) throw error;
};