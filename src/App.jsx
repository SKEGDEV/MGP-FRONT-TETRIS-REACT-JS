import NavBar from './components/nav/Nav';
import GameBoard from './components/GameBoard/GameBoard';
import 'animate.css'
import soundtrack from './assets/soundtrack.mp3';

function App() {

  return (
    <div> 
     <NavBar/>
     <GameBoard />
     <audio src={soundtrack} autoPlay={false} loop={true}/>
    </div>
  )
}

export default App
