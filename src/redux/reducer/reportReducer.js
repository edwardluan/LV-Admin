import { REPORTS_LOADING } from "../actions/reportAction"

const initialState = {
    reports: [],
    report: [],
    loadingReport: false
}

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORTS_LOADING.LOADING_REPORT:
            return {
                ...state,
                loadingReport: action.payload
            }
        case REPORTS_LOADING.GET_REPORT:
            return {
                ...state,
                report: action.payload
            }
        case REPORTS_LOADING.GET_REPORTS:
            return {
                ...state,
                reports: action.payload.report
            }
        default:
            return state;
    }
}

export default reportReducer