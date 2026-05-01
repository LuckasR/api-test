import * as companyServices from '../services/companyServices.js';

// CREATE
export const create = async (req, res) => {
  try {
    const company = await companyServices.createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getAll = async (req, res) => {
  try {
    const companies = await companyServices.getAllCompanies();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
export const getById = async (req, res) => {
  try {
    const company = await companyServices.getCompanyById(req.params.id);
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const company = await companyServices.updateCompany(req.params.id, req.body);
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    await companyServices.deleteCompany(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};