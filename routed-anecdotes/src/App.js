import { useState } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, Route, Link, useParams,
  useNavigate 
  } from 'react-router-dom'
import { useField } from './hooks/index' 

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  
  return (
    <div>
      <div>
       <Link style={padding} to="/">anecdotes</Link>
       <Link style={padding} to="/create">create new</Link>
       <Link style={padding} to="/about">about</Link>
      </div>
    </div>
  )
}

const AnecSingle = ({ anecdotes }) => {
  const id = useParams().id
  const phrases = anecdotes.find((words) => words.id=== Number(id))
  
  return (
    <div>
      <h2>{phrases.content}</h2>
      <h2>{phrases.phrase}</h2>
      <p>{phrases.author}</p>
      <p>{phrases.info}</p>
    </div>
  )

}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.phrase}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  
  const phrase = useField('anex')
  const authur = useField('author')
  const site = useField('url')
  
  const { resetfield } = useField('clear')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: phrase.value,
      author: authur.value,
      info: site.value,
      votes: 0
    })
    navigate('/')
    props.setNotif(`Success! You added "${phrase.value}" to the list of anecdotes`)
    setTimeout(()=> props.setNotif(''), 5000)
  }
  
  //document.querySelectorAll('input').removeAttribute('resetfield')

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...phrase}/>
        </div>
        <div>
          author
          <input {...authur}/>
        </div>
        <div>
          url for more info
          <input {...site}/>
        </div>
        <button type="submit">create</button>
        <button type="button" 
          onClick={(event)=>{
            event.preventDefault(); 
            resetfield(phrase); 
            console.log('we want the form to clear by calling useField')
            }}>
         reset
        </button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log(anecdote, 'is anecdote in create new')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes}/>
      <p>{notification}</p>
      
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} notif={notification} setNotif={setNotification}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<AnecSingle anecdotes={anecdotes}/>} />
      </Routes>
      
      
      
      
      <Footer />
    </div>
   </Router>
  )
}

export default App