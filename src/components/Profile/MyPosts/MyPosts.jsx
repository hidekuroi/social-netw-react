import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profileReducer';

const MyPosts = (props) => {

  let postsData = props.postsData;

  let posts = postsData
  .map(el => (<Post message={el.text} id={el.id} />));

  let newPostElement = React.createRef();

    let addPost1 = () => {
        props.dispatch(addPostActionCreator());
    }

    let updatePostText1 = () => {
      let text = newPostElement.current.value;
      props.dispatch(updatePostTextActionCreator(text));
    }

    return(
        <div>
          <div>
            <textarea ref={newPostElement} onChange={updatePostText1} value={props.currentValue} />
        </div>
        <div>
            <button onClick={addPost1}>Add post</button>
        </div>
          <div className={classes.feedHeader}>My posts:</div>
          <div className={classes.posts}>
            {posts}
          </div>
        </div>
    );
}

export default MyPosts;