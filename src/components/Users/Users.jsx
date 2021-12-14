import React from "react";
import classes from './Users.module.css'
import * as axios from 'axios';


class Users extends React.Component {
    
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersCount(response.data.totalCount);
        });
    }

    onPageChange(p) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${p}`)
        .then(response => {
            console.log('dicksters ' + this.props.currentPage)

            this.props.setUsers(response.data.items);
        });
    }


    render() {
        let profilePic = this.props.profilePic;

        let endPages = [];

        let changePage = (p) => {
            console.log("1: "+this.props.currentPage);
            this.props.changeCurrentPage(p);
            console.log("2: "+this.props.currentPage);
            this.onPageChange(p);
        }

        let pages = (p) => {
            let numberOfPages = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
            console.log("pages: "+this.props.currentPage);
            if(this.props.currentPage <= 3){
                for(let i=1;i<=6;i++){
                    endPages.push(i);  
                }
                endPages.push(numberOfPages);
                return endPages;
            }
            if(this.props.currentPage >3){
                endPages.push(1);
                for(let i=this.props.currentPage - 2; i <= this.props.currentPage + 2; i++){
                    endPages.push(i);
                }
                endPages.push(numberOfPages);
                return endPages;
            }
        } 
        


        
        return <div>{pages().map(p => {return (<span className={classes.pageNumber} onClick={() => {changePage(p)}}>{p}</span>)})}<div>{
            this.props.users.map(u => <div key={u.id}>
                <div>
                    <div>
                        <img src={u.photos.small ? u.photos.small : profilePic} className={classes.profilePicture}/>
                    </div>
                    <div>
                        {
                            u.followed
                             ? <button onClick={() => {
                                 this.props.toggleFollow(u.id)
                                }}>Unfollow</button>
                             : <button onClick={() => {
                                 this.props.toggleFollow(u.id)
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
}

export default Users;