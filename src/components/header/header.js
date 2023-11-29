import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Header({title, className}) {
  return (
    <div className={`header ${className}`}>
      <h1>{title}</h1>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string
};

export default React.memo(Header);
