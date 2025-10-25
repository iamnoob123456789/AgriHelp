import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Calendar, User, Clock } from 'lucide-react';

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs');
        setBlogs(data);
      } catch (err) {
        setError('Could not fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full lg:max-w-7xl xl:max-w-full mx-auto text-center px-4 lg:px-12 xl:px-24">
          <div className="flex justify-center mb-4 lg:mb-6">
            <FileText className="h-16 w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">Agriculture Insights</h1>
          <p className="text-xl lg:text-2xl xl:text-3xl max-w-4xl mx-auto opacity-90">
            Discover expert tips, guides, and best practices for modern farming
          </p>
        </div>
      </div>

      <div className="max-w-full lg:max-w-7xl xl:max-w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-12 lg:py-16 xl:py-20">
        <div className="flex flex-col items-center gap-12">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden w-full max-w-4xl md:flex"
            >
              <div className="md:w-1/3">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs lg:text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 lg:text-lg mb-4 flex-grow">{blog.subtitle}</p>
                <div className="flex items-center justify-between text-sm lg:text-base text-gray-500 border-t pt-4 mt-auto">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span>{blog.user.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}