import { BiGroup } from "react-icons/bi";

const StatCard = ({ color, value, label }) => {
  return (
    <div
      className={`min-w-full h-28 mx-auto flex items-center justify-center ${color} text-white shadow gap-4`}
      style={{ borderRadius: "15px" }}
    >
      <div className="flex items-center justify-center">
        <BiGroup className="w-12 h-12 bg-white rounded-2xl text-[#6148FF] p-1" />
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-normal font-inter">{value}</p>
        <h1 className="text-lg font-semibold font-montserrat">{label}</h1>
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
