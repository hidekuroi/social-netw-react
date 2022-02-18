import React from 'react';
import { UserPageType } from '../../../types/types';
import classes from './ProfileInfo.module.css';

type PropsType = {
    userPage: UserPageType
}

const Info = (props: PropsType) => {

    let contacts = props.userPage.contacts;
    return (
        <div>
            <div className={classes.aboutMe}>About me: </div>
            <div className={classes.aboutMe}>{props.userPage.aboutMe}</div>
            <div className={classes.lookingForAJob}>Looking for a job: {props.userPage.lookingForAJob ? "Yes" : "No"}</div>
            <div className={classes.lookingForAJobDescription}>Description: {props.userPage.lookingForAJobDescription}</div>
            <div className={classes.contacts}>
                Contacts:
                <div>Facebook:<a href={contacts.facebook ? contacts.facebook : undefined} className={classes.contactItem}> {contacts.facebook}</a></div>
                <div>Github:<a href={contacts.github ? contacts.github : undefined} className={classes.contactItem}> {contacts.github}</a></div>
                <div>Instagram:<a href={contacts.instagram ? contacts.instagram : undefined} className={classes.contactItem}> {contacts.instagram}</a></div>
                <div>Main Link:<a href={contacts.mainLink ? contacts.mainLink : undefined} className={classes.contactItem}> {contacts.mainLink}</a></div>
                <div>Twitter:<a href={contacts.twitter ? contacts.twitter : undefined} className={classes.contactItem}> {contacts.twitter}</a></div>
                <div>VK:<a href={contacts.vk ? contacts.vk : undefined} className={classes.contactItem}> {contacts.vk}</a></div>
                <div>Website:<a href={contacts.website ? contacts.website : undefined} className={classes.contactItem}> {contacts.website}</a></div>
                <div>YouTube:<a href={contacts.youtube ? contacts.youtube : undefined} className={classes.contactItem}> {contacts.youtube}</a></div>
            </div>
        </div>
    )
}

export default Info;
