import {Link} from "react-router-dom";
import {useTrans} from "../../translation/useTrans";
import PropTypes from "prop-types";
import './style.css'


export const Navbar = ({navigation, resetCurrentPage}) => {
  const {trans} = useTrans()

  return <nav className={'navbar'}>
    <ul className={'navbar-list'}>
      {navigation.map(link => (
        <li className={'navbar-item'} key={link.path}>
          <Link className={'navbar-item-link'}
                to={link.path}
                onClick={resetCurrentPage}
          >
            {trans(link.title)}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
}


Navbar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  resetCurrentPage: PropTypes.func
};


