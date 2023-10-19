const PostModel = require('../Model/postSchema');
const Post = require('../Model/postSchema');
const User = require('../Model/userSchema');
const Comment = require('../Model/commentSchema')

module.exports.fetchSingularPost = async (req, res, next) => {
    const { id } = await req.body;
    const post = await Post.findById(id);
    if (post) {
        const ID = (post.authorID.toHexString());
        const author = await User.findById(ID);
        post.author = author.username;
        
        const comments =  await Comment.find({post:post._id})
        post.comments = comments.length;
        
        res.send(post);
    }
    else {
        res.send({ message: "Not Found" })
    }
}

module.exports.fetchAllPost = async (req, res, next) => {
    const post = await PostModel.find();
    console.log(post)
    const updatedPosts = await Promise.all(post.map(async(Onepost)=>{
        const ID = (Onepost.authorID.toHexString());
        const author = await User.findById(ID);
        Onepost.author = author.username;
        const comments =  await Comment.find({post:Onepost._id})
        Onepost.comments = comments.length;
        console.log(Onepost)
        return(Onepost)
    }))

    // console.log("updated",updatedPosts)

    res.json(updatedPosts);
}


module.exports.addPost = async (req, res, next) => {
    const { title, authorID, content } = req.body;
    const author = (await User.findById(authorID)).username
    await PostModel.create({ title, author, authorID, content });
    res.send({ message: "Post Created" });
}

module.exports.SearchPost = async (req, res, next) => {
    const { query, queryType } = req.body;

    if (queryType == "Post") {
        // const post = await PostModel.find({
        //     $or: [
        //         { author: { $regex: query, $options: 'i' } },
        //         { title: { $regex: query, $options: 'i' } },
        //         { content: { $regex: query, $options: 'i' } }
        //     ]
        // })
        const post = await PostModel.find({
            $text: { $search: query }
        })
        res.json(post);
    }

    if (queryType == "User") {
        const users = await User.find({
            $text: { $search: query }
        })
        res.json(users)
    }
}

module.exports.addComment = async(req,res,next)=>{
    const {content, author, post} = req.body;
    await Comment.create({content, author, post}).then(()=>{
        res.send(200);
    });
}

module.exports.fetchComments = async(req,res,next)=>{
    const {postID} = req.body;
    const commentsArr = await Comment.find({post:postID})
    res.json(commentsArr);
}
