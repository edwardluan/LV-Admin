import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REPORTS_LOADING, getReports } from "../redux/actions/reportAction";
import ReportInfor from "../component/report/ReportInfor";

const Report = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const reports = useSelector((state) => state.reports.reports);
  const loadingReport = useSelector((state) => state.reports.loadingReport);

  const [filteredReports, setFilteredReports] = useState([]);

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredReports = reports.filter((report) => {
      return (
        report._id.toLowerCase().includes(filterValue) ||
        report.user.username.toLowerCase().includes(filterValue) ||
        report.type.toLowerCase().includes(filterValue) ||
        report.text.toLowerCase().includes(filterValue)
      );
    });
    setFilteredReports(filteredReports);
  };

  const handleGetReport = (item) => {
    dispatch({ type: REPORTS_LOADING.LOADING_REPORT, payload: true });
    dispatch({ type: REPORTS_LOADING.GET_REPORT, payload: item });
  }

  useEffect(() => {
    if (reports.length === 0) dispatch(getReports({ auth }));
  }, [reports.length, dispatch, auth]);

  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  return (
    <div>
      {loadingReport && <ReportInfor />}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm..."
          onChange={handleFilter}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>UserReport</th>
            <th>Type</th>
            <th>Related</th>
            <th>Desc</th>
            <th>Create</th>
            <th>Update</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <tr key={item._id}>
                <td>{item.user.username}</td>
                <td>{item.type}</td>
                <td>{item.related}</td>
                <td>{item.text}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.act}</td>
                <td onClick={() => handleGetReport(item)}>Xem</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
