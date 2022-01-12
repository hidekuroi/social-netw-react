import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostType } from '../../../types/types';

type PropsType = {
  postsData: Array<PostType>,
  userPhoto: string | null,

  addPost: (formData: any) => void,
  reset: (form: string) => void
}

const AddPostForm: React.FC<InjectedFormProps<{}, {}, string>> = (props) => {
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

const AddPostReduxForm = reduxForm<{}, {}>({
  form: 'addPostForm'
})(AddPostForm);

const MyPosts = (props: PropsType) => {


  let postsData = props.postsData;

  let posts = postsData
  .map(el => (<Post userPhoto={props.userPhoto} message={el.text} id={el.id} />));

    let onAddPost = (formData: any) => {
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