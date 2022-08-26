const uuid = require('uuid')
const {hashPassword} = require('../utils/crypt')

const userDB = [
    {
        id: uuid.v4(),  
        first_name: "Rene",
        last_name: "Izacupe Coello",
        email: "rene@academlo.com",
        password: hashPassword('root', 10),
        phone: 947559709,
        birthday_date: "31/10/2000",
        rol: "normal",   
        profile_image: "url",
        country: "Perú",
        is_active: true,
        verified: false 
    }
]
    
const getAllUsers = () => {
    return userDB
}

const getUserById = (id) => {
    const user = userDB.filter(user => user.id === id)
    return user.length ? user[0] : false
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(),   //obligatorio
        first_name: data.first_name,   //obligatorio
        last_name: data.last_name,     //obligatorio
        email: data.email,     //obligatorio y unico
        password: hashPassword(data.password),    //obligatorio
        phone: data.phone ? data.phone : '',      //unico
        birthday_date: data.birthday_date,   //obligatorio
        rol: 'normal',     //obligatorio y pot defecto normal
        profile_image: data.profile_image ? data.profile_image : '',   
        country: data.country,   //obligatorio
        is_active: true,     //obligatorio y por defecto true
        verified: false     //obligatorio y por defecto false
    }
    userDB.push(newUser)
    return newUser
}

const editUser = (data, id) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB[index] = {
            id : id,
            first_name: data.first_name,   
            last_name: data.last_name,     
            email: data.email,
            password: data.password ? hashPassword(data.password) : userDB[index].password,    
            phone: data.phone,
            birthday_date: data.birthday_date,   
            rol: data.rol,
            profile_image: data.profile_image,   
            country: data.country,   
            is_active: data.is_active,
            verified: false 
        }
        return userDB[index]
    } else {
        return createUser(data)
    }
}

const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if (index !== -1){
        userDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const getUserByEmail = (email) =>{
    const user = userDB.filter(user => user.email === email)
    return user.length ? user[0] : false
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail
}