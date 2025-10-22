import { useState } from 'react';
import { Camera, User, Calendar } from 'lucide-react';

export function AddBlog() {
  const [heading, setHeading] = useState('');
  const [image, setImage] = useState(null);

  // Placeholder for username and date
  const username = 'Admin'; // This will be replaced with logged-in user data
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend submission logic will go here
    console.log({ heading, image, username, currentDate });
    alert('Blog post submitted! (Check console for data)');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-2xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create a New Blog Post
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your knowledge and insights with the community.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="heading" className="sr-only">
                Blog Heading
              </label>
              <input
                id="heading"
                name="heading"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter blog title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-56 object-cover rounded-lg" />
                ) : (
                  <>
                    <Camera className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, or GIF (MAX. 800x400px)</p>
                  </>
                )}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{username}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{currentDate}</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
