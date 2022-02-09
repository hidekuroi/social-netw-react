import React, {useState} from 'react';
import Loading from '../../common/Loading';
import Info from './Info';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProifleStatus';
import EditInfoForm from './EditInfoForm';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux-store';
import { actions, uploadInfo, uploadPhoto } from '../../../redux/profileReducer';
import {actions as actions2} from '../../../redux/dialogsReducer'
import { startDialog } from '../../../redux/dialogsReducer';
import { Redirect, useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';

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

    let spot='https://wiki-vk.ru/s/001/512/41.png';
    
    if(!userPage){
        return <Loading color={'white'}/>
    }

    let onChangePhotoSize = () => {
        dispatch(actions.changePhotoSize());
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

    
    return(
    <div>
        <div>
            <div className={classes.profilePicture}>
                <Avatar sx={{width: size, height: size}} src={userPhoto ? userPhoto : spot} className={!userPhoto ? classes.small : undefined} onClick={onChangePhotoSize} alt="profpiclarge" />
                {isOwner && <div>
                    <label>{`Choose a profile picture: `}</label>
                    <Input type="file" id="profilepic" onChange={onUploadPhoto}/>
                </div>}
            </div>
            <div className={classes.userName}>{userPage.fullName}</div>
            {!isOwner && <div>
                <Button variant='contained' onClick={onStartDialog}>Start dialog</Button>
                <hr />
                </div>}
           <div className={classes.status}><ProfileStatus authId={props.auth.id}
                                                          pageId={userPage.userId}/></div>
        </div>

        <div className={classes.info}>
            {!editMode ? <div>
                {isOwner && <Button variant="contained" onClick={activateEditMode}>Edit info</Button>}
                <Info userPage={userPage} />
            </div> : <div><EditInfoForm initialValues={userPage} onSubmit={updateInfo}/></div>}
        </div>
    </div>
    );
}

export default ProfileInfo;