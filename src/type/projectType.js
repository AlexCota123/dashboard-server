export default `
    type Project {
        id: ID!
        name: String
        users: [User]
    }

    input ProjectInput {
        id: ID!
        name: String!
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