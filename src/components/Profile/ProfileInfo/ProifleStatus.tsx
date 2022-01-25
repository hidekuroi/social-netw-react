import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../redux/profileReducer';
import { RootState } from '../../../redux/redux-store';

type PropsType = {
    authId: number | null,
    pageId: number
}

const ProifleStatus = (props: PropsType) => {

    const mStatus = useSelector((state: RootState) => {return state.profile.status})

    const dispatch = useDispatch();

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(mStatus);

    const activateEditMode = () => {
        if(props.authId === props.pageId){
        setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }

    const changeText = (e: any) => {
        let text = e.target.value;
        setStatus(text);
    }

    useEffect(() => {
        setStatus(mStatus);
    },[mStatus])



    return (
     
        <div>
            
              {!editMode &&
              <div>
                  <span onClick={activateEditMode}>{status || 'There are no status'}</span>
              </div>
              }
             {editMode &&
             <div>
                <input autoFocus={true} onChange={changeText} onBlur={deactivateEditMode} value={status}></input>
            </div>
             }
            
        </div>
            
    )
}

export default ProifleStatus;
