const uploadCloudinary = require('./uploadCloudinary')

const defaultProfile = {
    username: 'zl48',
    email: 'zl48@rice.edu',
    zipcode: '77030',
    avatar:'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=imgres&cd=&cad=rja&uact=8&ved=0ahUKEwi07or15ZjQAhVERyYKHe7YDSsQjRwIBw&url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQCfmvrE4fMo2cd8esc7mDZPtFSJThAujddMPkRtti1_ij6u-jp&psig=AFQjCNFewa-D74_iCyEwIm2HIF6sFg2rBQ&ust=1478682018691884',
    dob:Date.parse('1995-02-08'),
    headline: 'Got stuck with MEAN stack'
}


const getHeadLines = (req, res) => {
    const users = req.params.users ? req.params.users.split(','): [defaultProfile.username];
    res.status(200).send({ headlines: users.map((user)=>{
            if(user === defaultProfile.username){
                return {username:user, headline:defaultProfile.headline}
            }
            else{
                return {username:user, headline:'Defalut headline!'}
            }
        })
    })
}


const putHeadLines = (req, res) => {
    const username = defaultProfile.username
    const headline = req.body.headline
    if(!headline){
        res.status(400).send("You did not supply headline!")
    }
    else{
        defaultProfile.headline = headline
        res.status(200).send({username, headline})
    }
}


const getEmail  = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const email = username === defaultProfile.username? defaultProfile.email: 'default@rice.edu'
    res.status(200).send({username,email})
}


const putEmail = (req, res) => {
    const username = defaultProfile.username
    const email = req.body.email
    if(!headline){
        res.status(400).send("You did not supply email!")
    }
    else{
        defaultProfile.email = email
        res.status(200).send({username, email})
    }
}


const getZipcode = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const zipcode = username===defaultProfile.username ? defaultProfile.zipcode: '12345'
    res.status(200).send({username,zipcode})
}


const putZipcode = (req, res) => {
    const username = defaultProfile.username
    const zipcode = req.body.zipcode
    if(!headline){
        res.status(400).send("You did not supply zipcode!")
    }
    else{
        defaultProfile.zipcode = zipcode
        res.status(200).send({username, zipcode})
    }
}


const getAvatar = (req, res) => {
    const users = req.params.user ? req.params.users.split(','): [defaultProfile.username];
    res.status(200).send({ avatars: users.map((user)=>{
            if(user===defaultProfile.username){
                return {username:user, avatar:defaultProfile.avatar}
            }
            else{
                return {username:user, avatar:'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjhh_PH55jQAhUKRiYKHdTcAjgQjRwIBw&url=http%3A%2F%2Fhengdeedu.com%2Fdefault.html&bvm=bv.137904068,d.eWE&psig=AFQjCNEs2IuJkashlPL9agJaM2FzwLl1Cw&ust=1478682458520312'}
            }
        })
    })
}


// const putAvatar = (req, res) => {
//     const username = defaultProfile.username
//     const avatar = req.body.avatar
//     if(!avatar){
//         res.status(400).send("You did not supply avatar!")
//     }
//     else{
//         defaultProfile.avatar = avatar
//         res.status(200).send({username, avatar})
//     }
// }

const putAvatar = (req, res) => {
    if(!req.fileurl){
        res.status(400).send("No fileurl in req!")
    }
    else{
        if(!req.user) req.user = defaultProfile.username
        res.status(200).send({username:req.user, avatar:req.fileurl})
    }
}


const getDob = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const dob = username===defaultProfile.username ? defaultProfile.dob: Date.parse("2016-11-01")
    res.status(200).send({username,dob})
}


module.exports = app => {
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)

    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)

    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',uploadCloudinary.uploadImage('avatar'), putAvatar)

    app.get('/dob', getDob)
}