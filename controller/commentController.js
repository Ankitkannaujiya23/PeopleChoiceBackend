import CommentModel from '../model/commentModel.js';

//Add comments
export const addNewComment=async(request,response)=>{
    try {
        let comment= await new CommentModel(request.body);
        comment.save();
        return response.status(201).json({statusCode:201, message:"Comment Saved Successfully"});
    } catch (error) {
        return response.status(500).json({statusCode:500, message:"Internal Server error!!!!"});
    }
}

//Fetch all comments by id 
export const getAllComments=async(request,response)=>{
    try {
        let comments= await CommentModel.find({postID:request.params.id});
        return response.status(200).json({statusCode:200, message:'Action Successful!!!!', comments:comments})
    } catch (error) {
        return response.status(500).json({statusCode:500, message:"Internal Server Error!!!!"});
    }
}


//delete token by comment id
export const deleteComment =async(request,response)=>{
    try {
        let comment= await  CommentModel.findById(request.params.id);
        await comment.delete();
        return response.status(200).json({message:"Comment deleted successfully!!!", statusCode: 200});
    } catch (error) {
        return response.status(500).json({message:"internal Server error!!!", statusCode:500})
    }
}