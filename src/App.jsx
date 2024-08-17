import { useState, useContext } from 'react'
import { GlobalStateContext } from './components/state/State';
import NavBar from './components/nav/Nav';
import GameBoard from './components/GameBoard/GameBoard';
import 'animate.css'
import Modal from './components/modal/Modal';
import LayoutModal from './components/modalLayout/Layout';
import Button from './components/button/Button';
import TextField from './components/textField/TextField';

function App() {
  const [ModalOpen, setModalOpen] = useState(false);
  const {state, dispatch} = useContext(GlobalStateContext);

  return (
    <div> 
     <NavBar/>
     <GameBoard />
    </div>
  )
}

const ModalPlayer = (props)=>{

}

export default App
