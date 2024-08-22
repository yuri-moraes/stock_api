const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

module.exports = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message: "É necessário fornecer um token de autorização"})
    }
    const token = authHeader.split(' ')[1]

    try{
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({where: {email: verifiedToken.email}})

        if(!user){
            return res.status(401).json({message: "Usuário invalido"})
        }
        if(user.role !== 'admin'){
            return res.status(401).json({message: 'Usuário não autorizado'})
        }
        next()
    }catch(error){
        console.log(error)
        return res.status(401).json(error.message)
    }
}

