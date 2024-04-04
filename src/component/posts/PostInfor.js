import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  POSTS_LOADING,
  deletePost,
  updatePost,
} from "../../redux/actions/postsAction";

const PostInfor = () => {
  const post = useSelector((state) => state.posts.post);
  const auth = useSelector((state) => state.auth);

  const initialState = {
    desc: "",
    userId: post.user._id,
    id: post._id,
  };

  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);

  const handleClose = () => {
    dispatch({ type: POSTS_LOADING.LOADING_POST, payload: false });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete ?"))
      dispatch(deletePost({ post, auth }));
  };

  const imageShow = (src) => {
    return <img src={src} alt="images" style={{ maxHeight: "200px" }} />;
  };

  const videoShow = (src) => {
    return (
      <video controls src={src} alt="images" style={{ maxHeight: "200px" }} />
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        postData,
        auth,
      })
    );
  };

  return (
    <div className="post_infor">
      <div className="post_infor_container">
        <div className="infor_title_post">
          <h5>Chi tiết bài viết</h5>
          <span onClick={() => handleClose()}>&times;</span>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <td>{post._id}</td>
          </tr>
          <tr>
            <th>Username</th>
            <td>{post.user.username}</td>
          </tr>
          <tr>
            <th>Desc</th>
            <td>{post.desc}</td>
          </tr>
          <tr>
            <th>Pic</th>
            <td className="d-flex justify-content-start align-items-center">
              {post.img.map((item, i) => (
                <div key={i}>
                  {item.url && (
                    <>
                      {item.url.match(/video/i)
                        ? videoShow(item.url)
                        : imageShow(item.url)}
                    </>
                  )}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <th>Hashtag</th>
            <td>{post.hashtag}</td>
          </tr>
          <tr>
            <th>Like</th>
            <td>{post.like.length}</td>
          </tr>
          <tr>
            <th>Cmt</th>
            <td>{post.comments.length}</td>
          </tr>
          <tr>
            <th>Create</th>
            <td>{new Date(post.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Update</th>
            <td>{new Date(post.updatedAt).toLocaleString()}</td>
          </tr>
        </table>
        <form onSubmit={handleSubmit} className="pt-4">
          <label htmlFor="descTextInput" className="form-label">
            Warning !
          </label>
          <textarea
            col={30}
            rows={4}
            type="text"
            id="descTextInput"
            className="form-control"
            value={postData.desc}
            onChange={handleChangeValue}
            name="desc"
          />
          <button className="btn btn-success w-100 mt-2" type="submit">
            Cập nhật
          </button>
        </form>
        <button
          className="btn btn-danger w-100 mt-2"
          type="submit"
          onClick={handleDeletePost}
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default PostInfor;
