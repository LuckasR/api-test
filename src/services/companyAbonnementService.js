import supabase from '../config/supabaseClient.js';

export const subscribe = async (companyId, abonnementId) => {

  // 1. récupérer abonnement
  const { data: abonnement } = await supabase
    .from('abonnements')
    .select('*')
    .eq('id', abonnementId)
    .single();

  // 2. récupérer dernier abonnement actif
  const { data: last } = await supabase
    .from('company_abonnements')
    .select('*')
    .eq('company_id', companyId)
    .order('date_fin', { ascending: false })
    .limit(1)
    .single();

  let dateDebut = new Date();

  // 🔥 LOGIQUE CUMUL
  if (last && new Date(last.date_fin) > new Date()) {
    dateDebut = new Date(last.date_fin);
  }

  const dateFin = new Date(dateDebut);
  dateFin.setDate(dateFin.getDate() + abonnement.duree_jours);

  // 3. insert abonnement


// 1 ->  (1, 'ACTIF', 'Abonnement en cours', 1),
// 2 ->  (1, 'EXPIRE', 'Abonnement terminé', 2),
// 3 ->  (1, 'FUTUR', 'Abonnement payé mais pas encore commencé', 3),
// 4 ->  (1, 'ANNULE', 'Abonnement annulé', 4),
// 5 ->  (1, 'SUSPENDU', 'Abonnement bloqué (ex: non paiement, fraude)', 5);

  const { data: newAbonnement, error } = await supabase
    .from('company_abonnements')
    .insert([{
      company_id: companyId,
      abonnement_id: abonnementId,
      date_debut: dateDebut,
      date_fin: dateFin,
      statut: 1 // ex: ACTIF
    }])
    .select()
    .single();

  if (error) throw error;

  // 4. paiement
  await supabase.from('paiements_abonnements').insert([{
    company_abonnement_id: newAbonnement.id,
    montant: abonnement.prix
  }]);
};


export const getByCompany = async (companyId) => {
  const { data, error } = await supabase
    .from('company_abonnements')
    .select(`
      id,
      date_debut,
      date_fin,
      abonnements (nom, prix),
      status_generalized (code, label)
    `)
    .eq('company_id', companyId)
    .order('date_fin', { ascending: false });

  if (error) throw error;
  return data;
};