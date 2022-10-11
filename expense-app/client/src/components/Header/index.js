import React, { useState, useEffect, useContext } from "react";
import ItemLinks from "./ItemLinks";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { MdLogout } from "react-icons/md";

// COMPONENTS
import { useExpenseContext } from "../../contexts/ExpenseContext";
import AuthContext from "../../contexts/AuthState/AuthContext";
import expenseAppService from "../../services/expenseAppService";
import AddingForm from "../AddingForm";

// STYLE
import "./Header.scss";
import actionCreator from "../../utils/actionCreator";
import { LOG_OUT } from "../../contexts/type";

const Header = () => {
  const { open, isEdited, balance, handleOpen } = useExpenseContext();
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  // console.log(state);

  const onLogoutHandler = () => {
    dispatch(actionCreator(LOG_OUT, null));
  };

  const { openNav, setOpenNav } = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 680 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-2 md\:mb-4 mt-2 md\:mt-2 flex gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-8 nav-list justify-around">
      <ItemLinks url="./" itemName="home" tooltips="Homepage">
        <p className="hidden 2xl:inline-block">Homepage</p>
        <img
          alt="Homepage"
          className="w-8 sm:w-10 xl:w-12 2xl:hidden nav-icon"
          src="./icons/home-icon.png"
        ></img>
      </ItemLinks>
      <ItemLinks
        url="categories"
        itemName="categories"
        tooltips="Categories Page"
      >
        <p className="hidden 2xl:inline-block">Categories</p>
        <img
          alt="Categories"
          className="w-8 sm:w-10 xl:w-12 2xl:hidden nav-icon"
          src="./icons/categories-icon.png"
        ></img>
      </ItemLinks>
      <ItemLinks
        url="transactions"
        itemName="transactions"
        tooltips="Transactions Page"
      >
        <p className="hidden 2xl:inline-block">Transactions</p>
        <img
          alt="Transactions"
          className="w-8 sm:w-10 xl:w-12 2xl:hidden nav-icon"
          src="./icons/transaction-icon.png"
        ></img>
      </ItemLinks>
      <ItemLinks url="wallets" itemName="wallets" tooltips="Wallets Page">
        <p className="hidden 2xl:inline-block">Wallets</p>
        <img
          alt="Wallets Page"
          className="w-8 sm:w-10 xl:w-12 2xl:hidden nav-icon"
          src="./icons/wallet-icon.png"
        ></img>
      </ItemLinks>
      {isAuthenticated && (
        <ItemLinks url="login" itemName="login" tooltips="LogIn">
          <p className="hidden 2xl:inline-block">Login</p>
          <img
            alt="Login"
            className="w-8 sm:w-10 xl:w-12 2xl:hidden nav-icon"
            src="./icons/login-icon.png"
          ></img>
        </ItemLinks>
      )}
    </ul>
  );

  return (
    <>
      <Navbar
        className="mx-auto py-2 px-4 md:px-8 md:py-4 nav-container fixed z-50"
        color="indigo"
        shadow="true"
        fullWidth="true"
      >
        <div className="container mx-auto flex items-center justify-between ">
          <div className="hidden md:block">{navList}</div>
          <div className="hidden nav-container_logo w-full md:w-2/5 md:flex items-center md:justify-end md:gap-2 lg:gap-6">
            <div className="flex flex-wrap justify-around items-center gap-4">
              <div className="flex flex-col items-end">
                <p>{user}</p>
                {/*  <p className="text-sm md:text-base lg:text-lg text-white">
                  Balance:&nbsp;
                </p> */}
                <p className="balance">
                  {expenseAppService.convertCurrency(balance, "USD")}
                </p>
              </div>
              <IconButton
                className="btn-add-expense"
                ripple={true}
                size="lg"
                onClick={handleOpen}
              >
                <span>+</span>
              </IconButton>
            </div>
          </div>
          {/* <IconButton
            variant="text"
            className="md:hidden ml-auto h-6 w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-8"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton> */}
        </div>
        <MobileNav
          open={openNav ? true : false}
          className="sm:flex md:hidden transition-all duration-300 items-baseline justify-center mobile-nav"
        >
          {navList}
        </MobileNav>
        <AddingForm open={open} handleOpen={handleOpen} isEdited={isEdited} />
      </Navbar>

      <div
        className={`mobile-balance flex flex-wrap justify-between items-center pt-5 md:pt-8 px-4 md:px-8 pb-0 lg:px-20 md:hidden transition-all duration-300`}
      >
        <div className="flex flex-col justify-around items-baseline">
          <p className="text-base text-white">{user}</p>
          <p className="balance">
            {expenseAppService.convertCurrency(balance, "USD")}
          </p>
        </div>
        <IconButton
          className="btn-add-expense"
          ripple={true}
          size="lg"
          onClick={handleOpen}
        >
          <span>+</span>
        </IconButton>
      </div>
    </>
  );
};

export default Header;
