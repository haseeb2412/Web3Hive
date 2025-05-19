import React, { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/Transactioncontext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// import logo from "../../images/logo.png";
import logo from "../../images/logo23.png";

const NavBarItem = ({ title, link, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <Link target="_blank" to={link} className="text-white hover:underline">
      {title}
    </Link>
  </li>
);

const navItems = [
  { title: "Home", link: "/" },
  { title: "LinkedIn", link: "https://www.linkedin.com/in/muhammad-haseeb-a335772a7/" },
  { title: "About Us", link: "/about" },
  { title: "Docs", link: "https://book.getfoundry.sh/" },
];

const Navbar = () => {
  const [toggleMenu, settoggleMenu] = useState(false);

  const {
    connectWallet,
    currentAccount,
    setCurrentAccount,
    handleWalletConnection,
  } = useContext(TransactionContext);

  const navigate = useNavigate();

  const logoutWallet = () => {
    setCurrentAccount(""); 
    localStorage.removeItem("walletAddress"); 
    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 fixed">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item, index) => (
          <NavBarItem key={index} title={item.title} link={item.link} />
        ))}
        <li
          className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          onClick={currentAccount ? logoutWallet : handleWalletConnection}
        >
          {currentAccount ? "Logout" : "Login"}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => settoggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => settoggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => settoggleMenu(false)} />
            </li>
            {navItems.map(
              (item, index) => (
                <NavBarItem
                  key={index}
                  title={item.title}
                  link={item.link}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
