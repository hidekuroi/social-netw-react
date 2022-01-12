import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfilePropsType } from './ProfileContainer';

type PropsType = ProfilePropsType

const Profile = (props: PropsType) => {
  return(
    <div className={classes.content}>
      <ProfileInfo userPageData={props}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;