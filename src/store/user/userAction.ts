// application
import { accountApi } from '~/api';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';
import { USER_SET_CURRENT, UserSetCurrentAction, UserThunkAction, SET_CATEGORIES, UserSetCategoriesAction, SET_LOCATONS, UserSetLocationsAction } from '~/store/user/userActionTypes';
import axios from 'axios';
import {getApi, get, postApi, setAxios} from '~/services/axios';
import { toast } from 'react-toastify'

export function userSetCurrent(user: IUser | null): UserSetCurrentAction {
    return {
        type: USER_SET_CURRENT,
        payload: user,
    };
}

export function setCategories(categories):UserSetCategoriesAction{
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}
export function setLocations(locations):UserSetLocationsAction{
    return {
        type: SET_LOCATONS,
        payload: locations
    }
}

export function userSignIn(
    email: string,
    password: string,
): UserThunkAction<Promise<void>> {
    return async (dispatch) => {
        const postData={
            username:email,
            password:password,
            deviceType:'WEB',
            deviceToken:'sdgifr43etwiyr423dfgfd423iwiedhjcbzjc3gjzg33jcgxzjhcxz1'
        };
        return axios.post('http://175.41.176.135:3000/v1/users/login', postData)
        .then(response =>{
            if(response?.data?.status){
                dispatch(userSetCurrent(response?.data?.data));
                if (typeof window !== "undefined") {
                    setAxios()
                    getCategories()
                    localStorage.setItem('auth', JSON.stringify(response?.data?.data))
                }
            }else{
                toast.error(response.data.message)
            }
        }).catch(err =>{
            toast.error(err?.response?.data?.message)
        })
    
    };
}

export function getCategories(){
    return (dispatch) =>{
        // https://api.mycommunity.qa/v1/properties/category/list
        return axios.get('http://175.41.176.135:3000/v1/properties/category/list')
        .then((response: any) =>{
            if(response?.data?.data.length){
                dispatch(setCategories(response?.data?.data))
            }
        })
        .catch(err => console.log(err))
    }
}
export function getLocations(){
    return (dispatch) =>{
        // https://api.mycommunity.qa/v1/properties/category/list
        return axios.get('http://175.41.176.135:3000/v1/locations')
        .then((response: any) =>{
            if(response?.data?.data.length){
                dispatch(setLocations(response?.data?.data))
            }
        })
        .catch(err => console.log(err))
    }
}

export function userSignUp(
    email: string,
    password: string,
): UserThunkAction<Promise<void>> {
    return (dispatch) => (
        accountApi.signUp(email, password).then((user) => {
            dispatch(userSetCurrent(user));
        })
    );
}

export function userSignOut(): UserThunkAction<Promise<void>> {
    return (dispatch) => {
        const payload ={
            deviceType:'WEB',
            deviceToken:'sdgifr43etwiyr423dfgfd423iwiedhjcbzjc3gjzg33jcgxzjhcxz1',
            platform:'2'
        }
        return postApi('/v1/users/logout',payload)
        .then(response=>{
            dispatch(userSetCurrent(null));
        })
        // accountApi.signOut().then(() => {
        // })
    };
}

export function userEditProfile(
    // data: IEditProfileData,
    data: any,
): UserThunkAction<Promise<void>> {
    return (dispatch) => (
        accountApi.editProfile(data).then((user) => {
            dispatch(userSetCurrent(user));
        })
    );
}
