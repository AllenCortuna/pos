import { RiLogoutBoxRFill,RiMoneyDollarCircleFill } from "react-icons/ri";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillGridFill, BsFillShieldLockFill } from "react-icons/bs";
import { SiGridsome } from "react-icons/si";
import { FaUserTag,FaMoneyCheckAlt } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { userStore } from "../../zustand/user";

const Navbar = () => {
  const curUsr = userStore((state) => state.curUsr);
  const setCurUsr = userStore((state) => state.setCurUsr);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const profile = localStorage.getItem("profile");
    if (admin) {
      setCurUsr("admin");
    }
    if (profile) {
      setCurUsr("profile");
    }
  }, [curUsr, setCurUsr]);
  return (
    <div className="grid grid-cols-1 place-content-start gap-4 w-14 md:w-48 min-w-40 max-w-52 h-screen bg-zinc-800 ml-0 mr-auto py-5 px-2">
      <h4 className="text-lg text-white text-xl font-bold mt-4 mb-3 hidden md:block">
        Gasoline POS
      </h4>
      {/* content navbar */}
      <Content icon={<MdSpaceDashboard />} name={"Dashboard"} link={"/"} />
      <Content icon={<FaUserTag />} name={"Invoice"} link={"/invoice"} />
      <Content icon={<BsFillGridFill />} name={"Goods"} link={"/good"} />
      <Content icon={<SiGridsome />} name={"Incoming"} link={"/incoming"} />
      <Content icon={<FaMoneyCheckAlt />} name={"Expense"} link={"/expense"} />
      <Content icon={<RiMoneyDollarCircleFill />} name={"Drawer"} link={"/drawer"} />
      <Content icon={<RiMoneyDollarCircleFill />} name={"History"} link={"/history"} />
      <Content icon={<BsFillShieldLockFill />} name={"Profile"} link={"/setting"} />
      {curUsr && (
        <Content icon={<RiLogoutBoxRFill />} name={"Logout"} link={"/logout"} />
      )}
    </div>
  );
};

export default Navbar;
// content for the navbar
// dito ilalagay link icon at name
export const Content = ({ link, icon, name }) => {
  const query = useLocation();
  const path = query.pathname === link;
  return (
    <Link
      to={link}
      className={`flex truncate justify-start content-center gap-2 text-white text-sm duration-300 transition-all ease-linear hover:bg-amber-200 hover:text-zinc-800 p-2 hover:rounded-lg py-0 hover:py-2 ${
        path && "bg-amber-200 py-2 rounded-lg text-zinc-800 nav"
      }`}
    >
      <span className="mt-[.2rem]">{icon}</span>
      <h4 className="drop-shadow-sm font-semibold capitalize md:block hidden">{name}</h4>
    </Link>
  );
};
