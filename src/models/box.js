"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Page);
    }
  }
  Box.init(
    {
      content: DataTypes.STRING,
      position: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Box",
    }
  );
  return Box;
};
