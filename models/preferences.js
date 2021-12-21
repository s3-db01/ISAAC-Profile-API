'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  preferences.init({
    preftemp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'preferences',
  });
  return preferences;
};