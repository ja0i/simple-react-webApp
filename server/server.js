
const express = require('express');
const axios = require('axios');
const app = express();

// Route: Get all posts
app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route: Get single post by ID
app.get('/data/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.listen(5000, () => {
  console.log('server started on port 5000');
});
