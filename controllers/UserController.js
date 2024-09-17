const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      // Verifique a senha aqui, se necessário
      const token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async findAll(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  async findById(req, res) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async editUser(req, res) {
    // Novo método para o endpoint específico
    try {
      const allowedFields = ["name", "password", "role"];
      const updates = Object.keys(req.body);

      const isValidOperation = updates.some((updateField) =>
        allowedFields.includes(updateField)
      );

      if (!isValidOperation) {
        return res.status(400).json({ message: "Parâmetro inválido" });
      }

      const { id } = req.params;

      const updateData = {};
      if (req.body.name) updateData.name = req.body.name;
      if (req.body.password) updateData.password = req.body.password;
      if (req.body.role && req.authenticatedUser.role === "admin")
        updateData.role = req.body.role;

      const [updatedRows] = await User.update(updateData, {
        where: { id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const updatedUser = await User.findByPk(id);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req, res) {
    try {
      const deletedRows = await User.destroy({ where: { id: req.params.id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json({ message: "Usuário deletado" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
