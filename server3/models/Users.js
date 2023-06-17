module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Questions, {
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
        Users.hasMany(models.Answers, {
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    }

    return Users
}