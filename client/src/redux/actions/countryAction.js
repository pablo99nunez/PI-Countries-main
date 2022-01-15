export const GET_COUNTRIES="GET_COUNTRIES"
export const GET_COUNTRY="GET_COUNTRY"


export function getCountries(){
    return function(dispatch){
        return fetch("http://localhost:3001/countries").then(res=>res.json().then(payload=>{
            dispatch({type:GET_COUNTRIES, payload})
        }))
    }
}
export function getCountry(payload){
    return function(dispatch){
        return fetch("http://localhost:3001/countries/"+payload).then(res=>res.json().then(payload=>{
            dispatch({type:GET_COUNTRY, payload})
        }))
    }
}


            
            
