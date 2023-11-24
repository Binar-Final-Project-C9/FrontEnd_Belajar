import React from "react";
import { BiGroup } from "react-icons/bi";

const StatCard = ({ color, value, label }) => {
  return (
    <div
      className={`min-w-full h-32 mx-auto flex items-center justify-center ${color} text-white rounded-lg shadow gap-8`}>
      <div className="flex items-center justify-center">
        <BiGroup className="w-14 h-14 bg-white rounded-3xl text-[#6148FF] p-1" />
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-normal">{value}</p>
        <h1 className="text-xl font-bold">{label}</h1>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
      <StatCard color="bg-light-blue" value="450" label="Active Users" />
      <StatCard color="bg-dark-green" value="25" label="Active Class" />
      <StatCard color="bg-dark-blue" value="20" label="Premium Class" />
    </div>
  );
};

export default Card;
