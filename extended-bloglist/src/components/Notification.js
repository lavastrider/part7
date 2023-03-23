import { useSelector } from 'react-redux'

const Notification = () => {

  const notific = useSelector(state => state.notification)
  console.log(notific, 'is notific in notification component')

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const passStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }


  if (!notific) {
    return null
  }

  if (notific.toLowerCase().includes('error')) {
    return(
      <div style={errorStyle} className="errorStyle">
        {notific}
      </div>
    )
  } else {
    return (
      <div style={passStyle} className="passStyle">
        {notific}
      </div>
    )
  }
}

export default Notification