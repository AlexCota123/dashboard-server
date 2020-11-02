export default `
type User {
    id: ID!
    name: String
    lastName: String
    age: Int
    projects: [Project]
}

input UserInput {
    id: ID!
    name: String!
    lastName: String!
    age: Int!
}

type Query {
    users: [User]
    user(id: ID!): User
}

type Mutation {
    addUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): String
    assignProject(projectId: ID!, userId: ID!): User
}`