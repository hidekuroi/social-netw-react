import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';

const AddPostForm = (props) => {
       return( 
          <form className={classes.addpost} onSubmit={props.handleSubmit}>
            <div>
                <Field name="addPostField" type="text" component="textarea"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
          </form>
       );
}

const AddPostReduxForm = reduxForm({
  form: 'addPostForm'
})(AddPostForm);

const MyPosts = (props) => {


  let postsData = props.postsData;

  let posts = postsData
  .map(el => (<Post userPhoto={props.userPhoto} message={el.text} id={el.id} />));

    let onAddPost = (formData) => {
        props.addPost(formData);
        props.reset('addPostForm');
    }

    return(
        <div>
          <div className={classes.postcreation}>How are you?</div>
          <AddPostReduxForm onSubmit={onAddPost} />
          <div className={classes.feedHeader}>My posts:</div>
          <div className={classes.posts}>
            {posts}
          </div>
        </div>
    );
}



export default MyPosts;