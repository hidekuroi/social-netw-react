import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostType } from '../../../types/types';
import Button from '@mui/material/Button';
import { Input } from '../../common/FormControls';

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
                <Field name="addPostField" multiline rows={3} autoComplete="off" type="text" component={Input}/>
            </div>
            <div>
                <Button variant="contained" type='submit'>Add post</Button>
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