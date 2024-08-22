const User = require("../models/users");
const {v4: isUuid} = require('uuid');
module.exports={
    async validateData(req, res, next){
        const {name, email, password} = req.body;
        const user = await User.findOne({where: {email: email}});

        if(user){
            console.log('email cadastrado')
            return res.status(400).json({message: `O email ${user.email} já está cadastrado!`});
        }

        if(typeof name !== 'string' || !email.includes('@') || typeof password !== 'string'){
            console.log('dados inválidoss')
            return res.status(400).json({message: `Dados inválidos`});
        }
        
        console.log('Dados válidos!')
        next()
    },
    async validateLogin(req, res, next){
        const {email, password} = req.body;
        if(typeof email !== 'string' || typeof password !== 'string'){
            return res.status(400).json({message: 'Tipo de email ou senha invalido'})
        }
        const user = await User.findOne({where: {email: email}});
        if(!user){
            return res.status(404).json({message: 'Usuário não existe'});
        }
        if(user.password !== password){
            return res.status(401).json({message: 'email ou senha incorretos'});
        } 
        next()
    },
    async validadeUuid(req,res,next){
        const {id} = req.params
        if(!isUuid(id) || id.length !== 36){
            return res.status(400).json({message: "Formato de UUID inválido!"})
        }
        next()
    }
}