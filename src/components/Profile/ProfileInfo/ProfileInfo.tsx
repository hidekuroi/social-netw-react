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

type PropsType = {
    auth: any,
}

const ProfileInfo = (props: PropsType) => {

    const userPage = useSelector((state:RootState) => {return state.profile.userPage})
    const userPhoto = useSelector((state: RootState) => {return state.profile.userPhoto})

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

    
    return(
    <div>
        <div>
            <img className={classes.wallpaper} src="https://img5.goodfon.ru/original/1600x900/6/71/peizazh-kholmy-minimalizm.jpg" alt="breaps"/>
            <div className={classes.profilePicture}>
                <img src={userPhoto ? userPhoto : spot} className={!userPhoto ? classes.small : undefined} onClick={onChangePhotoSize} alt="profpiclarge" />
                {isOwner && <div>
                    <label>{`Choose a profile picture: `}</label>
                    <Input type="file" id="profilepic" onChange={onUploadPhoto}/>
                </div>}
            </div>
            <div className={classes.userName}>{userPage.fullName}</div>
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