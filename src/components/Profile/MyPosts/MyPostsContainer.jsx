import React from 'react';
import MyPosts from './MyPosts';
import { addPost, updatePostText } from '../../../redux/profileReducer';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
  return {
    postsData: state.profile.postsData,
    currentValue: state.profile.newPostText,
    userPhoto: state.profile.userPhoto
  }
}


const MyPostsContainer = connect(mapStateToProps, { addPost, updatePostText })(MyPosts);


export default MyPostsContainer;