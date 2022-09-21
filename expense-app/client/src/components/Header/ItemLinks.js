import { NavLink } from "react-router-dom";
import { ThemeProvider, Tooltip } from "@material-tailwind/react";

import "./ItemLinks.scss";

const ItemLinks = ({ url, children, itemName, tooltips }) => {
  const customTheme = {
    tooltip: {
      styles: {
        base: {
          bg: "bg-[#ae8cfa]",
        },
      },
    },
  };

  return (
    <li className="text-2xl font-bold">
      <ThemeProvider value={customTheme}>
        <Tooltip
          className="2xl:hidden"
          content={tooltips}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="top-start"
        >
          <NavLink
            to={`/${url}`}
            className={`text-white hover:text-sky-400 flex items-center nav-link ${itemName}`}
          >
            {children}
          </NavLink>
        </Tooltip>
      </ThemeProvider>
    </li>
  );
};
export default ItemLinks;
