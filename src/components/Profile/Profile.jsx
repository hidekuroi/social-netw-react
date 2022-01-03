import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
  return(
    <div className={classes.content}>
      <ProfileInfo userPageData={props} uploadInfo={props.uploadInfo}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;