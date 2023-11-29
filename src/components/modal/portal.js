import React from "react";
import {createPortal} from 'react-dom'
import PropTypes from "prop-types";


export const Portal = ({ children, element = document.body }) => {
  return createPortal(children, element)
}


Portal.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.instanceOf(Element)
};