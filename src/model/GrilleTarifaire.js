export class GrilleTarifaire {
  constructor({
    id,
    type_operation_id,
    montant_min,
    montant_max = null,
    created_at = new Date()
  }) {
    this.id = id;
    this.type_operation_id = type_operation_id;

    this.montant_min = montant_min;
    this.montant_max = montant_max;

    this.created_at = created_at;

    //  Validation logique (comme CHECK SQL)
    if (
      this.montant_max !== null &&
      this.montant_min >= this.montant_max
    ) {
      throw new Error("montant_min doit etre inferieur a montant_max");
    }
  }
}