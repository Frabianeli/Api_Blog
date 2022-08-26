const userControllers = require('./users.controllers')

const getAll = (req, res) => {
    const data = userControllers.getAllUsers()
    return res.status(200).json({items: data.length, users: data})
}

const getById = (req, res) => {
    const id = req.params.id
    const data = userControllers.getUserById(id)
    if(data){
        return res.status(200).json(data)
    } else {
        return res.status(404).json({message: `El usuario con el id ${id} no existe`})
    }
}

const register = (req, res) => {
    const body = req.body
    if(!body){
        return res.status(400).json({message: 'Missing Data'})
    }else if(
        !body.first_name ||  
        !body.last_name ||  
        !body.email ||
        !body.password ||
        !body.birthday_date || 
        !body.country
    ){
      return res.status(400).json({
        message: 'All fields must be completed',
        fields:{
            first_name : 'string',   
            last_name:  'string', 
            email: 'example@example.com',
            password: 'string',
            birthday_date:  'DD/MM/YYYY',
            country: 'string'
            }
        })
     } else {
        const data = userControllers.createUser(body)
        return res.status(201).json({
            message: `User created succesfully with id : ${data.id}`,
            user: data
        })
     }
}

const remove = (req, res) => {
    const id = req.params.id
    const data = userControllers.deleteUser(id)
    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const body = req.body
    if(!Object.keys(body).length){
        return res.status(400).json({message: 'Mssing Data'})
    } else if (
        !body.first_name ||  
        !body.last_name ||  
        !body.email ||
        !body.password ||
        !body.phone ||
        !body.rol ||
        !body.profile_image ||
        !body.birthday_date || 
        !body.country ||
        !body.is_active
    )
    {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                first_name : 'string',   
                last_name:  'string', 
                email: 'example@example.com',
                password: 'string',
                phone: '+51123456789',
                rol: 'normal',
                profile_image: 'example.com/img/example.png',
                birthday_date:  'DD/MM/YYYY',
                country: 'string',
                is_active: true
                }
            })
      } else {
        const data = userControllers.editUser(body, id)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: data
        })
      }
}

const editMyUser = (req, res) => {
    const id = req.user.id
    const body = req.body
    if(!Object.keys(body).length){
        return res.status(400).json({message: 'Mssing Data'})
    } else if (
        !body.first_name ||  
        !body.last_name ||  
        !body.email ||
        !body.phone ||
        !body.profile_image ||
        !body.birthday_date || 
        !body.country ||
        !body.is_active
    )
    {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                first_name : 'string',   
                last_name:  'string', 
                email: 'example@example.com',
                phone: '+51123456789',
                profile_image: 'example.com/img/example.png',
                birthday_date:  'DD/MM/YYYY',
                country: 'string',
                is_active: true
                }
            })
      } else {
        const data = userControllers.editUser(body, id)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: data
        })
      }
}

const getMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.getUserById(id)
    console.log(id)
    return res.status(200).json(data)
}

const removeMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.deleteUser(id)
    console.log(id)
    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Invalid ID'})
    }
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    editMyUser,
    getMyUser,
    removeMyUser
}