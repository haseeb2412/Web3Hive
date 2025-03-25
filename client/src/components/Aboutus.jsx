import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { AiFillCode } from "react-icons/ai";
import { FaReact } from "react-icons/fa";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-col justify-center items-center white-glassmorphism p-4 m-2 cursor-pointer hover:shadow-xl w-[800px]  text-center">
    <div className={`w-12 h-12 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <h3 className="mt-3 text-white text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-white text-sm w-11/12">{subtitle}</p>
  </div>
);

  
const Aboutus = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            About Me
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            I’m Haseeb, a passionate Software Engineer with experience in
            building web applications.
          </p>
        </div>

        {/* <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Security gurantee"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Fastest transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
        </div> */}

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Exploring Blockchain"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Learning blockchain technology, smart contracts, and decentralized applications to build future-ready solutions."
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Scalable Web Apps"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Building scalable and high-performance web applications with a strong focus on clean code and best practices."
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="PHP Development"
            icon={<AiFillCode fontSize={21} className="text-white" />}
            subtitle="Working with PHP, SQL, and WordPress to develop secure, dynamic, and efficient backend solutions."
          />
          <ServiceCard
            color="bg-[#16A34A]"
            title="MERN Stack Expertise"
            icon={<FaReact fontSize={21} className="text-white" />}
            subtitle="Developing full-stack applications using React, Node.js, MongoDB, and Express for seamless user experiences."
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
