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
            
            try {
                let response = await User.create(user)
                if(!!user.projects && user.projects.length !== 0){
                    let projects = await Project.findAll({
                        where: {
                            id: user.projects.map( project => project.id)
                        }
                    })
                    await response.setProjects(projects)
                }
                return await response
            } catch (error) {
                return error
            }

        },
        updateUser: async (obj, {user}) => {
            try {
                let projects = []
                if(!!user.projects && user.projects.length !== 0){
                    projects = await Project.findAll({
                        where: {
                            id: user.projects.map( project => project.id)
                        }
                    })
                }  
                let userResponse = await User.findOne({
                    where: {
                        id: user.id
                    }
                })

                for (let field in user){
                    if(!Array.isArray(user[field])){
                        userResponse[field] = user[field]
                    }
                }

                user.setProjects(projects)
                await userResponse.save()
                return userResponse

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