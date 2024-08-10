import { useState, useContext } from 'react'
import { GlobalStateContext } from './components/state/State';
import NavBar from './components/nav/Nav';
import 'animate.css'


function App() {
  const [ModalOpen, setModalOpen] = useState(false);
  const {state, dispatch} = useContext(GlobalStateContext);

  return (
    <> 
     <NavBar/>
    </>
  )
}

export default App
