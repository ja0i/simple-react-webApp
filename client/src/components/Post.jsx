import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../redux.jsx';
import { useParams, Link, useLocation } from 'react-router-dom';
import './Post.css';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost } = useSelector((state) => state.posts);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="back-arrow">←</Link>
        <h1 className="page-title">Post</h1>
      </header>

      {currentPost ? (
        <article className="post-content">
          <div className="post-header">
            <h2 className="post-title">{currentPost.title}</h2>
            <span className="post-user-id">@user-{currentPost.userId}</span>
          </div>
          <p className="post-body">{currentPost.body}</p>
        </article>
      ) : (
        <p className="loading-text">Loading post...</p>
      )}
    </div>
  );
}