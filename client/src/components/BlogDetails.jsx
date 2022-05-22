import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';

const BlogDetails = () => {
  const navigate = useNavigate()
  const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };
  const [blog, setBlog] = useState([]);
  const blogId = useParams().id;
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageURL: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `http://geekzone.uz/api/blog/${blogId}`
      ).catch((err) => console.log(err));
      const data = await res.data;

      {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          imageURL: data.blog.image,
        });
      }
    };
    fetchData();
  }, [blogId]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://geekzone.uz/api/blog/update/${blogId}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data)).then(() => navigate('/my-blogs'));
  };
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="green"
            borderRadius={10}
            boxShadow="10px 10px 20px #cccs"
            padding={3}
            margin={'auto'}
            marginTop={3}
            display="flex"
            flexDirection={'column'}
            width={'80%'}
          >
            <Typography
              fontWeight={'bold'}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={'center'}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type={'submit'}
            >
              Add Post
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
