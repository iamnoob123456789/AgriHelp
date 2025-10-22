const router = require('express').Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
