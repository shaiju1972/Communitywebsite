// application
import { AppAction } from '~/store/types';
import { IUser } from '~/interfaces/user';

export const USER_SET_CURRENT = 'USER_SET_CURRENT';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_LOCATONS = 'SET_LOCATONS';

export interface UserSetCurrentAction {
    type: typeof USER_SET_CURRENT;
    payload: IUser | null;
}

export interface UserSetCategoriesAction {
    type: typeof SET_CATEGORIES;
    payload:any
}
export interface UserSetLocationsAction {
    type: typeof SET_LOCATONS;
    payload:any
}

export type UserAction = UserSetCurrentAction | UserSetCategoriesAction | UserSetLocationsAction;

export type UserThunkAction<T = void> = AppAction<UserAction, T>;
