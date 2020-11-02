import Project from './ProjectModel'
import User from './UserModel'
import UserProjects from './UserProjectsModel'
import { DataTypes } from 'sequelize'

export {
    Project,
    User,
    UserProjects
}

export function initModels(sequelize) {
    Project.initModel(sequelize)
    User.initModel(sequelize)
    UserProjects.initModel(sequelize)

    Project.belongsToMany(User, {
        through: UserProjects,
        as: 'users',
        foreignKey: {
            name: 'project_id',
            type: DataTypes.UUID
        }
    })

    User.belongsToMany(Project, {
        through: UserProjects,
        as: 'projects',
        foreignKey: {
            name: 'user_id',
            type: DataTypes.UUID
        }
    })
}