import React, { useState, useEffect } from "react";
import ItemLinks from "./ItemLinks";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useExpenseContext } from "../../contexts/ExpenseContext";
import expenseAppService from "../../services";
import AddingForm from "../AddingForm";
import "./Header.scss";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => setOpen(value);
  const { balance, expenseType, transactionList } = useExpenseContext();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 680 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-4">
      <ItemLinks url="">
        <h3 className="text-sm md:text-base lg:text-xl">Home</h3>
      </ItemLinks>
      <ItemLinks url="categories">
        <h3 className="text-sm md:text-base lg:text-xl">Categories</h3>
      </ItemLinks>
      <ItemLinks url="transactions">
        <h3 className="text-sm md:text-base lg:text-xl">Transactions</h3>
      </ItemLinks>
      <ItemLinks url="wallet">
        <h3 className="text-sm md:text-base lg:text-xl">Wallets</h3>
      </ItemLinks>
      <ItemLinks url="logout">
        <h3 className="text-sm md:text-base lg:text-xl">LogIn</h3>
      </ItemLinks>
    </ul>
  );

  return (
    <>
      <Navbar
        className="mx-auto py-2 px-4 md:px-8 md:py-4 nav-container"
        color="indigo"
        shadow="true"
        fullWidth="true"
      >
        <div className="container mx-auto flex items-center justify-between ">
          <div className="hidden md:block">{navList}</div>
          <div className="hidden nav-container_logo w-full md:w-2/5 md:flex items-center md:justify-end md:gap-2 lg:gap-6">
            <div className="flex flex-wrap justify-around items-baseline">
              <h3 className="text-sm md:text-base lg:text-xl">
                Balance:&nbsp;
              </h3>
              <h3 className="balance">
                {expenseAppService.convertCurrency(balance, "USD")}
              </h3>
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
          <IconButton
            variant="text"
            className="md:hidden ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
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
                className="h-6 w-6"
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
          </IconButton>
        </div>
        <MobileNav
          open={openNav}
          className="flex items-baseline justify-between mobile-nav"
        >
          {navList}
          <div className="nav-container_logo sm:w-1/5 flex-col sm:flex-row flex-wrap sm:justify-end"></div>
        </MobileNav>
        <AddingForm open={open} handleOpen={handleOpen} />
      </Navbar>

      <div
        className={`mobile-balance flex flex-wrap justify-between items-center pt-4 md:pt-8 px-4 md:px-8 pb-0 lg:px-20 md:hidden transition-all duration-300 `}
      >
        {/* ${openNav === true ? "swipe-up" : ""} */}
        <div className="flex flex-wrap justify-around items-baseline">
          <h3 className="text-base">Balance:&nbsp;</h3>
          <h3 className="balance">0</h3>
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
