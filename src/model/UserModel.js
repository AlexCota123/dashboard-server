import {DataTypes, Model, Sequelize} from 'sequelize'

export default class User extends Model {
    static initModel(sequelize) {
        User.init({
            id:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                field: 'id',
                defaultValue: Sequelize.UUIDV4 
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            }, 
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'last_name'
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'age'
            }
        }, {
            sequelize,
            modelName: 'users',
            timestamps: false
        })



        return User
    }
}
