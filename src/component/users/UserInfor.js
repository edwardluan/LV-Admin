import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERS_LOADING, deleteUser } from "../../redux/actions/usersAction";
import { updateUser } from "../../redux/actions/usersAction";

const UserInfor = () => {
  const user = useSelector((state) => state.users.user);
  const auth = useSelector((state) => state.auth);

  const initState = {
    id: user._id,
    roles: user.roles,
    desc: user.desc,
  };

  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initState);

  const handleClose = () => {
    dispatch({ type: USERS_LOADING.LOADING_USER, payload: false });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        userData,
        auth,
      })
    );
  };

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete ?"))
      dispatch(deleteUser({ user, auth }));
  };

  return (
    <div className="infor_user">
      <form onSubmit={handleSubmit}>
        <div className="infor_title">
          <h5 className="heading">Thông tin</h5>
          <span onClick={() => handleClose()}>&times;</span>
        </div>
        {/* disabled username, phone */}
        <div className="row">
          <img
            src={user.profilePicture}
            alt="avatar_user"
            className="col-md-3"
          />
          <fieldset disabled className="col-md-3">
            <div className="mb-3">
              <label htmlFor="disabledTextInput" className="form-label heading">
                Username
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                value={user.username}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="disabledTextInput" className="form-label heading">
                PhoneNum
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                value={user.phoneNumber}
                onChange={handleChangeValue}
              />
            </div>
          </fieldset>
          {/* follower and sub */}
          <div className="col-md-3 follower_sub">
            <span className="heading">Folowers</span>
            {user.followers.map((item) => (
              <div key={item._id}>
                <img src={item.profilePicture} alt="avatar_user" width={30} />
                <small style={{ paddingLeft: "10px" }}>{item.username}</small>
              </div>
            ))}
          </div>
          <div className="col-md-3 follower_sub">
            <span className="heading">Subscribes</span>
            {user.subscribes.map((item) => (
              <div key={item._id}>
                <img src={item.profilePicture} alt="avatar_user" width={30} />
                <small style={{ paddingLeft: "10px" }}>{item.username}</small>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* checkbox roles */}
          <div className="mb-3 row pt-4">
            <label className="form-label col-md-1 heading">Roles </label>
            <div className="col-md-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="expertRoleCheckbox"
                value="expert"
                checked={userData.roles === "expert"}
                onChange={handleChangeValue}
                name="roles"
              />
              <label htmlFor="expertRoleCheckbox">Expert</label>
            </div>
            <div className="col-md-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="userRoleCheckbox"
                value="user"
                checked={userData.roles === "user"}
                onChange={handleChangeValue}
                name="roles"
              />
              <label htmlFor="userRoleCheckbox">User</label>
            </div>
          </div>
          {/* warning */}
          <div className="mb-3">
            <label htmlFor="descTextInput" className="form-label heading">
              Warning !
            </label>
            <textarea
              col={30}
              rows={4}
              type="text"
              id="descTextInput"
              className="form-control"
              value={userData.desc}
              onChange={handleChangeValue}
              name="desc"
            />
          </div>
        </div>
        <button className="btn btn-success w-100 mt-2" type="submit">
          Cập nhật
        </button>
        <button
          className="btn btn-danger w-100 mt-2"
          onClick={handleDeleteUser}
        >
          Xoá
        </button>
      </form>
    </div>
  );
};

export default UserInfor;
