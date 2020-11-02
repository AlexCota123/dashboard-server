import {mergeTypeDefs} from '@graphql-tools/merge'

import projectType from './projectType'
import userType from './userType'

const types = [
    projectType,
    userType
]

// exporta los type concatenado 
export default mergeTypeDefs(types)