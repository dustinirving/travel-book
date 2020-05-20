const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

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

  Post.associate = models => Post.belongsTo(models.User)

  return Post
}
