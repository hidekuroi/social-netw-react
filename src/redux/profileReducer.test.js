import profileReducer, {deletePost, addPost} from "./profileReducer";
import React from 'react';

const state = {
    postsData: [
        {id:1, text:'breaps, i love dicks', likesCount:228},
        {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
    ],
};

test('post length should be decremented', () => {
  let action = deletePost(2);

  let newState = profileReducer(state, action);


  expect(newState.postsData.length).toBe(1);
});

// test('post text should be correct', () => {
//   let action = addPost('dixon');
  
//   let newState = profileReducer(state, action);

//   expect(newState.postsData[1].text).toBe('dixon');
// });
