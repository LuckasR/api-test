import { getUsers , loginUser } from '../services/userService.js';
import 'dotenv/config';
import jwt from "jsonwebtoken";


export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { identifiant, password } = req.body;
    console.log(req.body);

    const key = process.env.SECRET_KEY

    if (!identifiant || !password) {
      return res.status(400).json({
        message: "Identifiant et mot de passe requis"
      });
    }

    const user = await loginUser(identifiant, password);

    if (!user) {
      return res.status(401).json({
        message: "Identifiants invalides"
      });
    }


  // 🔐 2. créer token
  const token = jwt.sign(
    { identifiant: identifiant , 
      role : user.role_id 

     }, // payload
    key ,
    { expiresIn: "1h" }
  );

    res.json({
      message: "Connexion reussie",
       token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};

export const verifyToken = async (req, res, next) =>
  {
  // 🔍 1. récupérer header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token requis" });
  }

  // 🔑 2. extraire le token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // 🔐 3. vérifier le token
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }

    // ✅ 4. stocker les infos utilisateur
    req.user = decoded;

    next(); // passer à la suite
  });
}


export function getProfile(req, res) {
  const user = req.user; // récupéré du middleware

  res.json({
    message: "Profil utilisateur",
    user: user
  });
}