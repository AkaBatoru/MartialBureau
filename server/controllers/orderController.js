const {Orders} = require('../models/models')
const ApiError = require('../errors/APIError')

class orderController {
    async create(req, res) {
        const {Deadline, Status, WorkerID, ClientID} = req.body
        const orders = await Orders.create({Deadline, Status, WorkerID, ClientID})
        return res.json(orders)
    }

    async getAll(req, res) {
        let {WorkerID, ClientID, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit  
        let orders;
        if (!WorkerID && !ClientID) {
            orders = await Orders.findAndCountAll({limit, offset})
        }
        if (WorkerID && !ClientID) {
            orders = await Orders.findAndCountAll({where:{WorkerID}, limit, offset})
        }
        if (!WorkerID && ClientID) {
            orders = await Orders.findAndCountAll({where:{ClientID}, limit, offset})
        }
        if (WorkerID && ClientID) {
            orders = await Orders.findAndCountAll({where:{WorkerID, ClientID}, limit, offset})
        }
        return res.json(orders)
    }

    async delete(req, res) {
        
    }
}

module.exports = new orderController()