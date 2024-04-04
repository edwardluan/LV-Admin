import React, { useEffect, useState } from "react";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const initialState = { phoneNumber: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { phoneNumber, password } = userData;

  const navigate = useNavigate()

  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify?.err);
  const auth = useSelector((state) => state.auth?.token)

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth) {
      navigate("/")
    }
  })

  return (
    <div className="login_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center pb-4">Nông Nghiệp Việt Nam</h3>
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="form-label">
            Nhập số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumberInput"
            aria-describedby="phoneNumberHelp"
            onChange={handleChangeInput}
            value={phoneNumber}
            name="phoneNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Nhập mật khẩu
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Ẩn" : "Hiện"}
            </small>
          </div>
        </div>
        <small className="text-danger">{notify}</small>
        <button
          type="submit"
          className="btn btn-success w-100 mt-4"
          disabled={phoneNumber && password ? false : true}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
