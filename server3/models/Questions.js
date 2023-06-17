module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define("Questions", {
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
    Questions.associate = (models) => {
        Questions.hasMany(models.Answers, {
            onUpdate: 'cascade',
            onDelete: 'cascade'
        })
    }
    return Questions
}