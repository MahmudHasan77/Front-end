import React from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";

const SingleBlog = () => {
  const location = useLocation();
  const blog = location.state || {};

  console.log(blog);
  return (
    <div>
      <h1 className=" font-bold text-center my-3">WelCome</h1>
      <div className=" w-full h-60 flex items-center justify-center p-3 my-5">
        <img
          className=" w-full max-h-60 object-contain border border-gray-300"
          src={blog?.image}
        />
      </div>
      <div>
        <h1 className=" font-semibold text-center my-2">{blog?.title}</h1>
        <div
          className=" p-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.description),
          }}
        ></div>
      </div>
    </div>
  );
};

export default SingleBlog;
