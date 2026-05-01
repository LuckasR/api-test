import * as service from "../services/frais.service.js";
import * as cacheManager from "../services/cacheManager.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByGrille = async (req, res) => {
  try {
    const data = await service.getByGrille(req.params.grille_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    await service.create(req.body);
    res.status(201).json({ message: "Frais cree" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  // console.log("etoo ftsn");
  // console.log(req.body);
  const key = `grille-${req.body.company_id}-${req.body.zone_id}-${req.body.type_operation_id}`;
  cacheManager.clearCache(key);
  try {
    console.log("etoo ftsn 1");
    const data = await service.getByCompanyAndGrille(
      req.body.company_id,
      req.body.grille_id
    );
    console.log(data);
    if (data.length > 0) {
      console.log("donne existant !");
      const datax = {
        montant: req.body.montant,
      };
      await service.update(req.body.company_id, req.body.grille_id, datax);
      return res.json({ message: "Frais modifie" });
    } 
    
    else {
      console.log("donne n'existe pas, creation en cours...");
      const result = {
        company_id: req.body.company_id,
        grille_id: req.body.grille_id,
        zone_id: req.body.zone_id,
        montant: req.body.montant,
      };

      await service.create(result);
      return res.json({ message: "Frais cree" });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
    
 
export const deletes = async (req, res) => {
  try {
    await service.deletes(req.params.id);
    res.json({ message: "Frais supprime" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};