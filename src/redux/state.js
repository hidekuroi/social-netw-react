import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _subscribeNotifier() {
        console.log('dixon');
    },

    _state: {
        profile: {
            postsData: [
                {id:1, text:'breaps, i love dicks', likesCount:228},
                {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
            ],
            newPostText:''
        },
        messenger:{
            messagesData: [
                {id: 1, message: 'Ты Евгений Цыганов?'},
                {id: 2, message: 'если да, пошёл нахуй'},
                {id: 3, message: 'если нет, пошёл нахуй пиздабол'}
            ],
            dialogsData: [
                {id: 1, name: 'Breapster'},
                {id: 2, name: 'Broadcaster'},
                {id: 3, name: 'Circ.lek'},
                {id: 4, name: 'Vasya Govnyuchenko'}
            ],
            messengerInputField: ''
        }
    },

    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.messenger = dialogsReducer(this._state.messenger, action);

        this._subscribeNotifier(this.getState());

    },

    subscribe(observer){
        this._subscribeNotifier = observer;
    },

    getState() {
        return this._state;
    }
};






export default store;