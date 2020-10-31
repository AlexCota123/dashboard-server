import data from '../data/user.json'
export default {
    getUsers: () => {
        return data
    },

    getUser: (id) => {
        return data.find(user => user.id === id)
    },

    addUser: (user) => {
        data.push(user)
        return "OK"
    },
    updateUser: (user) => {
        const index = data.findIndex(userAux => userAux.id === user.id)
        data[index] = {...data[index], ...user}
        return index ? "Ok" : "NOT FOUND"
    },

    deleteUser: (id) => {
        data = data.filter(user => user.id !== id)
        return "OK"
    }
}