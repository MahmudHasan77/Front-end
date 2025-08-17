import React, { useEffect } from 'react'
import Container from './Container'
import Title from './Ui/Title'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import  AOS  from 'aos';

const shops  = [
  {
    title:'Accessories',
    link:'/shop',
  },
  {
    title:'Cloths',
    link:'/shop'
  },
  {
    title:'Electronic',
    link:'/shop'
  },
  {
    title:'Home appliances',
    link:'/shop'
  }
]


const accounts = [
  { title: " Profile", link: "/personal/profile" },
  { title: "Orders", link: "/personal/order" },
  { title: "Addresses", link: "/personal/profile" },
  { title: "Privacy", link: "/personal/profile" },
];

const Footer = () => {
  useEffect(() => {
    AOS.init()
  },[])
  return (
    <div className={"bg-gray-900 text-white p-2"} data-aos="zoom-in-up">
      <Container
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 "}
      >
        <div className={"w-full "}>
          <Title className={"py-3 text-center capitalize"}>
            more about our shopping
          </Title>
          <p className={"text-center"}>
            Our broadcasts are prohibited from releasing videos of any
            unofficial and banned religious, political or military party. Legal
            action will be taken if identified.
          </p>
          <div className={"flex justify-center p-5 gap-5 "}>
            <a
              data-aos="fade-right"
              data-aos-offset="3"
              data-aos-easing="ease-in-sine"
              href={"https://web.facebook.com/mhmd.mhmwd.hsn.460051"}
              target="blank"
              className={" hover:bg-gray-950 rounded-full border p-2 "}
            >
              <FaFacebookF />
            </a>
            <a
              href={"https://www.twitter.com "}
              target="blank"
              className={" hover:bg-gray-950 rounded-full border p-2 "}
            >
              <FaTwitter />
            </a>
            <a
              data-aos="fade-left"
              data-aos-offset="3"
              data-aos-easing="ease-in-sine"
              href={"https://www.youtube.com  "}
              target="blank"
              className={` hover:bg-gray-950 rounded-full border p-2`}
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className={"flex py-3 gap-5 justify-around"}>
          <div className={" "}>
            <Title> Our Shops </Title>
            {shops.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={
                  "grid text-white/50 hover:text-white duration-300 hover:underline"
                }
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div>
            <Title>Accounts</Title>
            {accounts.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={
                  "grid text-white/50 hover:text-white hover:underline duration-300"
                }
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="m-auto">
          <Title className={"py-3"}>Subscribe to our newsletter.</Title>
          <p className={"p-3"}>Our broadcasts are prohibited</p>
          <input
            placeholder=" insert our email.."
            className={
              "bg-white/20 outline-none border-b placeholder:text-white/75 "
            }
          ></input>
          <button className=" cursor-pointerm-3 w-20 h-7  duration-500 hover:border hover:bg-white/50  ">
            submit
          </button>
          <img
            src={
              "https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755019479/images_ttjvsz.png"
            }
            className="w-60 p-4 m-auto "
          />
        </div>
      </Container>
    </div>
  );
}

export default Footer
