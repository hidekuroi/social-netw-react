const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialState = {
        postsData: [
            {id:1, text:'breaps, i love dicks', likesCount:228},
            {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
        ],
        newPostText:''
};

const profileReducer = (state = initialState, action) => {
    
    switch(action.type){
        case ADD_POST:
            let newPost = {
                id: state.postsData.length + 1,
                text: state.newPostText,
                likesCount: 0
            };
            state.postsData.push(newPost);
            state.newPostText = '';
            return state;

        case UPDATE_POST_TEXT:
            state.newPostText = action.newText;
            return state;

        default:
            return state;

    }

}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newText: text});

export default profileReducer;