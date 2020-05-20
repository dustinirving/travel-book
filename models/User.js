module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    }
  })
