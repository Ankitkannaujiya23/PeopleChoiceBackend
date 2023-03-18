import mongoose from "mongoose";


const blogPostSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        required:true
    }

});

// here we need to make model and here we need to give our collection name and apply this model on that collection 
const BlogPostModel= mongoose.model('blogPostCollection', blogPostSchema);

export default BlogPostModel;