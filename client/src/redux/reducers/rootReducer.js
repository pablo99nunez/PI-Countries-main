import {FILTER_COUNTRIES, GET_COUNTRIES, GET_COUNTRY, ORDER_COUNTRIES, SEARCH} from '../actions/countryAction'
const initialState={
    countries:[],
    country:{},
    results:[]
}

export default function rootReducer(state=initialState,action){

    switch(action.type){
        case GET_COUNTRIES:{
            return{
                ...state,
                countries:action.payload
            }
        }
        case GET_COUNTRY:{
            return{
                ...state,
                country:action.payload
            }
        }
        case SEARCH:{
            return{
                ...state,
                results:state.countries.filter(e=>e.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        }
        case FILTER_COUNTRIES:{
            return{
                ...state,
                results:state.countries.filter(e=>e.region==action.payload)
            }
        }
        case ORDER_COUNTRIES:{
            const {alf,pob} = action.payload
           

            return{
                ...state,
                results:state.countries.sort((a,b)=>{
                    if(alf){
                        if(a.name<b.name){
                            return alf=="asc"?-1:1
                        }
                        else if(a.name>b.name)
                        {
                            return alf=="asc"?1:-1
                        }else return 0
                    }
                    if(pob){
                        if(a.population<b.population){
                            return pob=="asc"?-1:1
                        }else if(a.population>b.population)
                        {
                            return pob=="asc"?1:-1
                        }else return 0
                    }
                })

            }
        }
        default:return initialState
    }
}