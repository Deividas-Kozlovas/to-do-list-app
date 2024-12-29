const initialState = {
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'Prisijungimas':
        return { ...state, user: action.payload };
      case 'Atsijungimas':
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;