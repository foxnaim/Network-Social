const UserController = {
 register: async (req, res) =>{
 const {
  email,
 password,
 name,
 } = req.body
 console.log(email,
  password,
  name,)
 },
 login: async (req, res) =>{
  res.send("Login")
 },
 getUserById: async (req, res) =>{
  res.send("getUserById")
 },
 updateUser: async (req, res) =>{
  res.send("updateUser")
 },
 current: async (req, res) =>{
  res.send("current")
 },
}

module.exports = UserController;
