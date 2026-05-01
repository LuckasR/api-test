import * as service from "../services/grille_tarifaire.service.js";
import * as cacheManager from "../services/cacheManager.js";

const TTL = 5 * 60 * 1000; // 5 minutes
export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByType = async (req, res) => {
  try {
    const data = await service.getByType(req.params.type_operation_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletes = async (req, res) => {
  try {
    await service.deletes(req.params.id);
    res.json({ message: "Grille supprimee" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 
export const create = async (req, res) => {
  try {
    await service.create(req.body);
    res.status(201).json({ message: "Grille cree" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    res.json({ message: "Grille modifiee" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mise en cache dans cache si linformation est present 
export const getGrilleTarif = async (req, res) => {
  try {
    const companyId = parseInt(req.params.company_id);
    const zoneId = parseInt(req.params.zone_id);
    const typeOperationId = parseInt(req.params.type_operation_id);

    if (isNaN(companyId) || isNaN(zoneId) || isNaN(typeOperationId)) {
      return res.status(400).json({ error: "Parametres invalides" });
    }

    const cacheKey = `grille-${companyId}-${zoneId}-${typeOperationId}`;

    const cached = cacheManager.getCache(cacheKey, TTL);

    //  Vérifier expiration
    if (cached) {
      console.log("CACHE HIT ");
      return res.json(cached);
    }

    console.log("CACHE MISS ");

    const data = await service.getGrilleTarif(
      companyId,
      zoneId,
      typeOperationId
    );

    cacheManager.setCache(cacheKey, data);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
