import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

  let postsData = props.postsData;


  let posts = postsData
  .map(el => (<Post userPhoto={props.userPhoto} message={el.text} id={el.id} />));

  let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onInputFieldChange = () => {
      let text = newPostElement.current.value;
      props.updatePostText(text);
    }

    return(
        <div>
          <div>
            <textarea ref={newPostElement} onChange={onInputFieldChange} value={props.currentValue} />
        </div>
        <div>
            <button onClick={onAddPost}>Add post</button>
        </div>
          <div className={classes.feedHeader}>My posts:</div>
          <div className={classes.posts}>
            {posts}
          </div>
        </div>
    );
}

export default MyPosts;