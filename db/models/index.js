"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ----------------RELATIONSHIPS----------------
// Shop - Product relationship
db.Shop.hasMany(db.Product, {
  foreignKey: "shopId",
  allowNull: false,
  as: "books",
});
db.Product.belongsTo(db.Shop, {
  foreignKey: "shopId",
  as: "shop",
});

// Shop - User relationship
db.User.hasOne(db.Shop, {
  as: "shop",
  foreignKey: "userId",
});
db.Shop.belongsTo(db.User, {
  as: "user",
});

// User - Order relationship
db.User.hasMany(db.Order, {
  foreignKey: "userId",
  as: "orders",
});
db.Order.belongsTo(db.User, {
  as: "user",
});

// Order - Product relationship
db.Order.belongsToMany(db.Product, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Product.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "bookId",
});

///////////////////

module.exports = db;
