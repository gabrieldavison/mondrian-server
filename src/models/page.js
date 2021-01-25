"use strict";
const { Model } = require("sequelize");
import bcrypt from "bcryptjs";
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
    checkPassword(password) {
      return bcrypt.compare(password, this.password);
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
      locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("password", value);
          if (value !== null) {
            this.setDataValue("locked", true);
          }
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
