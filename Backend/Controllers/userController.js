const User = require('../Model/userSchema');


module.exports.Register = async (req, res, next) => {
    const { name, email, accountType } = req.body;
    const username = req.body.email;
    await User.create({ name, email, accountType, username });
    res.send({ message: "User Registered" });
};

module.exports.getAllUsers = async (req, res, next) => {
    const email = req.body
    try {
        const users = await User.find();
        return res.json(users)
    } catch (error) {
        next(error);
    }
};

module.exports.getID = async (req, res, next) => {
    const { accountType, email } = await req.body;
    const UserId = await User.findOne({
        email: email,
        accountType:accountType
    }, {_id:1});
    
    res.send(UserId)

}   

module.exports.getPFP = async(req,res,next)=>{
    const id = req.body.id;
    const UserObj = await User.findById(id, {_id:0, pfp:1});
    res.send(UserObj);
}


module.exports.getUser = async(req,res,next)=>{
    const id = req.body.id;
    const UserObj = await User.findById(id);
    res.json(UserObj);
}

module.exports.getProfile = async(req,res,next)=>{
    const {username} = req.body;
    const UserObj = await User.findOne({username:username});
    res.json(UserObj);
}

module.exports.updateUserProfile = async(req,res,next)=>{
    await User.updateOne({_id:req.body._id}, {$set:{
        name:req.body.name,
        Bio:req.body.Bio,
        pfpExist:req.body.pfpExist,
        username:req.body.username,
        pfp:req.body.pfp
    }}).then(()=>{
        res.sendStatus(200)
    })
}