import React from "react";
import { NavLink } from "react-router-dom";
import * as axios from 'axios';
import classes from './Users.module.css';



const Users = (props) => {

    let profilePic = props.profilePic;

    let changePage = (p) => {
        props.onPageChange(p);
    }


    let pages = () => {
            let endPages = [];
            let numberOfPages = Math.ceil(props.totalUsersCount / props.pageSize);
                if(props.currentPage <= 4){
                for(let i=1;i<=6;i++){
                    endPages.push(i);  
                }
                endPages.push('...');
                endPages.push(numberOfPages);
                return endPages;
            }
            if(props.currentPage >4 && props.currentPage < numberOfPages - 3){
                endPages.push(1);
                endPages.push('...');
                for(let i=props.currentPage - 2; i <= props.currentPage + 2; i++){
                    endPages.push(i);
                }
                endPages.push('...');
                endPages.push(numberOfPages);
                return endPages;
            }
            if(props.currentPage >= numberOfPages-3) {
                endPages.push(1);
                endPages.push('...');
                for(let i=numberOfPages - 5; i<= numberOfPages; i++){
                    endPages.push(i);
                }
                return endPages
            }
        } 



        
        return <div>{pages().map(p => {return (<span className={`${classes.pageNumber} ${props.currentPage === p && classes.selected}`} onClick={() => {
            if(typeof(p) == 'number'){
            changePage(p)
            }
        }}>{p}</span>)})}<div>{
            props.users.map(u => <div key={u.id}>
                <div>
                    <div>
                        <NavLink to={`profile/${u.id}`} className={classes.profpic}>
                            <img src={u.photos.small ? u.photos.small : profilePic} className={classes.profilePicture}/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed
                             ? <button onClick={() => {
                                
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY':'8f8fa960-1bac-4e4d-8bd0-46e5a7d17c31'
                                    }
                                })
                                .then(response => {
                                    console.log(response);
                                    if(response.data.resultCode == 0){
                                        props.toggleFollow(u.id);
                                    }
                                    
                                });

                                }}>Unfollow</button>
                             : <button onClick={() => {
                                 
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY':'8f8fa960-1bac-4e4d-8bd0-46e5a7d17c31'
                                    }
                                })
                                .then(response => {
                                    console.log(response);
                                    if(response.data.resultCode == 0){
                                        props.toggleFollow(u.id);
                                    }
                                    
                                });

                                }}>Follow</button>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <div className={classes.username}>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>country</div>
                        <div>city</div>
                    </div>
                </div>
            </div>
            )
        }</div></div>
    
    }

export default Users;