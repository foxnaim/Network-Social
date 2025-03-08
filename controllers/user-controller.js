const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({ token, user: { id: newUser.id, email, name } });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "Неверные учетные данные" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Неверные учетные данные" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user: { id: user.id, email, name: user.name } });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Ошибка при обновлении данных" });
    }
  },

  current: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },
};

module.exports = UserController;
