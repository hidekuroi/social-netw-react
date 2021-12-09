import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profileReducer';

const MyPostsContainer = (props) => {


    let postsData = props.store.getState().profile.postsData;
    let currentValue= props.store.getState().profile.newPostText;


    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let updatePostText = (text) => {
      props.store.dispatch(updatePostTextActionCreator(text));
    }

    return( 
    <div>
      How are you?
    <MyPosts  postsData={postsData}
             addPost={addPost}
             updatePostText={updatePostText}
             currentValue={currentValue} />
    </div>);
}

export default MyPostsContainer;