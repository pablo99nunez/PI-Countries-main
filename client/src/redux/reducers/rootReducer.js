import {GET_COUNTRIES, GET_COUNTRY} from '../actions/countryAction'
const initialState={
    countries:[],
    country:{}
}

export default function rootReducer(state=initialState,action){

    switch(action.type){
        case GET_COUNTRIES:{
            return{
                countries:action.payload
            }
        }
        case GET_COUNTRY:{
            return{
                country:action.payload
            }
        }
        default:return initialState
    }
}