import React, { useState } from "react";
import {
  REPORTS_LOADING,
  updateReports,
  deleteReport
} from "../../redux/actions/reportAction";
import { useDispatch, useSelector } from "react-redux";

const ReportInfor = () => {
  const report = useSelector((state) => state.reports.report);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const initialState = {
    id: report._id,
    desc: report.act,
  };

  const [reportData, setReportData] = useState(initialState);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleClose = () => {
    dispatch({ type: REPORTS_LOADING.LOADING_REPORT, payload: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReports({ reportData, auth }));
  };

  const handleDelete = () => { 
    dispatch(deleteReport({ reportData, auth}))
  }
  return (
    <div className="post_infor">
      <div className="post_infor_container">
        <div className="infor_title_post">
          <h5>Chi tiết báo cáo</h5>
          <span onClick={() => handleClose()}>&times;</span>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <td>{report._id}</td>
          </tr>
          <tr>
            <th>UserReport</th>
            <td>{report.user.username}</td>
          </tr>
          <tr>
            <th>Related</th>
            <td>{report.related}</td>
          </tr>
          <tr>
            <th>Desc</th>
            <td>{report.text}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{report.type}</td>
          </tr>
          <tr>
            <th>Create</th>
            <td>{new Date(report.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Update Act</th>
            <td>{new Date(report.updatedAt).toLocaleString()}</td>
          </tr>
        </table>
        <form onSubmit={handleSubmit} className="pt-4">
          <label htmlFor="descTextInput" className="form-label">
            Act !
          </label>
          <textarea
            col={30}
            rows={4}
            type="text"
            id="descTextInput"
            className="form-control"
            value={reportData.desc}
            onChange={handleChangeValue}
            name="desc"
          />
          <button className="btn btn-success w-100 mt-2" type="submit">
            Cập nhật
          </button>
        </form>
          <button className="btn btn-danger w-100 mt-2" onClick={handleDelete}>
            Xoá
          </button>
      </div>
    </div>
  );
};

export default ReportInfor;
