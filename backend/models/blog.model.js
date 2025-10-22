const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Cloudinary URL
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
