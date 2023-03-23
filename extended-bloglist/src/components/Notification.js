const Notification = ({ message }) => {

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


  if (!message) {
    return null
  }

  if (message.toLowerCase().includes('error')) {
    return(
      <div style={errorStyle} className="errorStyle">
        {message}
      </div>
    )
  } else {
    return (
      <div style={passStyle} className="passStyle">
        {message}
      </div>
    )
  }
}

export default Notification