const followings = {
    users:{
    	'zl48':['test1','test2','test3'],
        'zl48test':['test1','test2','test3'],
    }
}

const getFollowing = (req, res) =>{
    const user = req.params.user ? req.params.user : 'zl48'
    res.status(200).send({
        username: user,
        following: followings.users[user]
    })
}

const putFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send({result:"Invalid input!"})
        return;
    }
    var loggedUser = 'zl48'
    if(!followings.users[loggedUser].includes(user)){
    	followings.users[loggedUser].push(user)
    }
    res.status(200).send({ 
        username:loggedUser,
        following: followings.users[loggedUser]
    })
    // Implement the logic in the future.
}

const deleteFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send({result:"Invalid input!"});
        return;
    }
    
    var loggedUser = 'zl48'
    followings.users[loggedUser] = followings.users[loggedUser].filter( v => {
    	return v != user
    })

    res.status(200).send({ 
        username:loggedUser,
        following:followings.users[loggedUser]
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}