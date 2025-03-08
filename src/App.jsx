import 'animate.css'
import BaseGame from './components/base/Base';
import './index.scss';
import { useContext, useEffect } from 'react';
import { GlobalStateContext } from './components/state/State';

function App() {
  const {state, dispatch} = useContext(GlobalStateContext);

  useEffect(()=>{
    localStorage.setItem('skin', state?.skin);
  },[state?.skin])
  return (
    <div className='container'> 
     <BaseGame/>
    </div>
  )
}

export default App
