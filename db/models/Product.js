module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Product", {
        name: {type: DataTypes.STRING},
        descirption: {type: DataTypes.STRING},
        price: {type: DataTypes.INTEGER},
        image: {type: DataTypes.STRING}
    });
}