import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Blog({
  title,
  description,
  imageURL,
  userName,
  isUser,
  id,
}) {
  console.log(title, isUser);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/my-blogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://geekzone.uz/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'));
  };
  return (
    <div>
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          '&:hover': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleEdit}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForever />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Blog Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
