import React from 'react';
import MyPosts from './MyPosts';
import { actions } from '../../../redux/profileReducer';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { RootState } from '../../../redux/redux-store';

const addPost = actions.addPost

let mapStateToProps = (state: RootState) => {
  return {
    postsData: state.profile.postsData,
    userPhoto: state.profile.userPhoto
  }
}


const MyPostsContainer = connect(mapStateToProps, { addPost, reset })(MyPosts);


export default MyPostsContainer;