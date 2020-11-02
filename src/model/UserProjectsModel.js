import {DataTypes, Model, Sequelize} from 'sequelize'

export default class UserProject extends Model {
    static initModel(sequelize) {
        UserProject.init({
            userId: {
                type: DataTypes.UUID,
                field: 'user_id'
            },
            projectId: {
                type: DataTypes.UUID,
                field: 'project_id'
            }
        }, {
            sequelize,
            modelName: 'user_projects',
            timestamps: false
        })
    }
}