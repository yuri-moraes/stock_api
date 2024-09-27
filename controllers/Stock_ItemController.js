const { QueryTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Stock_item = require('../models/stock_item');

const allowedCategories = ['Jogos', 'Livros', 'Brinquedos', 'Acessórios'];

module.exports ={
    async createItem(req, res, next){
        try{
            const {title, description, unity, price, category} = req.body;        
            
            if(!allowedCategories.includes(category)){
                return res.status(400).json({message: `Categoria ${category} não é válida para a operação`})
            }

            const stock_item = await Stock_item.create({title, description, unity, price, category});
            req.action = `inseriu o item ${stock_item.id}`;
            next();
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async findAll(req, res){
        try{
            const stock_items = await Stock_item.findAll()
            return res.status(200).json(stock_items)
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async findById(req, res){
        try{            
            const {id} = req.params
            const stock_item = await Stock_item.findByPk(id)
            if(!stock_item){
                return res.status(404).json({message: 'Item não encontrado!'})
            }
            return res.status(200).json(stock_item)
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async update(req, res, next){
        try{
            const {title, description, unity, price, category} = req.body;
            const allowedFields = ['title', 'description', 'unity', 'price', 'category']
            const updates = Object.keys(req.body)
            const isValidOperation = updates.every((updateBody) => allowedFields.includes(updateBody))

            if(!isValidOperation){
                return res.status(400).json({message: "Parâmetro invalido"})
            }
            console.log(category)
            if(category !== undefined && !allowedCategories.includes(req.body.category)){
                console.log('caiu no if')
                return res.status(400).json({message: `Categoria ${category} não é válida para a operação`})
            }

            const updatedRows = await Stock_item.update({title, description, unity, price, category},{
                where:{id: req.params.id}
            })

            if(updatedRows[0] === 0){
                return res.status(404).json({message: "Item não encontrado!"})
            }
            req.action = `fez uma alteração no item ${req.params.id}`
            next()
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async delete(req, res, next){
        try{
            const deletedRows = await Stock_item.destroy({where: {id: req.params.id}})
            if(deletedRows === 0){
                return res.status(404).json({message: 'Item não encontrado!'})
            }
            req.action = `deletou o item com id ${req.params.id}`
            next()
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async remove_items(req, res, next){
        try{
            const {id} = req.params
            const {unity} = req.body
            const stock_item = await Stock_item.findByPk(id)

            if(!stock_item){
                return res.status(404).json({message: 'Item não encontrado!'})
            }
            const newQuantity = stock_item.unity-unity
            if(newQuantity < 0){
                return res.status(400).json({message: 'Não há mais items em estoque'})
            }
            await stock_item.update({unity: newQuantity})
            req.action = `retirou ${unity} unidades do item ${stock_item.id}`;
            next()
        }catch(error){
            return res.status(500).json(error.message)
        }

    },
    async insert_items(req, res, next){
        try{
            const {id} = req.params
            const {unity} = req.body
            const stock_item = await Stock_item.findByPk(id)
            if(!stock_item){
                return res.status(404).json({message: 'Item não encontrado!'})
            }
            const newQuantity = stock_item.unity+unity
            await stock_item.update({unity: newQuantity})
            req.action = `adicionou ${unity} unidades do item ${stock_item.id}`;
            next();
        }catch(error){
            return res.status(500).json(error.message)
        }
    },
    async search_items(req, res){
        try{
            const search_param = req.params.param;

            let query;
            let replacements;
            //Regex validar UUID
            const uuidRegex =/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

            if(uuidRegex.test(search_param)){
                //Se for UUID válido, faz a busca por ID
                query = 'SELECT * FROM stock_items WHERE id = :search_id';
                replacements = {search_id: search_param};
            }else{
                //Caso contrário busca pelo titulo
                query = 'SELECT * FROM stock_items WHERE title ILIKE :search_title'
                replacements = {search_title: `%${search_param}%`}
            }

            const items = await sequelize.query(query,{
                replacements,
                type: QueryTypes.SELECT,
            })

            if(items.length === 0){
                return res.status(404).json({message: 'Item não encontrado'})
            }

            return res.status(200).json(items)
            
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}