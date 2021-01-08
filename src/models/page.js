"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Box, { onDelete: "CASCADE" });
    }
  }
  Page.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "name already in use!",
        },

        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Page",
    }
  );
  return Page;
};
