const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
    const { rol } = req.query; // Obtener el rol del query string
    const whereClause = rol ? { rol } : {}; // Filtrar si se proporciona un rol
    const results = await User.findAll({ 
        where: whereClause,
        order: [['id', 'DESC']] // Ordenar por id de mayor a menor
    });
    return res.json(results);
});



const create = catchError(async(req, res) => {
    const {firstName, lastName, email, password, rol, status, phone, } = req.body;
    const encriptedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: encriptedPassword,
      rol,
      status,

    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { email, firstName, lastName, rol, status, phone, documentType, document, documentCity } = req.body; 
    const result = await User.update(
        { email, firstName, lastName, rol, status, phone, documentType, document, documentCity },
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


  
 
const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    
    // Verificar si el usuario existe
    if (!user) return res.status(401).json({ message: "Credenciales Inválidas" });
    
    // Verificar si el usuario está activo
    if (!user.status) return res.status(401).json({ message: "Usuario inactivo" });
  
    // Verificar si la contraseña es válida
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Credenciales Inválidas" });
  
    // Generar token JWT
    const token = jwt.sign(
      { user },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );
  
    // Enviar respuesta con el usuario y el token
    return res.json({ user, token });
  });
  

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}