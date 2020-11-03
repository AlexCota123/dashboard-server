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
        users: [User]
    }
    type Query {
        projects: [Project]
        project(id: ID!): Project
    }

    type Mutation {
        addProject(name: String!): Project
        updateProject(project: ProjectInput): Project
        deleteProject(id: ID!): String
    }

`