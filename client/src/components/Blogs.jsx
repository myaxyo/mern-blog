import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';
import Box from '@mui/material/Box';

const Blogs = () => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  const [isLoaded, setIsLoaded] = useState(true);
  const [blogs, setBlogs] = useState();
  const blogRequest = async () => {
    const res = await axios
      .get('http://geekzone.uz/api/blog')
      .catch((err) => console.log(err));
    const data = await res.data;
    setIsLoaded(false);
    return data;
  };
  useEffect(() => {
    blogRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {isLoaded ? (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <FadeLoader
            color="green"
            css={override}
            height="25px"
            width="8px"
            margin="18px"
            radius="3px"
          />
        </Box>
      ) : (
        <div>
          {blogs &&
            blogs.map((blog, index) => (
              <Blog
                key={index}
                id={blog._id}
                isUser={localStorage.getItem('userId') === blog.user._id}
                title={blog.title}
                description={blog.description}
                imageURL={blog.image}
                userName={blog.user.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
