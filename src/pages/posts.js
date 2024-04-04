import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_LOADING, getPosts } from "../redux/actions/postsAction";
import PostInfor from "../component/posts/PostInfor";

const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const auth = useSelector((state)=> state.auth)
  const loadingPost = useSelector((state) => state.posts.loadingPost);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleGetPost = (post) => {
    dispatch({ type: POSTS_LOADING.LOADING_POST, payload: true });
    dispatch({ type: POSTS_LOADING.GET_POST, payload: post });
  };

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      return (
        post._id.toLowerCase().includes(filterValue) ||
        post.user.username.toLowerCase().includes(filterValue) ||
        post.desc.toLowerCase().includes(filterValue) ||
        post.hashtag.toLowerCase().includes(filterValue)
      );
    });
    setFilteredPosts(filteredPosts);
  };

  useEffect (() => {
    if(posts.length == 0) dispatch(getPosts({ auth }));
  }, [posts, dispatch])

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <div className="posts">
      {loadingPost && <PostInfor />}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm..."
          onChange={handleFilter}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Desc</th>
            <th>Pic</th>
            <th>Hashtag</th>
            <th>Like</th>
            <th>Cmt</th>
            <th>Create</th>
            <th>Update</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.user.username}</td>
                <td>{post.desc.slice(0, 30)} ...</td>
                <td>{post.img.length}</td>
                <td>{post.hashtag.slice(0, 30)} ...</td>
                <td>{post.like.length}</td>
                <td>{post.comments.length}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>{new Date(post.updatedAt).toLocaleString()}</td>
                <td onClick={() => handleGetPost(post)}>Xem</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
