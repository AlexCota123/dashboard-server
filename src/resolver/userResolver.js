import data from '../data/user.json'
import {User, Project} from '../model/initModels'
export default {
    Query: {
        users: async () => {
            try {
                let users = await User.findAll()
                return users
            } catch (error) {
                return error
            }
        },
        user: async (obj, {id}, context, info) => {
            try{

                let userData = await User.findOne({where:{
                    id: id
                }})
                return userData
            } catch (error) {
                console.log('error: ',error)
                return error
            }

        },
    },
    Mutation: {
        addUser: async (obj,{user}) => {
            console.log('user: ', user)
            try {
                let response = await User.create(user)
                return response
            } catch (error) {
                return error
            }

        },
        updateUser: async (obj, {user}) => {
            try {
                await User.update(user, {
                    where: {
                        id: user.id
                    }
                })

            } catch (error) {
                return error
            }
        },
        deleteUser: async (obj, {id}) => {
            try {
                Project.destroy({
                    where: {
                        id: id
                    }
                })

            } catch (error) {
                return error
            }
        },
        assignProject: async (obj, {projectId, userId}) => {
            try {
                let user = await User.findOne({
                    where: {
                        id: userId
                    }
                })
                user.addProject(await Project.findOne({
                    where: {
                        id: projectId
                    }
                }))
                return user
            } catch (error) {
                return error
            }
        }
    }, 
    User: {
        projects: async (user) => {
            try{
                let response = await User.findOne({
                    where: {
                        id: user.id
                    }
                })
                return await response.getProjects()
            } catch (error) {
                console.log('error: ', error)
                return error
            }
        }
    }
}