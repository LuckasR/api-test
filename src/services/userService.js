import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcrypt';
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*');

  if (error) throw error;

  return data;
}
 



export const createUser = async (data) => {
  // 1. Vérifier le mot de passe
  if (!data.mot_de_passe_hash) {
    throw new Error("Mot de passe requis");
  }

  // 2. Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(data.mot_de_passe_hash, 10);

  // 3. Remplacer par le hash
  const userData = {
    ...data,
    mot_de_passe_hash: hashedPassword
  };

  // 4. Insert en base
  const { data: result, error } = await supabase
    .from('utilisateurs')
    .insert([userData]);

  if (error) throw error;

  return result;
};

 

export const loginUser = async (identifiant, password) => {
  // 1. Chercher l'utilisateur
  const { data: user, error } = await supabase
    .from('utilisateurs')
    .select('*')
    .eq('identifiant', identifiant)
    .single();

  if (error || !user) {
    console.log("Tsy ita le user ! ");
    return null; // utilisateur non trouvé
  }

  // 2. Vérifier le mot de passe
  const isValid = await bcrypt.compare(password, user.mot_de_passe_hash);

  if (!isValid) {
     console.log("Invalide ny mot de passe ! ");
    return null; // mauvais mot de passe
  }

  // 3. Succès
  return user;
};


export const getUsersByCompany = async (companyId) => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*')
    .eq('company_id', companyId);

  if (error) throw error;
  return data;
};

// export const findUserByEmail = async (email , password  ) => {
//   const { data,} = await supabase    .from('utilisateurs')
//     .select('*')
//     .eq('email', email)
//     .eq('password', password)
//     .single();  
//   return data;
// }