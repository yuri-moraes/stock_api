const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async register(req, res){
        try{
            const {name, email, password} = req.body;
            const user = await User.create({name, email, password})
            return res.status(201).json(user)
        }catch(error){
            return res.status(500).json(error.message);
        }
    },
    async login(req, res){
        try{
            const {email} = req.body;
            const user = await User.findOne({where: {email: email}});
            const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn: '1h'});
            return res.status(200).json({message: `Bem-vindo, ${user.name}! Aqui está o seu token: ${token}`});
        }catch(error){
            return res.status(500).json(error.message); 
        }
    },
    async findAll(req, res){
        try{
            const users = await User.findAll();
            return res.status(200).json(users);
        }catch(error){
            return res.status(500).json(error.message);
        }
    },
    async findById(req, res){
        try{
            const {id} = req.params
            const user = await User.findByPk(id)
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado!"})
            }
            return res.status(200).json(user)
        }catch(error){
            return res.status(500).status(error.message)
        }
    },
    async update(req, res){
        try{
            const {name, password, role} = req.body;
            const updatedRows = await User.update({name, password, role},{
                where: {id: req.params.id}
            })
            const allowedFields = ['name', 'password', 'role']
            const updates = Object.keys(req.body)
            const isValidOperation = updates.every((updateBody) => allowedFields.includes(updateBody))
            if(!isValidOperation){
                return res.status(400).json({message: "Parâmetro invalido"})
            }
            if(updatedRows[0] === 0){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
            return res.status(200).json({message: "Usuário atualizado!"})
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async delete(req, res){
        try{
            const deletedRows = await User.destroy({where:{id: req.params.id}})
            if(deletedRows === 0){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
            return res.status(200).json({message: 'Usuário deletado'})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

}