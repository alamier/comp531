var models = require('./model.js')
var Profile = models.Profile

const getFollowing = (req, res) =>{
    const user = req.params.user ? req.params.user : req.username
    Profile.findOne({username:user}, (err, profile) => {
        if(err){
            console.log("[getFollowing] " + err)
            res.status(400).send(err)
        }else{
            if(!profile){
                res.status(400).send("no profile found!")
            }else{
                res.status(200).send({
                    username:profile.username,
                    following:profile.following
                })
            }
        }
    })
}

const putFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send("no username provided!")
    }else if(user === req.username){
        res.status(400).send("you can not follow your self!")
    }else{
        Profile.findOne({username:user}, (err, profile) => {
            if(!profile){
                res.status(400).send("no profile found!")
            }else{
                Profile.findOneAndUpdate({username:req.username}, {$addToSet:{following: user}},
                 {new:true}, (err, profile) => {
                    if(err){
                        console.log("[getFollowing] " + err)
                        res.status(400).send(err)
                    }else{
                        res.status(200).send({username:profile.username, following:profile.following})
                    }})
            }
        })
    }
}

const deleteFollowing = (req, res) => {
    const user = req.params.user
    if(!user) {
        res.status(400).send("no username provided!")
    }else{
        Profile.findOneAndUpdate({username:req.username},{$pull:{following: user}},
            {new:true},(err,profile) => {
                if(err){
                    console.log("[deleteFollowing] " + err)
                    res.status(400).send(err)
                }else{
                    res.status(200).send({username:profile.username, following:profile.following})
                }
            })
    }
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}