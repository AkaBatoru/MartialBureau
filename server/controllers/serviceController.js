const uuid = require('uuid')
const path = require('path')
const {Services} = require('../models/models')
const ApiError = require('../errors/APIError');

class serviceController {
    async create(req, res, next) {
        try{
        const {Name, Cost, Description, Type} = req.body

        const {Img} = req.files;
        let fileName = uuid.v4() + ".jpg"
        Img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const services = await Services.create({Name, Cost, Description, Type, Img: fileName})
        return res.json(services)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {Type, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let services;
        if (!Type) {
            services = await Services.findAll({})
        }
        if (Type) {
            services = await Services.findAndCountAll({where:{Type}})
            console.log("Тип передан", services)
        }
        return res.json(services)
    }

    async getOne(req, res) {
        try {
            const { ID_Service } = req.params;
            const service = await Services.findOne({ where: { ID_Service } });
            console.log("service in getOne:", service);
            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }
    
            return res.json(service);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    async update(req, res, next) {
        try {
            const post = req.body;
            if (!post.ID_Service) {
                return res.status(400).json({ message: 'ID не указан' });
            }
            const updatedPost = await Services.update(post, { where: { ID_Service: post.ID_Service }});
            return res.json(updatedPost);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        } 
    }
    

    async delete(req, res) {
        const ID = parseInt(req.params.ID_Service,10)
        try {
            const service = await Services.destroy({
                where: { ID_Service: ID }
            });
            if (service) {
                // Запись была успешно удалена
                return res.json(service);
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new serviceController()