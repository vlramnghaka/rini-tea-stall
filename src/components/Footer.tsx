import { NavLink } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill, faUtensils, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const pages = [
    {name: "Home", path:"/", icn: faHouse},
    {name: "Price Calculator", path:"/price-calculator", icn: faMoneyBill},
    {name: "Menu", path:"/menu", icn: faUtensils},
    {name: "FAQ", path: "/faq", icn: faCircleQuestion},
    {name: "Youtubers", path:"/youtubers", icn: faYoutube}
  ];
  
  return (
    <footer>
      <nav className="navbar" lang='en'>
        {pages.map((page, index) => (
        <NavLink to={page.path} key={index} replace>
          <FontAwesomeIcon icon={page.icn} />
          <br />
          <span>{page.name}</span>
        </NavLink>
        ))}
      </nav>
    </footer>
  )
}

export default Footer;