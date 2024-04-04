import {
    deleteDataAPI,
    getDataAPI,
    postDataAPI,
    putDataAPI,
} from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyle";

export const USERS_LOADING = {
    GET_USERS: "GET_USERS",
    LOADING_USER: "LOADING_USER",
    GET_USER: "GET_USER",
};

export const getUsers = ({ auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        const res = await getDataAPI("/user", auth.token);
        dispatch({
            type: USERS_LOADING.GET_USERS,
            payload: res.data,
        });
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const updateUser = ({ userData, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        await putDataAPI(
            `/user/${userData.id}`,
            { roles: userData.roles },
            auth.token
        );

        //Notify to user
        const msg = {
            id: userData.id,
            text: "Thông báo !",
            recipients: userData.id,
            url: "",
            content: userData.desc,
            image: "",
        };

        await postDataAPI("/notify", msg, auth.token);

        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const deleteUser = ({ user, auth }) => async (dispatch) => {
    try {
        await deleteDataAPI(`/user/${user._id}`, auth.token);
         //Notify to user
         const msg = {
            id: user._id,
            text: "Thông báo !",
            recipients: user._id,
            url: "",
            content: "Tài khoản của bạn đã bị xoá do vi phạm quy tắc cộng đồng !",
            image: "",
        };

        await postDataAPI("/notify", msg, auth.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
