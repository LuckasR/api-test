import * as abonnementService from '../services/abonnementService.js';

// LISTE
export const listAbonnements = async (req, res) => {
  const abonnements = await abonnementService.getAll();
  res.render('pages/abonnements-list', { abonnements });
};

// FORM CREATE
export const showCreateAbonnement = (req, res) => {
  res.render('pages/abonnement-create');
};

// CREATE
export const createAbonnement = async (req, res) => {
  await abonnementService.create(req.body);
  res.redirect('/admin/abonnements');
};

// FORM EDIT
export const showEditAbonnement = async (req, res) => {
  const abonnement = await abonnementService.getById(req.params.id);
  res.render('pages/abonnement-edit', { abonnement });
};

// UPDATE
export const updateAbonnement = async (req, res) => {
  await abonnementService.update(req.params.id, req.body);
  res.redirect('/admin/abonnements');
};

// DELETE
export const deleteAbonnement = async (req, res) => {
  await abonnementService.delete(req.params.id);
  res.redirect('/admin/abonnements');
};