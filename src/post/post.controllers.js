const uuid = require('uuid')

const postDB =[]

const getAllPost = () => {
    return postDB
}

const getPostById = (id) => {
    const post = postDB.filter(post => post.id === id)
    return post.length ? post[0] : false
}

const getPostMyUser = (id) => {
    const post = postDB.filter(post => post.user_id === id)
    return post.length ? post : false
}

const removePost = (id) => {
    const index = postDB.findIndex(post => post.id === id)
    if(index !== -1){
        console.log(index)
        postDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const createPost = (data, id) => {
    const newPost = {
        "id": uuid.v4(),
        "title": data.title,
        "content": data.content,
        "header_image": data.header_image,
        "user_id": id,
        "published": true
    }
    postDB.push(newPost)
    return newPost
}

const editPost = (data, id) => {
    const index = postDB.findIndex(post => post.user_id === id)
    if(index !== -1){
        postDB[index] = {
            "id" : postDB[index].id,
            "title": data.title,
            "content": data.content,
            "header_image": data.header_image,
            "user_id": postDB[index].user_id,
            "published": true
        }
        return postDB[index]
    } else {
        return createPost(data)
    }
}

module.exports = {
    getAllPost,
    getPostById,
    getPostMyUser,
    removePost,
    createPost,
    editPost
}