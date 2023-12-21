import './style.css'
import PropTypes from "prop-types";
import {memo} from "react";


export const Textarea = memo(({id, name, placeholder, required, value, onChange, disabled}) => {
  return <textarea className='textarea'
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   required={required}
                   value={value}
                   onChange={onChange}
                   disabled={disabled}
  ></textarea>
})


Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}