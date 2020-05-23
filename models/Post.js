const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model { }

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
  }

  Post.init(
    {
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
    },
    {
      sequelize
    }
  )

  return Post
}
