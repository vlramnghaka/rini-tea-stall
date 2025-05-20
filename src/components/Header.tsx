import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const handlePowerClick = () => {
    if(confirm("I apps ka close dawn nia?")){
      window.close();
    }
  }
  return(
    <header>
      <span className="headings" lang="en">Rini Tea Stall</span>
      <div className="quit" onClick={handlePowerClick}><FontAwesomeIcon icon={faPowerOff}/></div>
    </header>
  )
}

export default Header;