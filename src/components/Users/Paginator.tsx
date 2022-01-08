import React from 'react';
import classes from './Paginator.module.css';
import {UsersPropsType} from './Users'
//Refactor all this shitty code later

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number

    onPageChange: (page: number) => void
}



const Paginator = (props: PropsType) => {

let changePage = (p: number) => {
    props.onPageChange(p);
}

type PagesType = () => ((string|number)[]|undefined)


let pages: PagesType = () => {
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


    return (
    <div>
        {pages()!.map(p => {return (<span className={`${classes.pageNumber} 
            ${props.currentPage === p && classes.selected}`} onClick={() => {
            if(typeof(p) == 'number'){
            changePage(p)
            }
        }}>{p}</span>)})}
    </div>
    );
}

export default Paginator;