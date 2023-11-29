import React from "react";
import {Portal} from "./portal";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./style.css";

export const Modal = ({ children, isOpen }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }

    return () => {
      setIsMounted(false)
    }
  }, [isOpen])

  if (!isMounted) {
    return null
  }

  const isOpenModalClass = isOpen ? 'modal-opened' : ''

  return (
    <Portal>
      <div className={`modal ${isOpenModalClass}`}>
        <div className={"modal-overlay"} />
        <div className={"modal-content"}>{children}</div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};