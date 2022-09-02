import React, {useState} from 'react';
import Loading from '../../common/Loading';
import Info from './Info';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProifleStatus';
import EditInfoForm from './EditInfoForm';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux-store';
import { actions, followUserProfile, getIsFollow, unfollowUserProfile, uploadInfo, uploadPhoto } from '../../../redux/profileReducer';
import {actions as actions2} from '../../../redux/dialogsReducer'
import { startDialog } from '../../../redux/dialogsReducer';
import { Redirect, useHistory } from 'react-router-dom';
import { Avatar, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { followUser, unfollowUser } from '../../../redux/usersReducer';
//@ts-ignore
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const changeCompanionId = actions2.changeCompanionId;

type PropsType = {
    auth: any,
}

const ProfileInfo = (props: PropsType) => {
    let size = 0;

    const userPage = useSelector((state:RootState) => {return state.profile.userPage})
    const userPhoto = useSelector((state: RootState) => {return state.profile.userPhoto})
    const smallPhoto = useSelector((state: RootState) => {return state.profile.userPage.photos.small})
    const largePhoto = useSelector((state: RootState) => {return state.profile.userPage.photos.large})
    const isFollowed = useSelector((state: RootState) => {return state.profile.isFollowed})
    const isAuth = useSelector((state: RootState) => {return state.auth.isAuth})

    const [isFollowing, setIsFollowing] = useState(false)
    const [isPhotoViewer, setPhotoViewer] = useState(false)


    if(userPhoto == smallPhoto) size = 100;
    if(userPhoto == largePhoto) size = 240;

    const history = useHistory();
    const dispatch = useDispatch()

    
    let [editMode, setEditMode] = useState(false);

    let isOwner = false;
    
    if(userPage){
        if(props.auth.id === userPage.userId) {
        isOwner = true;
        }
    }

    let spot='https://vk.com/sticker/1-64142-512';
    
    if(!userPage){
        return <Loading color={'white'}/>
    }

    let openFullscreenViewer = () => {
        if(userPhoto)setPhotoViewer(true)
        //dispatch(actions.changePhotoSize());
    }

    let closePhotoViewer = () => {
        setPhotoViewer(false)
    }

    let onUploadPhoto = (e: any) => {
        if (e.target.files.length){
            dispatch(uploadPhoto(e.target.files[0]));
        }
    }


    let activateEditMode = () => {
        setEditMode(true);
    }

    let updateInfo = (formData: any) => {
        dispatch(uploadInfo(formData));
        setEditMode(false);
    }

    const onStartDialog = () => {
        dispatch(startDialog(userPage.userId))
        dispatch(changeCompanionId(userPage.userId))
        history.push({
            pathname: `/messages/${userPage.userId}`,
          })
    }

    const followHandler = () => {
        setIsFollowing(true)
        setTimeout(() => {
            setIsFollowing(false)
        }, 1000);
        dispatch(followUserProfile(userPage.userId))
        // dispatch(getIsFollow(userPage.userId))
    }

    const unfollowHandler = () => {
        setIsFollowing(true)
        setTimeout(() => {
            setIsFollowing(false)
        }, 1000);
        dispatch(unfollowUserProfile(userPage.userId))
        // dispatch(getIsFollow(userPage.userId))
    }

    
    return(
    <div>
    <Grid container spacing={2}>
        <Grid item xs={4}>
        <div>
            <div className={classes.profilePicture}>
            {isPhotoViewer && <Lightbox onClose={closePhotoViewer} image={userPhoto ? userPhoto : spot} title={userPage.fullName + "'s profile picture"} />}
                <Avatar sx={{width: size, height: size}} src={userPhoto ? userPhoto : spot} className={!userPhoto ? classes.small : undefined} onClick={openFullscreenViewer} alt="profpiclarge" />
                {isOwner && <div>
                    <label htmlFor="outlined-button-file">
        <Input id="outlined-button-file" type="file" sx={{display: 'none'}} onChange={onUploadPhoto} />
        <Button variant="outlined" startIcon={<AddAPhotoIcon />}
        sx={{display: '', marginLeft: 'auto', marginRight: 'auto'}}
         component="span">
          Upload Photo
        </Button>
      </label>
                </div>}
            </div>
            <div className={classes.userName}>{userPage.fullName}</div>
            {isAuth && <div>{!isOwner && <div>
                <Stack direction='row' spacing={1}>
                <Button variant='contained' startIcon={<SendIcon />} onClick={onStartDialog}>Start dialog</Button>
                {isFollowed 
                ? <Button variant='outlined' disabled={isFollowing} color='error' onClick={unfollowHandler}>Unfollow</Button>
                : <Button variant='outlined' disabled={isFollowing} color='primary' onClick={followHandler}>Follow</Button>} 
                </Stack>
                <hr />
                </div>}</div>}
           <div><ProfileStatus authId={props.auth.id}
                                                          pageId={userPage.userId}/></div>
        </div>
        </Grid>
        <Grid item xs={8}>
        <div className={classes.info}>
            {!editMode ? <div>
                {isOwner && <Button variant="outlined" color='primary' startIcon={<EditIcon />}
                 onClick={activateEditMode}>Edit info</Button>}
                <Box component="span" 
                sx={{
                    display: 'block',
                    p: 1,
                    m: 1,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                  }}><Info userPage={userPage} /></Box>
            </div> : <div><EditInfoForm initialValues={userPage} onSubmit={updateInfo}/></div>}
        </div>
        </Grid>
    </Grid>
    </div>
    );
}

export default ProfileInfo;