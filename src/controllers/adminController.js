import * as companyService from '../services/companyService.js';

// afficher la page
export const showCreateForm = (req, res) => {
  res.render('pages/company-create');
};

// traiter le formulaire
export const createCompany = async (req, res) => {
  try {
    await companyService.createCompany(req.body);

    // redirection après création
    res.redirect('/admin/companies/create');
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// LISTE
export const listCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.render('pages/company-list', { companies });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DETAIL
export const showCompany = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.render('pages/company-detail', { company });
  } catch (err) {
    res.status(500).send(err.message);
  }
};