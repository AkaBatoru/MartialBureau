const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
    ID_User: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Login: { type: DataTypes.STRING, unique: true },
    Password: { type: DataTypes.STRING },
    Contacts: { type: DataTypes.STRING },
    Role: { type: DataTypes.STRING, defaultValue: "Client" } //Пользователь|Работник
});

const Services = sequelize.define('services', {
    ID_Service: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING },
    Cost: { type: DataTypes.INTEGER },
    Description: { type: DataTypes.STRING },
    Type: { type: DataTypes.STRING, defaultValue: "Услуга" }, //Услуга|Комплекс
    Img: {type: DataTypes.STRING}
});

const Orders = sequelize.define('orders', {
    ID_Order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FIO_Deadman: { type: DataTypes.STRING},
    Deadline: { type: DataTypes.DATE },
    Status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    ID_Worker: { type: DataTypes.INTEGER},
    ID_Client: { type: DataTypes.INTEGER, allowNull: false }
});

const RelationList = sequelize.define('listOfRelated', {
    Count: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const ServicesList = sequelize.define('listOfServices', {
    Count: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Associations
Orders.hasMany(Users);
Users.belongsTo(Orders);

Services.belongsToMany(Orders, { through: ServicesList });
Orders.belongsToMany(Services, { through: ServicesList });

module.exports = {Users, Services, Orders, RelationList, ServicesList };