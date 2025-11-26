import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

const blogs = [
  {
    title: "Blog 1",
    author: "Author 1",
    likes: 120,
    comments: 30,
  },
  {
    title: "Blog 2",

    author: "Author 2",
    likes: 95,
    comments: 12,
  },
  {
    title: "Blog 3",
    author: "Author 3",
    likes: 150,
    comments: 45,
  },
];

const PopularBlogs = () => {
  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>

      <ul>
        {blogs.map((blog, idx) => (
          <li key={idx} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>

            <span className="text-gray-600">Published by {blog.author}</span>

            <div className="flex items-center mt-2">
              <MessageCircle size={16} />

              <span className="text-gray-500 mr-5 ml-1">{blog.likes}</span>

              <ThumbsUp size={16} />

              <span className="text-gray-500 mr-2 ml-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
