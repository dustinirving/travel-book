module.exports = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    travelExperience: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1] }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    }
  })
