import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "@/Conetxt/TrackingContext";
import { Nav1, Nav2, Nav3 } from "@/Components/index";
import styles from "@/styles/Navigation.module.css"; // Import your CSS module file

const Navigation = () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navigation = [
    { title: "Home", path: "#" },
    { title: "Services", path: "#" },
    { title: "Contact Us", path: "www.youtube.com" },
  ];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll); // Remove scroll event listener on component unmount
    };
  }, []);

  const handleClickOutside = (e) => {
    const target = e.target;
    if (!target.closest(".menu-btn")) setState(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setState(!state);
  };

  const handleScroll = () => {
    console.log("Scrolling...");
    console.log("Page Offset:", window.pageYOffset);
    if (window.pageYOffset > 0) {
      setState(true);
    } else {
      setState(false);
    }
  };

  return (
    <nav
      className={`${styles.nav} ${
        state ? styles.fixedNav : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="http://localhost:3000/">
            <img
              src="https://www.shutterstock.com/image-illustration/supply-chain-concept-image-text-260nw-1776514838.jpg"
              width={120}
              height={50}
              alt="Food Supply Chain"
            />
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={handleButtonClick}
            >
              {state ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-gray-700 hover:text-gray-900">
                <a href={item.path} className="block">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 ">
            {currentUser ? (
              <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                {currentUser.slice(0, 25)}..
              </p>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Connect Wallet
                <Nav3 />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
