import { AuthProvider, AuthContext } from "./authContext";
import { useContext } from "react";
export const SWITCH_AUTH_STATUS = "SWITCH_AUTH_STATUS";
export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    const login = async () => {
        // làm gì đó ở đây
        await dispatch({ type: SWITCH_AUTH_STATUS, payload: { status: true } })
    }
    const logout = () => {
        // làm gì đó ở đây
        dispatch({ type: SWITCH_AUTH_STATUS, payload: { status: false } })
    }
    return {
        login,
        logout,
        state
    }
}