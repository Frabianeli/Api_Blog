const postControllers = require('./post.controllers')
const {getUserById} = require('../users/users.controllers')

const getAll = (req, res) => {
    const data = postControllers.getAllPost()
    return res.status(200).json({items: data.length, post: data})
}

const getById = (req, res) => {
    const id = req.params.id
    const data = postControllers.getPostById(id)
    if(data){
        return res.status(200).json(data)
    } else {
        return res.status(404).json({message: `El post con el id: ${id} no existe`})
    }
}

const create = (req, res) => {
    const body = req.body
    const user_id = req.user.id
    if(!body){
        return res.status(400).json({message: 'Missing Data'})
    }else if(
        !body.title||  
        !body.content ||  
        !body.header_image 
    ){
      return res.status(400).json({
        message: 'All fields must be completed',
        fields:{
            title: "string",
            content:"string",
            header_image: "url_to_img",
            }
        })
     } else {
        const data = postControllers.createPost(body, user_id)
        return res.status(201).json({
            message: `Post created succesfully with id : ${data.id}`,
            post: data
        })
     }
}

const removeMyPost = (req, res) => {
    const id = req.params.id
    const data = postControllers.removePost(id)
    if(data) {
        return res.status(204).json()
    } else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const editMyPost = (req, res) => {
    const user_id = req.user.id
    const body = req.body
    if(!Object.keys(body).length){
        return res.status(400).json({message: 'Mssing Data'})
    } else if (
        !body.title||  
        !body.content ||  
        !body.header_image
    )
    {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                title: "string",
                content:"string",
                header_image: "url_to_img",
                }
            })
      } else {
        const data = postControllers.editPost(body, user_id)
        return res.status(200).json({
            message: 'Post edited succesfully',
            post: data
        })
      }
}

const getMyPost = (req, res) => {
    const user_id = req.user.id
    const data = postControllers.getPostMyUser(user_id)
    const name = getUserById(user_id)
    if(data){
        return res.status(200).json({
            message: `Usuario ${name.first_name} tiene ${data.length} post`,
            post: data
        })
    } else {
        return res.status(400).json({message: 'you have no posts'})    
    }
}

const getMyPostByID = (req, res) => {
    const params_id = req.params.id
    const user_id = req.user.id
    const data = postControllers.getPostMyUser(user_id)
    const response = data.filter(post => post.id === params_id)
    if(response.length){
        return res.status(200).json({
            title : response.title,
            post: response
        })
    } else {
        return res.status(400).json({message: 'inavlid ID'})
    }
}

module.exports = {
    getAll,
    getById,
    create,
    removeMyPost,
    getMyPost,
    getMyPostByID,
    editMyPost
}