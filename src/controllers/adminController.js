import * as companyService from '../services/companyService.js';
import * as userService from '../services/userService.js';
import * as abonnementService from '../services/abonnementService.js';
import * as companyAbonnementService from '../services/companyAbonnementService.js';


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
    const companyId = req.params.id;

    const company = await companyService.getCompanyById(companyId);
    const users = await userService.getUsersByCompany(companyId);
    const abonnements = await companyAbonnementService.getByCompany(companyId);

    res.render('pages/company-detail', { 
      company, 
      users, 
      abonnements 
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};


// afficher formulaire
export const showCreateUserForm = (req, res) => {
  const companyId = req.params.id;

  res.render('pages/user-create', { companyId });
};

// traiter formulaire
export const createUser = async (req, res) => {
  try {
    const companyId = req.params.id;

    const data = {
      ...req.body,
      company_id: companyId
    };

    await userService.createUser(data);

    res.redirect(`/admin/companies/${companyId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



// afficher form
export const showAddAbonnement = async (req, res) => {
  const companyId = req.params.id;

  const abonnements = await abonnementService.getAll();

  res.render('pages/company-abonnement-create', {
    companyId,
    abonnements
  });
};

// créer abonnement
export const createCompanyAbonnement = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { abonnement_id } = req.body;

    await companyAbonnementService.subscribe(companyId, abonnement_id);

    res.redirect(`/admin/companies/${companyId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
