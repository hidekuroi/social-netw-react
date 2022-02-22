import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux-store';
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

    const isLoading = useSelector((state: RootState) => {return state.usersPage.isLoading})

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value)
       if(value != props.currentPage) props.onPageChange(value)
    }

// let changePage = (p: number) => {
//     props.onPageChange(p);
// }

// type PagesType = () => ((string|number)[]|undefined)
let numberOfPages = Math.ceil(props.totalUsersCount / props.pageSize);

// old selfmade pagination... rest in peace
// let pages: PagesType = () => {
//         let endPages = [];
//         if(numberOfPages <= 6) {
//             for(let i=1; i <= numberOfPages; i++){
//                 endPages.push(i);
//             }
//             return endPages;
//         }
//             if(props.currentPage <= 4){
//             for(let i=1;i<=6;i++){
//                 endPages.push(i);  
//             }
//             endPages.push('...');
//             endPages.push(numberOfPages);
//             return endPages;
//         }
//         if(props.currentPage >4 && props.currentPage < numberOfPages - 3){
//             endPages.push(1);
//             endPages.push('...');
//             for(let i=props.currentPage - 2; i <= props.currentPage + 2; i++){
//                 endPages.push(i);
//             }
//             endPages.push('...');
//             endPages.push(numberOfPages);
//             return endPages;
//         }
//         if(props.currentPage >= numberOfPages-3) {
//             endPages.push(1);
//             endPages.push('...');
//             for(let i=numberOfPages - 5; i<= numberOfPages; i++){
//                 endPages.push(i);
//             }
//             return endPages
//         }
//     } 

    return (
    <div>
        {/* {pages()!.map(p => {return (<span className={`${classes.pageNumber} 
            ${props.currentPage === p && classes.selected}`} onClick={() => {
            if(typeof(p) == 'number'){
            changePage(p)
            }
        }}>{p}</span>)})} */}

        <Pagination disabled={isLoading} size='large' count={numberOfPages}
         page={props.currentPage} siblingCount={2} onChange={handleChange}
         sx={{marginBottom: '20px'}}></Pagination>
    </div>
    );
}

export default Paginator;