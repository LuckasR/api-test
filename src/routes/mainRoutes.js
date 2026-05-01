import express from "express";
import * as type_controller from "../controllers/type_operation.controller.js";
import * as zone_controller from "../controllers/zone.controller.js";
import * as grille_controller from "../controllers/grille_tarifaire.controller.js";
import * as fee_controller from "../controllers/frais.controller.js";

const router = express.Router();

// 🔹 TYPE OPERATION
router.get("/type-operations", type_controller.getAll);
router.get("/type-operations/:id", type_controller.getById);
router.post("/type-operations", type_controller.create);
router.put("/type-operations/:id", type_controller.update);
router.delete("/type-operations/:id", type_controller.deletes);

// 🔹 ZONE
router.get("/zones", zone_controller.getAll);
router.get("/zones/:id", zone_controller.getById);
router.post("/zones", zone_controller.create);
router.put("/zones/:id", zone_controller.update);
router.delete("/zones/:id", zone_controller.deletes);

// 🔹 GRILLE
router.get("/grilles", grille_controller.getAll);
router.get("/grilles/type/:type_operation_id", grille_controller.getByType);
router.post("/grilles", grille_controller.create);
router.put("/grilles/:id", grille_controller.update);
router.delete("/grilles/:id", grille_controller.deletes);
router.get(
  "/grille/:company_id/:zone_id/:type_operation_id",
  grille_controller.getGrilleTarif
);

// 🔹 FRAIS (corrigé ici 🔥)
router.get("/frais", fee_controller.getAll);
router.get("/frais/grille/:grille_id", fee_controller.getByGrille);
router.post("/frais", fee_controller.create);
router.put("/frais/:id", fee_controller.update);
router.delete("/frais/:id", fee_controller.deletes);

export default router;  