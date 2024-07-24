import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, fetchPosts } from '../features/posts/postsSlice';

const AddPostForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
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
    const formData = new FormData();
    formData.append('user', user._id);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });

    await dispatch(addPost(formData));
    setDescription('');
    setImages([]);
    setImgPreviews([]);
    closeModal();
    dispatch(fetchPosts());
  };

  return (
    <div>
      <h2>Add Post</h2>
      <div>
        {imgPreviews.length > 0 ? (
          imgPreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Preview"
              style={{
                maxHeight: '100px',
                maxWidth: '100px',
                margin: '10px',
              }}
            />
          ))
        ) : (
          <div
            style={{
              width: '200px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px',
              marginBottom: '10px',
              border: '1px solid black',
            }}
          >
            <span>No Images</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description: <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Images: <input type="file" onChange={handleImageChange} multiple required />
          </label>
        </div>
        <div>
          <button type="submit">Add Post</button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
