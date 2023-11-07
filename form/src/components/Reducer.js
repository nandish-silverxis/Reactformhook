const { combineReducers } = require("redux"); 

const INITAL_STATE = { 
	todo : []
} 

const INITAL_STATE_USER = { 
	userInfo : {}
}
const dataReducer = (state=INITAL_STATE, action)=>{ 
	switch(action.type) { 
		case 'UPDATE_DATA' :
            return {...state, todo : action.payload}; 

            default : return state; 
	} 
} 
const userReducer = (state=INITAL_STATE_USER, action)=>{ 
	switch(action.type) { 
		case 'UPDATE_USER_INFO' :
            return {...state, userInfo : action.payload}; 

            default : return state; 
	} 
}


const reducers = combineReducers({ 
	data : dataReducer,
    user: userReducer
    

}) 

export default reducers
