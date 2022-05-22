import React from 'react';
import './style.css';
import {
  Header,
  Auth,
  Blogs,
  AddBlog,
  BlogDetails,
  UserBlogs,
} from './components';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/my-blogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}
