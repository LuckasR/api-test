export class Frais {
  constructor({
    id,
    company_id = null,
    grille_id,
    zone_id = null,
    montant
  }) {
    this.id = id;

    this.company_id = company_id;
    this.grille_id = grille_id;
    this.zone_id = zone_id;

    this.montant = montant;
  }
}