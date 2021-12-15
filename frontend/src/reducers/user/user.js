const initialState={ user:{}};


const user = (state=initialState,{type,payload})=>{
    switch (type) {
        case "ADD_USER":
            return{user:payload}
        case "CLEAR_USER":
            return{user:{}}
        default:
            return state;
    }
}

export default user;

export const addUser = (current_user)=>{
    return{
        type:"ADD_USER",
        payload:current_user
    }
}
export const clearUser = (current_user)=>{
    return{
        type:"CLEAR_USER",
        payload:current_user
    }
}