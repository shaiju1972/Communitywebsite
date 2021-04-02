// third-party
import { toast } from 'react-toastify';
// application
import {getApi, postApi} from '~/services/axios';
import axios from 'axios';
export const API_URL = process.env.API_URL || 'http://175.41.176.135:3000';
export function addPropertiesSuccess() {
    return {
        type: 'ADD_PROPERTIES_SUCCESS'
    };
}

export function getPropertiesSuccess(properties){
    return{
        type: 'GET_PROPERTIES_SUCCESS',
        payload: properties
    }
}


export function addProperties(property){
    // sending request to server, timeout is used as a stub
    let form = new FormData();
    Object.keys(property).forEach(item =>{
        if(item !== 'image'){
            form.append(item, property[item])
        }else{
            if(property[item].length){
                property[item].forEach(file=>{
                    form.append('image', file)
                })
            }
        }
    })
    return (dispatch) => (
        postApi('/v1/properties', form)
        .then((response=>{
            toast.success('Properties added')
            return response;
        }))
        .catch(err =>{
            err.response?.data?.data?.length ? toast.error(err.response?.data?.data[0].message) : toast.error(err.response?.data?.message);
        })
    );
}

export function getAllProperties(){
    return (dispatch)=>{
        return axios.get(`${API_URL}/v1/properties`)
        .then((response:any) =>{
            if(response.data.status){
                dispatch(getPropertiesSuccess(response.data))
            }
        })
        .catch(err => console.log(err))
    }
}

export function getCategoriesFilter(payload){
    const params = Object.keys(payload).map((i, index) => `${index==0 ?'/?':'&'}${i}=${payload[i]||''}`);
    return (dispatch)=>{
        return axios.get(`${API_URL}/v1/properties${params.join('')}`)
        .then(response =>{
            if(response.data.status){
                dispatch(getPropertiesSuccess(response.data))
            }
        }).catch(e => console.log(e))
    }
}

export function getpropertiesById(payload) {

     return (dispatch)=>{
        return axios.get(`${API_URL}/v1/properties/${payload}`)
        .then(response =>{
            if (response.data.status) {
                return response.data.data;
            }
        }).catch(e => console.log(e))
    }

}