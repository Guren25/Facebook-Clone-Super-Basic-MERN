import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, fetchPosts } from '../features/posts/postsSlice';
import { Button, Form, Spinner } from 'react-bootstrap';
import './styles/AddPostForm.css'; 

const AddPostForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImgPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('user', user._id);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await dispatch(addPost(formData));
      setDescription('');
      setImages([]);
      setImgPreviews([]);
      dispatch(fetchPosts());
      closeModal();
    } catch (error) {
      console.error("Failed to add post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-post-form">
      <div className="mb-3">
        {imgPreviews.length > 0 ? (
          <div className="d-flex flex-wrap">
            {imgPreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className="img-thumbnail image-preview"
              />
            ))}
          </div>
        ) : (
          <div className="no-images">
            <span>No Images</span>
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            multiple
            required
            aria-describedby="imageHelp"
          />
          <Form.Text id="imageHelp" muted>
            You can upload multiple images. Each image should be less than 5MB.
          </Form.Text>
        </Form.Group>
        <Button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading && <Spinner animation="border" size="sm" className="submit-btn-spinner" />}
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;