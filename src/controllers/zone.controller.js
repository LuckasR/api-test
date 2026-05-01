import * as service from "../services/zone.service.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    await service.create(req.body);
    res.status(201).json({ message: "Zone cree" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    res.json({ message: "Zone modifie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletes = async (req, res) => {
  try {
    await service.deletes(req.params.id);
    res.json({ message: "Zone supprime" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};