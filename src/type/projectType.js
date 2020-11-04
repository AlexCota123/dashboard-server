export default `
    type Project {
        id: ID!
        name: String!
        description: String!
        users: [User]
    }

    input ProjectInput {
        id: ID
        name: String
        description: String
        users: [UserInput]
    }
    type Query {
        projects: [Project]
        project(id: ID!): Project
    }

    type Mutation {
        addProject(project: ProjectInput!): Project
        updateProject(project: ProjectInput): Project
        deleteProject(id: String!): String
    }

`