import {mergeResolvers} from '@graphql-tools/merge'
import projectResolver from './projectResolver'
import userResolver from './userResolver'

const resolvers = [
    projectResolver,
    userResolver
]

//regresa un resolver con las combinacion de los otros resolvers
export default mergeResolvers(resolvers)