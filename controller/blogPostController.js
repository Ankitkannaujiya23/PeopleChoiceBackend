import BlogPostModel from "../model/blogPostModel.js"

//for creating a blog post
export const createPost = async (request, response) => {
    try {
        let post = await new BlogPostModel(request.body);
        post.save();
        return response.status(200).json({ statusCode: 200, message: "Your blog post successfully created.", data: [post] })
    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: "internal Server error!!!" })
    }
}

// for getting all blog post 
export const fetchAllPost = async (request, response) => {
    try {
        // if we need get data to conditionally like username wise so you can pass collection_Name.find({username:'harry'}) then you can get all blog post username corresponding.

        //  if you want all data from which collection you just write collection_Name.find({}) you get all data. if you dont want conditionally just pass empty object
        let post;
        let cate = request.query.category;
        if (cate) {
            post = await BlogPostModel.find({ category: cate })
        } else {

            post = await BlogPostModel.find({});
        }
        return response.status(200).json({ statusCode: 200, message: 'success', data: post });
    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: "internal server error" })
    }
}

// for getting single post.
export const fetchSinglePost = async (request, response) => {
    try {
        let post = await BlogPostModel.findById({ _id: request.params.id });

        return response.status(200).json({ statusCode: 200, message: 'success', data: post });
    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: "internal server error" })
    }
}


//for updating the existing post 
export const updatePost = async (request, response) => {
    try {
        const post = await BlogPostModel.findById(request.params.id)
        if (!post) {
            return response.status(404).json({ statusCode: 404, message: 'Post not found !!!' })
        }

        // if post is exist in db then we have two method to perform these type of work 
        //1. $set => this use to replace the existing file from current file. current time we need to replace the post. 
        //2. $addToSet => this used to append any thing in existing file 

        await BlogPostModel.findByIdAndUpdate(request.params.id, { $set: request.body });

        return response.status(200).json({ statusCode: 200, message: 'your post successfully updated.', data: post });

    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: error })
    }

}

//for deleting the post 
export const deletePost = async (request, response) => {
    try {
        let post = await BlogPostModel.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ statusCode: 404, message: "Post not found!!!!" });
        }
        await post.delete();
        return response.status(200).json({ statusCode: 200, message: 'Post successfully deleted!!!' });
    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: "Internal Server Error!!!!!" });
    }
}