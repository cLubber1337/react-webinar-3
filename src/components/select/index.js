import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className={`Select ${props.className}`} value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  },
  className: '',
}

export default memo(Select);