import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Posts.css';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="posts-container">
      <Row>
        {posts.map((post) => (
          <Col key={post._id} md={4} className="mb-4">
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={`http://localhost:5000${post.user.imgUrl}`}
                      alt={post.user.username}
                      className="user-avatar"
                    />
                    <div className="ms-2">
                      <h5>{post.user.name}</h5>
                      <p className="mb-0">@{post.user.username}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/edit/${post._id}`}>
                      <Button variant="link" className="me-2">
                        <FaEdit size={20} />
                      </Button>
                    </Link>
                    <Button variant="link" onClick={() => handleDelete(post._id)}>
                      <FaTrash size={20} />
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.description}</Card.Text>
                <div className="post-images-container">
                  <div className="d-flex flex-wrap">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000/${image}`}
                        alt="Post"
                        className="post-image"
                      />
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
