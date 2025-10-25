import { FileText, Calendar, User } from 'lucide-react';

export function Blogs() {
  const blogs = [
    {
  id: 1,
  title: 'Understanding Soil pH and Its Impact on Crop Growth',
  excerpt: 'Learn how soil pH affects nutrient availability and what you can do to optimize it for better yields.',
  content: `Soil pH plays a crucial role in determining the availability of essential nutrients to plants. When the soil is too acidic or too alkaline, certain nutrients become less accessible, which can lead to deficiencies and poor crop growth. Understanding the pH of your soil allows you to make informed decisions about fertilization and amendments.
            Adjusting soil pH can significantly improve plant health and productivity. For acidic soils, adding lime can help raise the pH, while alkaline soils can be treated with sulfur or organic matter to lower the pH. Regular soil testing is essential to monitor changes and ensure that corrective measures are effective over time.
            Maintaining the proper soil pH not only enhances nutrient uptake but also supports beneficial microbial activity in the soil. Healthy microbes contribute to better soil structure, organic matter decomposition, and disease suppression. By managing soil pH, farmers and gardeners can create optimal conditions for sustainable and high-yield crop production.`,
  image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
  author: 'Dr. Sarah Johnson',
  date: '2024-03-15',
  tags: ['Soil Health', 'pH Management', 'Nutrients'],
  readTime: '5 min read'
},

    {
      id: 2,
      title: 'Top 10 Organic Fertilizers for Sustainable Farming',
      excerpt: 'Discover the best organic fertilizers that can improve soil health while maintaining environmental sustainability.',
      content: `Organic fertilizers are a sustainable and eco-friendly alternative to chemical fertilizers, providing essential nutrients to plants while promoting soil health and biodiversity. By using organic fertilizers, farmers can reduce their reliance on synthetic chemicals, minimize environmental pollution, and maintain soil fertility over time.
            Common organic fertilizers include compost, manure, bone meal, fish emulsion, and seaweed extract. These natural sources of nutrients are rich in micronutrients and beneficial microbes, which help improve soil structure and microbial activity. By incorporating organic fertilizers into their farming practices, farmers can create a more sustainable and resilient agricultural system that supports both plant growth and environmental health.`,
      image: 'https://images.pexels.com/photos/6129162/pexels-photo-6129162.jpeg',
      author: 'Mark Thompson',
      date: '2024-03-12',
      tags: ['Organic Farming', 'Fertilizers', 'Sustainability'],
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Early Detection of Plant Diseases: A Complete Guide',
      excerpt: 'Identify common plant diseases early and take preventive measures to protect your crops.',
      image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg',
      author: 'Emily Chen',
      date: '2024-03-10',
      tags: ['Disease Management', 'Plant Health', 'Prevention'],
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Maximizing Crop Yield with Precision Agriculture',
      excerpt: 'Explore how modern technology and data-driven approaches can significantly boost your farm productivity.',
      image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
      author: 'David Kumar',
      date: '2024-03-08',
      tags: ['Precision Agriculture', 'Technology', 'Productivity'],
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Water Conservation Techniques for Modern Farming',
      excerpt: 'Learn effective irrigation methods and water-saving strategies to make your farm more efficient.',
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg',
      author: 'Lisa Martinez',
      date: '2024-03-05',
      tags: ['Irrigation', 'Water Conservation', 'Efficiency'],
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Climate-Smart Agriculture: Adapting to Change',
      excerpt: 'Understand how to adjust your farming practices to cope with changing climate patterns.',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      author: 'Dr. James Wilson',
      date: '2024-03-01',
      tags: ['Climate Change', 'Adaptation', 'Sustainability'],
      readTime: '9 min read'
    }
  ];

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
              key={blog.id}
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
                <p className="text-gray-600 lg:text-lg mb-4 flex-grow">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm lg:text-base text-gray-500 border-t pt-4 mt-auto">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-3 text-sm lg:text-base text-gray-500">{blog.readTime}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}