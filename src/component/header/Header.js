import React from "react";
import Menu from "./Menu";
import Logo from "../../images/THEMELV.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const Header = () => {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div style={{paddingRight: "20px"}}>
      <div className="logo">
        <img src={Logo} width={200} alt="logo_admin" />
        <h5>ADMIN DASHBOAD</h5>
      </div>
      <Menu />
      <div className="d-flex align-items-center p-2" style={{background: "#ccc"}}>
        <img src={auth.user.profilePicture} height={50} width={50} alt="user_header"/>
        <span style={{marginLeft: "10px"}}>{auth.user.username}</span>
      </div>
      <button className="btn btn-secondary w-100 mt-2" onClick={handleLogOut}>Đăng xuất</button>
    </div>
  );
};

export default Header;
