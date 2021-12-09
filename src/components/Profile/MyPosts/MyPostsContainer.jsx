import React from 'react';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profileReducer';

const MyPosts = (props) => {

  let postsData = props.postsData;

    let addPost1 = () => {
        props.dispatch(addPostActionCreator());
    }

    let updatePostText1 = () => {
      let text = newPostElement.current.value;
      props.dispatch(updatePostTextActionCreator(text));
    }

    return <MyPosts />;
}

export default MyPosts;