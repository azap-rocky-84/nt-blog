import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../constants";
import { logout } from "../store/actions/user";

const NavItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articoli", type: "link", href: "/articles" },
  {
    name: "Team",
    type: "dropdown",
    items: [
      { title: "Chi siamo?", href: "/about" },
      { title: "Entra nella squadra!", href: "/contact" },
    ],
  },
  { name: "Database", type: "link", href: "/database" },
  { name: "FAQ", type: "link", href: "/faq" },
];
const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };
  return (
    <li className="group relative">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="absolute right-0 top-0 cursor-pointer font-bold text-blue-500 opacity-0 transition-all duration-500 group-hover:right-[90%] group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center gap-x-1 px-4 py-2"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
          >
            <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-white">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setprofileDropdown] = useState(false);
  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <section className="sticky left-0 right-0 top-0 z-50 bg-white">
      <header className="container mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/">
          <img className="w-8 sm:w-16" src={images.GreenLogo} alt="logo" />
        </Link>
        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="h-6 w-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="h-6 w-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } fixed bottom-0 top-0 z-[49] mt-[56px] flex w-full flex-col items-center justify-center gap-x-9 bg-dark-hard transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row  lg:justify-end lg:bg-white`}
        >
          <ul className="flex flex-col items-center gap-x-2 gap-y-5 font-semibold text-white lg:flex-row lg:text-dark-soft">
            {NavItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="flex flex-col items-center gap-x-2 gap-y-5 font-semibold text-white lg:flex-row lg:text-dark-soft">
              <div className="group relative">
                <div className="flex flex-col items-center">
                  <button
                    className="mt-5 flex items-center gap-1 rounded-full border-2 border-[#2E8B57] px-6 py-2 font-semibold text-[#2E8B57] transition-all duration-300 hover:bg-[#2E8B57] hover:text-white lg:mt-0"
                    onClick={() => setprofileDropdown(!profileDropdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
                  >
                    <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-white">
                      {userState?.userInfo?.admin && (
                        <button
                          onClick={() => navigate("/admin")}
                          type="button"
                          className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                        >
                          Pagina dell'amministratore
                        </button>
                      )}

                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Profilo
                      </button>
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="mt-5 rounded-full border-2 border-[#2E8B57] px-6 py-2 font-semibold text-[#2E8B57] transition-all duration-300 hover:bg-[#2E8B57] hover:text-white lg:mt-0"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
