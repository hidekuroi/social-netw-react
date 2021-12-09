import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux';

// import StoreContext from '../../../StoreContext';

// const MyPostsContainer = (props) => {


//     return <StoreContext.Consumer>
//       { store => {
//         let postsData = store.getState().profile.postsData;
//         let currentValue= store.getState().profile.newPostText;
    
    
//         let addPost = () => {
//             store.dispatch(addPostActionCreator());
//         }
    
//         let updatePostText = (text) => {
//           store.dispatch(updatePostTextActionCreator(text));
//         }
    
//       return <div>
//       How are you?
//     <MyPosts  postsData={postsData}
//              addPost={addPost}
//              updatePostText={updatePostText}
//              currentValue={currentValue} />
//     </div>;
//       }
//     }
//     </StoreContext.Consumer>
// }


let mapStateToProps = (state) => {
  return {
    postsData: state.profile.postsData,
    currentValue: state.profile.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updatePostText: (text) => {
      dispatch(updatePostTextActionCreator(text));
    }
  }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;