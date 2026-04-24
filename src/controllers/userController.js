import { getUsers } from '../services/userService.js';

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};