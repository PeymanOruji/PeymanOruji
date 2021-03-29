import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

function Header({ title, showAddTask, showAdd }) {
  const location = useLocation();

  return (
    <header className="header">
      <h1> {title} </h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? " gray" : "green"}
          onClick={showAddTask}
          text={!showAdd ? "Add Task" : "Close"}
        />
      )}
    </header>
  );
}

//css in JS
// const headingStyles={
//  color:"blue",
//  backgroundColor:"gray"
// }

Header.defaultProps = {
  title: "Hello",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
