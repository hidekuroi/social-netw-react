import React from 'react';
import MyPosts from '../MyPosts';
import classes from './Post.module.css';

const Post = (inf) => {
    return(
          <div className={classes.item}>
            <img src='https://wiki-vk.ru/s/001/512/41.png'/>
            {inf.message}
          </div>
    );
}

export default Post;