const {Users, Orders} = require('../models/models')
const ApiError = require('../errors/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('sequelize')

const generateJwt = (id, Login, Contacts, Role) => {
    return jwt.sign(
        {id, Login, Contacts, Role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration(req, res, next) {
        const {Login, Password, Contacts, Role} = req.body
    
        if(!Login || !Password) {
            return next(ApiError.badRequest('Введены некорректные данные'))
        }
    
        try {
            let user = await Users.findOne({ where: { Login } })
            if(user) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }
            
            const hashPassword = await bcrypt.hash(Password, 10)
            user = await Users.create({Login, Password: hashPassword, Contacts, Role})
            
            const token = generateJwt(user.id, user.Login, user.Contacts, user.Role)
            
            return res.json({
                token,
                user: {
                    id: user.id,
                    Login: user.Login,
                    Contacts: user.Contacts,
                    Role: user.Role
                }
            })
        } catch(err) {
            return next(err)
        }
    }
    


    async login(req, res, next) {
        const {Login, Password} = req.body
        const user = await Users.findOne({ where: { Login } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь не существует'))
        }
        let comparePassword = bcrypt.compareSync(Password, user.Password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.Login, user.Contacts, user.Role)
        return res.json({token})
    } 

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.Login, req.user.Contacts, req.user.Role)
        return res.json({token})
    }

    async delete(req, res) {
        
    }
}

module.exports = new userController()