import { campaignTypes } from './campaign.types'

const INITIAL_STATE_ADD = {
    submitting: false,
    submitSuccess: null,
    submitFail: null
}


export function AddReducer(state = INITIAL_STATE_ADD, action) {
    switch (action.type) {
        case campaignTypes.EC_ADD_INIT:
            return {
                ...state,
                submitting: false,
                submitSuccess: null,
                submitFail: null
            }
        case campaignTypes.EC_ADD_START:
            return {
                ...state,
                submitting: true,
                submitSuccess: null,
                submitFail: null
            }
        case campaignTypes.EC_ADD_SUCCESS:
            return {
                ...state,
                submitting: false,
                submitSuccess: action.payload,
                submitFail: null
            }

        case campaignTypes.EC_ADD_FAIL:
            return {
                ...state,
                submitting: false,
                submitSuccess: null,
                submitFail: action.payload
            }

    
        default:
           return state;
    }
}


const INITIAL_STATE_CHECK = {
    isLoading: false,
    data: null,
    errors: null
}


export function CheckReducer(state = INITIAL_STATE_CHECK, action) {
    switch (action.type) {
        case campaignTypes.EC_CHECK_INIT:
            return {
                ...state,
                isLoading: false,
                data: null,
                errors: null
            }
        case campaignTypes.EC_CHECK_START:
            return {
                ...state,
                isLoading: true,
                data: null,
                errors: null
            }
        case campaignTypes.EC_CHECK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                errors: null
            }

        case campaignTypes.EC_CHECK_FAIL:
            return {
                ...state,
                isLoading: false,
                data: null,
                errors: action.payload
            }

    
        default:
           return state;
    }
}