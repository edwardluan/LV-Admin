import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERS_LOADING, getUsers } from "../redux/actions/usersAction";
import UserInfor from "../component/users/UserInfor";

const UsersPage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const auth = useSelector((state) => state.auth);
  const loadingUser = useSelector((state) => state.users.loadingUser);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user._id.toLowerCase().includes(filterValue) ||
        user.username.toLowerCase().includes(filterValue) ||
        user.phoneNumber.toLowerCase().includes(filterValue) ||
        user.roles.toLowerCase().includes(filterValue)
      );
    });
    setFilteredUsers(filteredUsers);
  };

  const handleGetUser = (user) => {
    dispatch({ type: USERS_LOADING.LOADING_USER, payload: true });
    dispatch({ type: USERS_LOADING.GET_USER, payload: user });
  };

  useEffect(() => {
    if (users.length === 0) dispatch(getUsers({ auth }));
  }, [users.length, dispatch, auth]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="users">
      {loadingUser && <UserInfor />}
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
            <th>ID</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Fol</th>
            <th>Sub</th>
            <th>Saved</th>
            <th>Roles</th>
            <th>Create</th>
            <th>Update</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.followers.length}</td>
                <td>{user.subscribes.length}</td>
                <td>{user.saved.length}</td>
                <td>{user.roles}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td onClick={() => handleGetUser(user)}>Xem</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
