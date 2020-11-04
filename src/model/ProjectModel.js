import {DataTypes, Model, Sequelize} from 'sequelize'
import User from './UserModel'

export default class Project extends Model {
    static initModel(sequelize) {
        Project.init({
            id:{
                type: DataTypes.UUID,
                allowNull: true,
                primaryKey: true,
                field: 'id',
                defaultValue: Sequelize.UUIDV4 
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            }, 
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            }
        }, {
            sequelize,
            modelName: 'projects',
            timestamps: false
        })

        return Project
    }
}