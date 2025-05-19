import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"


const Loading = () => {
  const myStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100%"
  }
  
  
  return (
    <div style={myStyle}>
    <FontAwesomeIcon icon={faSpinner} size="2xl" spin/>
    </div>
  )
}

export default Loading