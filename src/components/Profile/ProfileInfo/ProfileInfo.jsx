import React, {useState} from 'react';
import Loading from '../../common/Loading';
import Info from './Info';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProifleStatus';
import EditInfoForm from './EditInfoForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    let isOwner = false;
    
    if(props.userPageData.userPage){
        if(props.userPageData.auth.id === props.userPageData.userPage.userId) {
        isOwner = true;
        }
    }

    let spot='https://wiki-vk.ru/s/001/512/41.png';
    
    if(!props.userPageData.userPage){
        return <Loading color={'white'}/>
    }

    let changePhotoSize = () => {
        props.userPageData.changePhotoSize();
    }

    let uploadPhoto = (e) => {
        if (e.target.files.length){
            props.userPageData.uploadPhoto(e.target.files[0]);
        }
    }


    let activateEditMode = () => {
        setEditMode(true);
    }

    let updateInfo = (formData) => {
        props.uploadInfo(formData);
        setEditMode(false);
    }

    
    return(
    <div>
        <div>
            <img className={classes.wallpaper} src="https://img5.goodfon.ru/original/1600x900/6/71/peizazh-kholmy-minimalizm.jpg" alt="breaps"/>
            <div className={classes.profilePicture}>
                <img src={props.userPageData.userPhoto ? props.userPageData.userPhoto : spot} className={!props.userPageData.userPhoto ? classes.small : null} onClick={changePhotoSize} alt="profpiclarge" />
                {props.userPageData.userPage.userId === props.userPageData.auth.id && <div>
                    <label for="profilepic">{`Choose a profile picture: `}</label>
                    <input type="file" id="profilepic" onChange={uploadPhoto}/>
                </div>}
            </div>
            <div className={classes.userName}>{props.userPageData.userPage.fullName}</div>
           <div className={classes.status}><ProfileStatus updateStatus={props.userPageData.updateStatus}
                                                          status={props.userPageData.status}
                                                          authId={props.userPageData.auth.id}
                                                          pageId={props.userPageData.userPage.userId}/></div>
            {/* <div className={classes.aboutMe}>{props.userPageData.userPage.aboutMe}</div> */}
        </div>

        <div className={classes.info}>
            {!editMode ? <div>
                {isOwner && <button onClick={activateEditMode}>Edit info</button>}
                <Info userPage={props.userPageData.userPage} />
            </div> : <div><EditInfoForm initialValues={props.userPageData.userPage} onSubmit={updateInfo}/></div>}
        </div>
    </div>
    );
}

export default ProfileInfo;