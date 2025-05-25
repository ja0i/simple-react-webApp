import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, searchPosts } from '../redux.jsx';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchPosts(e.target.value));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Home</h1>
      
      <input type="text" placeholder="Search posts..." onChange={handleSearch} className="search-input"/>

      {status === 'loading' && <p className="loading-text">Loading posts...</p>}
      {status === 'failed' && <p className="error-text">Error: {error}</p>}
      
      <div className="posts-container">
        {items?.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-link">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-preview">{post.body.substring(0, 80)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}