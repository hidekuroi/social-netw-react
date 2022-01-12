import React, {useState, useEffect} from 'react';

type PropsType = {
    authId: number | null,
    status: string,
    pageId: number

    updateStatus: (status: string) => void
}

const ProifleStatus = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        if(props.authId === props.pageId){
        setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const changeText = (e: any) => {
        let text = e.target.value;
        setStatus(text);
    }

    useEffect(() => {
        setStatus(props.status);
    },[props.status])



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
