import { deleteDataAPI, getDataAPI, putDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "../actions/globalTyle";

export const REPORTS_LOADING = {
    GET_REPORTS: "GET_REPORTS",
    LOADING_REPORT: "LOADING_REPORT",
    GET_REPORT: "GET_REPORT",
};

export const getReports = ({ auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });

        const res = await getDataAPI("/report", auth.token);

        dispatch({
            type: REPORTS_LOADING.GET_REPORTS,
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
export const updateReports = ({ reportData, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
        await putDataAPI(
            `/report/${reportData.id}`,
            {
                act: reportData.desc,
            },
            auth.token
        );
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const deleteReport = ({ reportData, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
        await deleteDataAPI(
            `/report/${reportData.id}`,
            auth.token
        );
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
}
