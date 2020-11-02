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
                let response = await Project.create(project)
                return response
            } catch (error) {
                return error
            }
        },
        updateProject: async (obj, {project}) => {
            try {
                await Project.update(project, {
                    where: {
                        id: project.id
                    }
                })

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

            } catch (error) {
                return error
            }
        }
    },
    Project: {
        users: async (project) => {
            try{
                console.log('project: ', project)
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