import React from 'react';
import classes from './ProfileInfo.module.css';

const Info = (props) => {

    let contacts = props.userPage.contacts;
    console.log(props);
    return (
        <div>
            <div className={classes.aboutMe}>About me: </div>
            <div className={classes.aboutMe}>{props.userPage.aboutMe}</div>
            <div className={classes.lookingForAJob}>Looking for a job: {props.userPage.lookingForAJob ? "Yes" : "No"}</div>
            <div className={classes.lookingForAJobDescription}>Description: {props.userPage.lookingForAJobDescription}</div>
            <div className={classes.contacts}>
                Contacts:
                <div><div className={classes.contactItem}>Facebook: {contacts.facebook}</div></div>
                <div><div className={classes.contactItem}>Github: {contacts.github}</div></div>
                <div><div className={classes.contactItem}>Instagram: {contacts.instagram}</div></div>
                <div><div className={classes.contactItem}>Main Link: {contacts.mainLink}</div></div>
                <div><div className={classes.contactItem}>Twitter: {contacts.twitter}</div></div>
                <div><div className={classes.contactItem}>VK: {contacts.vk}</div></div>
                <div><div className={classes.contactItem}>Website: {contacts.website}</div></div>
                <div><div className={classes.contactItem}>Youtube: {contacts.youtube}</div></div>
            </div>
        </div>
    )
}

export default Info;
