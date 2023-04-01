import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const textStyle = {
  fontFamily: 'Tillana'
}

const Notification = () => {

  const notific = useSelector(state => state.notification)
  //console.log(notific, 'is notific in notification component')


  if (!notific) {
    return null
  }

  if (notific.toLowerCase().includes('error')) {
    return(
      <div className="container" style={textStyle}>
        <Alert variant="danger">
          {notific}
        </Alert>
      </div>
    )
  } else {
    return (
      <div className="container" style={textStyle}>
        <Alert variant="success">
          {notific}
        </Alert>
      </div>
    )
  }
}

export default Notification