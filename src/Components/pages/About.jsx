import React from "react";
import Title from "../Ui/Title";

const About = () => {
  return (
    <div>
      <div>
        <img
          className=" w-full h-auto object-contain"
          src="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755013870/download_12_yu7eio.jpg"
          alt="about us image"
        />
      </div>
      <div>
        <h1 className=" font-bold text-center">
          I am Mahmud Hasan a web developer{" "}
        </h1>
        <p className=" text-sm text-gray-700 p-5">
          Are you looking for a skilled full stack developer to build or rebuild
          a functional custom website that drives your business forward?
        </p>
        <h1 className=" p-5">
          I'm a Full Stack Web Developer specializing in turning complex ideas
          into smooth, high-performing web experiences using the modern tech
          stack.
        </h1>
        <h1 className=" p-5">
          I use in Front-end HTML CSS TailwindCss bootstrap5 JavaScript React
          JQuery and others packages
        </h1>
        <h1 className=" p-5">
          I use in back-end Node.js express.js MongoDB Mongoose and others
          packages
        </h1>
      </div>
    </div>
  );
};

export default About;
