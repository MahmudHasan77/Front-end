import React, { useEffect } from 'react'
import { TbTruck } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import Contaner from './Container';
import Title from './Ui/Title';
import  AOS  from 'aos';
import "aos/dist/aos.css";
const services = [
  {
    title: ' Free delivery ',
    subtitle: 'Free shipping on all order',
    icon:<TbTruck />
      },
  {
    title:'Returns',
    subtitle:'Back guarantee under 7 days ',
    icon: <CiBadgeDollar />
  },
  {
    title:'Support 24/7',
    subtitle:'Support online 24 hours a day',
    icon:<BiSupport />
  },
  {
    title:'Payments ',
    subtitle:'100% payment security',
    icon:<MdPayment />
  }
]

const ServicesTag = () => {

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Contaner
      data-aos="fade-up"
      className={
        "grid md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center bg-gray-50 p-15 animatedTextColor "
      }
    >
      {services.map((item, index) => {
        return (
          <div
            key={index}
            className={"flex gap-3 items-center"}
            data-aos="fade-up"
          >
            <span className={"text-3xl md:text-4xl lg:text-5xl text-blue-600 "} data-aos="fade-right">
              {item.icon}
            </span>
            <div>
              <Title>{item.title}</Title>
              <p className={"text-sm font-medium max-w-[150px] tracking-wide"}>
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </Contaner>
  );
}

export default ServicesTag
