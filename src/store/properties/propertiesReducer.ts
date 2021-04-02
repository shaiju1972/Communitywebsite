// application
import { IUserState } from '~/store/user/userTypes';

const initialState = {
    propertiesList:[]
};

export const PROPERTIES_NAMESPACE = 'properties';

function propertiesReducer(state = initialState, action:any) {
    switch (action.type) {
    case 'GET_PROPERTIES_SUCCESS':
        return {
            ...state,
            propertiesList: action.payload,
        };
  
    default:
        return state;
    }
}

export default propertiesReducer;
