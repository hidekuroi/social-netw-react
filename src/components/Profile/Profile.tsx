import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer'


type PropsType = {
  auth: any,
}

const Profile = (props: PropsType) => {
  return(
    <div className={classes.content}>
      <ProfileInfo auth={props.auth} />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;