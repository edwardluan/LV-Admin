import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/postsAction";
import { getUsers } from "../redux/actions/usersAction";
import { getReports } from "../redux/actions/reportAction";
import moment from "moment";

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getPosts({ auth }));
    dispatch(getUsers({ auth }));
    dispatch(getReports({ auth }));
  }, [auth, dispatch]);

  return (
    <div className="home_page w-100">
      <div className="row">
        <div className="total_user col-md-3 border_box">
          <h5>Người dùng</h5>
          <span>{users.users.length}</span>
        </div>
        <div className="total_post col-md-3 border_box">
          <h5>Bài viết</h5>
          <span>{posts.posts.length}</span>
        </div>
      </div>
      <div className="row mt-4">
        <div className="new_registration col border_box">
          <h5>Đăng ký mới</h5>
          {users.users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <div key={item._id} className="d-flex my-2">
                <img
                  src={item.profilePicture}
                  alt="profilePicture"
                  className="rounded-circle"
                  height={40}
                  width={40}
                />
                <div style={{marginLeft: "10px"}}>
                  <span className="">{item.username}</span>
                  <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                    {moment(item.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="top_user col border_box">
          <h5>Người dùng nổi bật</h5>
          {users.users
            .sort((a, b) => b.followers.length - a.followers.length)
            .map((item) => (
                <div key={item._id} className="d-flex my-2">
                <img
                  src={item.profilePicture}
                  alt="profilePicture"
                  className="rounded-circle"
                  height={40}
                  width={40}
                />
                <div style={{marginLeft: "10px"}}>
                  <span className="">{item.username}</span>
                  <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                    {item.followers.length} Followers
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="top_post col border_box">
          <h5>Bài viết nổi bật</h5>
          {posts.posts.map((item) => (
            <div key={item._id} className="my-2">
                <span>{item.desc.slice(0, 30)}</span>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                    {item.like.length} Likes
                  </p>
                </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
