export class Utilisateur {
  constructor({
    id,
    company_id,
    role_id,
    matricule,
    name,
    prenom,
    identifiant,
    mot_de_passe_hash,
    peut_ouvrir_caisse = false,
    peut_fermer_caisse = false,
    peut_valider_transaction = false,
    peut_voir_rapports = false,
    peut_gerer_utilisateurs = false,
    actif = true,
    date_derniere_connexion = null,
    tentatives_connexion = 0,
    bloque_jusqu = null,
    created_at = new Date(),
    updated_at = new Date(),
    cree_par = null
  }) {
    this.id = id;
    this.company_id = company_id;
    this.role_id = role_id;

    this.matricule = matricule;
    this.name = name;
    this.prenom = prenom;
    this.identifiant = identifiant;
    this.mot_de_passe_hash = mot_de_passe_hash;

    this.peut_ouvrir_caisse = peut_ouvrir_caisse;
    this.peut_fermer_caisse = peut_fermer_caisse;
    this.peut_valider_transaction = peut_valider_transaction;
    this.peut_voir_rapports = peut_voir_rapports;
    this.peut_gerer_utilisateurs = peut_gerer_utilisateurs;

    this.actif = actif;

    this.date_derniere_connexion = date_derniere_connexion;
    this.tentatives_connexion = tentatives_connexion;
    this.bloque_jusqu = bloque_jusqu;

    this.created_at = created_at;
    this.updated_at = updated_at;

    this.cree_par = cree_par;
  }
}