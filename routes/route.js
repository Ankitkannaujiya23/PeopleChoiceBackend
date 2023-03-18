import express from 'express';
import { createPost, deletePost, fetchAllPost, fetchSinglePost, updatePost } from '../controller/blogPostController.js';
import { addNewComment, deleteComment, getAllComments } from '../controller/commentController.js';
import { addSubscriber } from '../controller/commonMethodController.js';
import { fileUpload, getImage } from '../controller/image-controller.js';

import {signupUser, userLogin} from '../controller/user-controller.js';
import { jwtAuthenticateToken } from '../middleware/jwtAuthenticateToken.js';
import upload from '../middleware/upload.js';

const router= express.Router();

//Account related
//route for creating user 
router.post('/signup',signupUser);

//route for user login
router.post('/login', userLogin);


//Images related 
//route for image uploading
router.post('/file/upload',upload.single('file'), fileUpload);

// for image download and view
router.get('/file/:filename', getImage);


//Blog related 
//for creating a blog post 
router.post('/blogPostController/createPost', jwtAuthenticateToken ,createPost);

//for getting all post. this is get API 
router.get('/blogPostController/fetchAllPost',jwtAuthenticateToken, fetchAllPost);

//for single post with id 
router.get('/blogPostController/fetchSinglePost/:id',jwtAuthenticateToken, fetchSinglePost);

//for updating a blog 
router.put('/blogPostController/updatePost/:id', jwtAuthenticateToken, updatePost);

//for deleting a blog 
router.delete('/blogPostController/deletePost/:id',jwtAuthenticateToken, deletePost);


//Comments related
//Add new Comments
router.post('/commentController/addNewComment', jwtAuthenticateToken, addNewComment);

//fetch all comments with post id 
router.get('/commentController/getAllComments/:id', jwtAuthenticateToken, getAllComments);

//delete comment with by comment Id
router.delete('/commentController/deleteComment/:id', jwtAuthenticateToken, deleteComment);

//add subscriber 
router.post('/commonMethodController/addSubscriber', jwtAuthenticateToken, addSubscriber);

export default router;