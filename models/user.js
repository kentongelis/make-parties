const bcrypt = require('bcrypt')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Event)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', async function(user) {
    const salt = await bcrypt.genSalt(10);
    console.log(user);
    user.password = await bcrypt.hash(user.password, salt);
  })
  User.prototype.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      return done(err, isMatch)
    });
  };
  return User;
};