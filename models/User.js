
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1] }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [6] }
      }
    },
    { sequelize }
  )
  return User
}
