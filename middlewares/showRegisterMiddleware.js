const sequelize = require("../config/sequelize");

module.exports = async (req, res, next)=>{
    try{
        const [results, metadata] = await sequelize.query('UPDATE stock_items SET show_register = CASE WHEN unity = 0 THEN false ELSE true END WHERE (unity = 0 AND show_register != false) OR (unity != 0 AND show_register != true)')
        if(metadata.rowCount === 0){
            console.log('Nada a atualizar')
            return next();
        }
        console.log(`${metadata.rowCount} linhas atualizadas`)
        next();
        
    }catch(error){
        return res.status(500).json(error.message);
    }
}
