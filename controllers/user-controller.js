const { prisma } = require("../prisma/prisma-client");

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name){
     return res.status(400).json({error: "Все поля обязательны"})
    } try{
     const existingUser = await prisma.user.findUnique(({where:{email}}));
    if(existingUser){
     return res.status(400).json({error: "Пользователь уже существует"})
   }
  }catch(error){

   
  },
  login: async (req, res) => {
    res.send("Login");
  },
  getUserById: async (req, res) => {
    res.send("getUserById");
  },
  updateUser: async (req, res) => {
    res.send("updateUser");
  },
  current: async (req, res) => {
    res.send("current");
  },
};

module.exports = UserController;
