
export const appReducer = (state, action) => {
    switch (action.type) {
      case "SWITCH_AUTH_STATUS":
        return { ...state, isAuthenticated: action.payload.status || false };
      default:
        return state;
    }
  };
  