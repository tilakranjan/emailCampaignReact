import { campaignTypes } from './campaign.types'
import axios from 'axios'
import Const from '../../const/const'


export const ecAdd = (data) => {
    return dispatch => {
        dispatch({type:campaignTypes.EC_ADD_START})

        return axios.post(`${Const.baseUrl}/ec/add`,{...data})
                    .then(res => res.data)
                    .then(res => {
                        if(res.success) {
                            dispatch({type:campaignTypes.EC_ADD_SUCCESS,payload:res.result})
                        } else {
                            dispatch({type:campaignTypes.EC_ADD_FAIL,payload:res.error})
                        }
                    }).catch(err => dispatch({type:campaignTypes.EC_ADD_FAIL,payload:err.message})
                    )
    }
}

export const clearAdd = () => {
    return dispatch => {
        dispatch({type:campaignTypes.EC_ADD_INIT})
    }
}

export const ecCheck = (data) => {
    return dispatch => {
        dispatch({type:campaignTypes.EC_CHECK_START})

        return axios.post(`${Const.baseUrl}/ec/check`,{...data})
                    .then(res => res.data)
                    .then(res => {
                        if(res.success) {
                            dispatch({type:campaignTypes.EC_CHECK_SUCCESS,payload:res.result})
                        } else {
                            dispatch({type:campaignTypes.EC_CHECK_FAIL,payload:res.error})
                        }
                    }).catch(err => dispatch({type:campaignTypes.EC_CHECK_FAIL,payload:err.message})
                    )
    }
}

export const clearCheck = () => {
    return dispatch => {
        dispatch({type:campaignTypes.EC_CHECK_INIT})
    }
}
