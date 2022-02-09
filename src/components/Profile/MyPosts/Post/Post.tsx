import React from 'react';
import classes from './Post.module.css';

type PropsType = {
  userPhoto: string | null,
  message: string,
  id: number
}

const Post = (inf: PropsType) => {
  let spot = 'https://wiki-vk.ru/s/001/512/41.png';
    return(
          <div className={classes.item}>
            <img src={inf.userPhoto ? inf.userPhoto : spot} alt="profile avatar"/>
            {inf.message}
          </div>
    );
}

export default Post;