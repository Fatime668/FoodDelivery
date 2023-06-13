import StorageService from "../../services/StorageService";


const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  SET_USER_DATA: 'SET_USER_DATA',
};


const setToken=(token:any)=>{
    return {
        type:types.SET_TOKEN,
        payload:token
    }
}

