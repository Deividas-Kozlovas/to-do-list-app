// AuthReducer.js (updated)
const initialState = {
  user: null,
  userProfile: null,
  loading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Prisijungimas':
      return { ...state, user: action.payload, loading: false };
    case 'Atsijungimas':
      return { ...state, user: null, userProfile: null, loading: false };
    case 'Nustatyti_Profilį':
      return { ...state, userProfile: action.payload };
    case 'Nustatyti_Pakrovimą':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default authReducer;