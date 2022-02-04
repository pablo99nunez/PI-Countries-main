import {

  ADD_ACTIVITY,
  FILTER_COUNTRIES,
  GET_COUNTRIES,
  GET_COUNTRY,
  ORDER_COUNTRIES,
  SEARCH,
  ERROR,
  TOGGLE_APIS
} from '../actions/countryAction';
const initialState = {
  countries: [],
  country: {},
  results: [],
  activities: [],
  error: null,
  APIenabled: true,
  isLog: false,
  user: {}
};

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload
      };
    }
    case GET_COUNTRY: {
      return {
        ...state,
        country: action.payload
      };
    }
    case SEARCH: {
      return {
        ...state,
        results: state.countries.filter((e) =>
          removeAccents(e.name.toLowerCase()).includes(removeAccents(action.payload.toLowerCase())))
          .sort((a, b) => {
            if (a.name.length - action.payload.length < b.name.length - action.payload.length) {
              return -1
            } else return 1
          })
      };
    }
    case FILTER_COUNTRIES: {
      const continents = action.payload.continent === 'Todos'
        ? state.countries
        : state.countries.filter((e) => e.region === action.payload.continent)

      const result = action.payload.activity === 'Ninguna'
        ? continents
        : action.payload.activity === 'Cualquiera'
          ? continents.filter(e => e.activities[0])
          : continents.filter(e => e.activities.find(a => a.name === action.payload.activity))
      return {
        ...state,
        results: result
      };
    }
    case ORDER_COUNTRIES: {
      const { alf, pob } = action.payload;
      const founds = state.results[0] ? [...state.results] : [...state.countries];

      return {
        ...state,
        results: founds.sort((a, b) => {
          if (alf) {
            if (a.name < b.name) {
              return alf === 'asc' ? -1 : 1;
            } else if (a.name > b.name) {
              return alf === 'asc' ? 1 : -1;
            } else return 0;
          }
          if (pob) {
            if (a.population < b.population) {
              return pob === 'asc' ? -1 : 1;
            } else if (a.population > b.population) {
              return pob === 'asc' ? 1 : -1;
            } else return 0;
          }
        })
      };
    }

    case ADD_ACTIVITY: {
      const founds = state.countries.filter(e => action.payload.IDs.find(id => e.id === id))

      founds.forEach(e => {
        e.activities = e.activities ? [...e.activities, action.payload.name] : [action.payload.name]
      })
      return {
        ...state,
        activities: [...state.activities, action.payload]
      };
    }
    case ERROR:{
      return {
        ...state,
        error: action.payload
      }
    }
    case TOGGLE_APIS:{
      return {
        ...state,
        APIenabled: !state.APIenabled
      }
    }

    default:
      return initialState;
  }
}
