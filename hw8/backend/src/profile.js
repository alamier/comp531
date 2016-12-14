const uploadImage = require('./uploadCloudinary')
var models = require('./model.js')
var Profile = models.Profile

const defaultProfile = {
    username: 'zl48',
    email: 'zl48@rice.edu',
    zipcode: '77030',
    avatar:'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=imgres&cd=&cad=rja&uact=8&ved=0ahUKEwi07or15ZjQAhVERyYKHe7YDSsQjRwIBw&url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQCfmvrE4fMo2cd8esc7mDZPtFSJThAujddMPkRtti1_ij6u-jp&psig=AFQjCNFewa-D74_iCyEwIm2HIF6sFg2rBQ&ust=1478682018691884',
    dob:Date.parse('1995-02-08'),
    headline: 'Got stuck with MEAN stack'
}


const getHeadLines = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username];
    Profile.find({username:{$in: users}}, (err, profiles) => {
        if(err){
            console.log("[getHeadLines] " + err)
            res.status(400).send(err)
        }else{
            res.status(200).send({
                headlines: profiles.map((profile) => {
                    return {username:profile.username, headline:profile.status}
                })
            })
        }
    })
}


const putHeadLine = (req, res) => {
    const username = req.username
    const headline = req.body.headline
    if(!headline){
        res.status(400).send("You did not supply headline!")
    }
    else{
        Profile.findOneAndUpdate({username:username},{status:headline},{ new: true},(err,profile) => {
            if(err){
                console.log("[putHeadLine] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({username:profile.username, headline:profile.status})
            }
        })
    }
}


const getEmail  = (req, res) => {
    const username = req.params.user ? req.params.user: req.username
    Profile.findOne({username:username},(err, profile) => {
        if(err){
            console.log("[getEmail] " + err)
            res.status(400).send(err)
        }else{
            res.status(200).send({username:profile.username,email:profile.email})
        }
    })
}


const putEmail = (req, res) => {
    const username = req.username
    const email = req.body.email
    if(!email){
        res.status(400).send("You did not supply email!")
    }
    else{
        Profile.findOneAndUpdate({username:username},{email:email},{new:true},(err,profile) => {
            if(err){
                console.log("[putEmail] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({username:profile.username, email:profile.email})
            }
        })
    }
}


const getZipcode = (req, res) => {
    const username = req.params.user ? req.params.user: req.username
    Profile.findOne({username:username},(err, profile) => {
        if(err){
            console.log("[getZipcode] " + err)
            res.status(400).send(err)
        }else{
            res.status(200).send({username:profile.username,zipcode:profile.zipcode})
        }
    })
}


const putZipcode = (req, res) => {
    const username = req.username
    const zipcode = req.body.zipcode
    if(!zipcode){
        res.status(400).send("You did not supply zipcode!")
    }
    else{
        Profile.findOneAndUpdate({username:username},{zipcode:zipcode},{new:true},(err,profile) => {
            if(err){
                console.log("[putZipcode] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({username:profile.username, zipcode:profile.zipcode})
            }
        })
    }
}


const getAvatar = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username];
    Profile.find({username:{$in: users}}, (err, profiles) => {
        if(err){
            console.log("[getAvatar] " + err)
            res.status(400).send(err)
        }else{
            res.status(200).send({
                avatars: profiles.map((profile) => {
                    return {username:profile.username, avatar:profile.avatar}
                })
            })
        }
    })
}

const putAvatar = (req, res) => {
    const username = req.username
    const avatar = req.fileurl
    if(!avatar){
        res.status(400).send("No fileurl in req!")
    }
    else{
        // if(!req.user) req.user = defaultProfile.username
        // res.status(200).send({username:req.user, avatar:req.fileurl})

        Profile.findOneAndUpdate({username:username},{avatar:avatar},{new:true},(err,profile) => {
            if(err){
                console.log("[putAvatar] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({username:profile.username, avatar:profile.avatar})
            }
        })
    }
}


const getDob = (req, res) => {
    const username = req.params.user ? req.params.user: req.username
    Profile.findOne({username:username},(err, profile) => {
        if(err){
            console.log("[getDob] " + err)
            res.status(400).send(err)
        }else{
            console.log("[getDob] dob:" + profile.dob)
            res.status(200).send({username:profile.username,dob:Date.parse(profile.dob)})
        }
    })
}


module.exports = app => {
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLine)

    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)

    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',uploadImage('avatar'), putAvatar)

    app.get('/dob', getDob)
}