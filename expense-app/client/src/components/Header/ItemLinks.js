import "./ItemLinks.scss";
import { NavLink } from "react-router-dom";

const ItemLinks = ({ url, children }) => {
  return (
    <li className="text-2xl font-bold">
      <NavLink to={`/${url}`} className="text-white hover:text-sky-400">
        {children}
      </NavLink>
    </li>
  );
};
export default ItemLinks;
