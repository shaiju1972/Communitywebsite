// application
import { IUserState } from '~/store/user/userTypes';
import { USER_SET_CURRENT, UserAction, SET_CATEGORIES, SET_LOCATONS } from '~/store/user/userActionTypes';

const initialState: IUserState = {
    current: null,
    propertyCategories:[],
    locations:[]
};

export const USER_NAMESPACE = 'user';

function userReducer(state = initialState, action: UserAction): IUserState {
    switch (action.type) {
    case USER_SET_CURRENT:
        return {
            ...state,
            current: action.payload,
        };
    case SET_CATEGORIES:
        return{
            ...state,
            propertyCategories: action.payload
        }
    case SET_LOCATONS:
        return{
            ...state,
            locations: action.payload
        }
    default:
        return state;
    }
}

export default userReducer;
