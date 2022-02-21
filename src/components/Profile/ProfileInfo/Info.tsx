import React from 'react';
import { UserPageType } from '../../../types/types';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Icon28LogoVkOutline } from '@vkontakte/icons';
import classes from './ProfileInfo.module.css';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

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
                <List>
                    <ListItem disablePadding>
                        <ListItemButton disabled={!contacts.facebook} component='a' href={`${contacts.facebook}`}>
                            <ListItemIcon>
                                <FacebookIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Facebook"/>
                        </ListItemButton>
                        <ListItemButton disabled={!contacts.instagram} component='a' href={`${contacts.instagram}`}>
                            <ListItemIcon>
                                <InstagramIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Instagram"/>
                        </ListItemButton>
                        <ListItemButton disabled={!contacts.twitter} component='a' href={`${contacts.twitter}`}>
                            <ListItemIcon>
                                <TwitterIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Twitter"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled={!contacts.github} component='a' href={`${contacts.github}`}>
                            <ListItemIcon>
                                <GitHubIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Github"/>
                        </ListItemButton>
                        <ListItemButton disabled={!contacts.vk} component='a' href={`${contacts.vk}`}>
                            <ListItemIcon>
                                <Icon28LogoVkOutline />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="VK"/>
                        </ListItemButton>
                        <ListItemButton disabled={!contacts.youtube} component='a' href={`${contacts.youtube}`}>
                            <ListItemIcon>
                                <YouTubeIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="YouTube"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled={!contacts.website} component='a' href={`${contacts.website}`}>
                            <ListItemIcon>
                                <LanguageIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Website"/>
                        </ListItemButton>
                        <ListItemButton disabled={!contacts.mainLink} component='a' href={`${contacts.mainLink}`}>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText  sx={{ color: '' }} primary="Main Link"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default Info;
