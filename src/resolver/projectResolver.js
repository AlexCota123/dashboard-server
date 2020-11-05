import { Project, User } from '../model/initModels'

export default {
    Query: {
        projects: async () => {
            try {
                let projects = await Project.findAll()
                return projects
            } catch (error) {
                return error
            }
        },
        project: async (obj, {id}) => {
            try {
                let project = await Project.findOne({
                    where: {
                        id: id
                    }
                })

                return project
            } catch (error) {
                return error
            }
        }
    }, 
    Mutation: {
        addProject: async (obj, {project}) => {

            try {
                
                let response = await Project.create({...project})
                if(!!project.users && project.users.length !== 0){
                    let users = await User.findAll({
                        where: {
                            id: project.users.map( user => user.id)
                        }
                    })
                    await response.setUsers(users)
                }
                return await response
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updateProject: async (obj, {project}) => {
            try {
                let users = []
                if(!!project.users && project.users.length !== 0){
                    users = await User.findAll({
                        where: {
                            id: project.users.map( user => user.id)
                        }
                    })
                } 
                let projectResponse = await Project.findOne({
                    where: {
                        id: project.id
                    }
                })
                projectResponse.name = project.name
                projectResponse.description = project.description
                projectResponse.setUsers(users)
                await projectResponse.save()
                return projectResponse
            } catch (error) {
                return error
            }
        },
        deleteProject: async (obj, {id}) => {
            try {
                Project.destroy({
                    where: {
                        id: id
                    }
                })
                return "OK"
            } catch (error) {
                return error
            }
        }
    },
    Project: {
        users: async (project) => {
            try{
                // console.log('project: ', project)
                let response = await Project.findOne({
                    where: {
                        id: project.id
                    }
                })
                return await response.getUsers()
            } catch (error) {
                return error
            }
        }
    }
}