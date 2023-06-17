module.exports = (sequelize, DataTypes) => {
    const Answers = sequelize.define("Answers", {
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
    return Answers
}