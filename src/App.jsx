import 'animate.css'
import BaseGame from './components/base/Base';
import './index.scss';
import { useContext, useEffect, useRef } from 'react';
import { GlobalStateContext } from './components/state/State';
import {useMotion, useRotation, useKey} from './hooks/useMotion';

function App() {
  const {state, dispatch} = useContext(GlobalStateContext);
  const motion = useMotion();
  const rotation = useRotation();
  const pressKey = useKey();
  const containerRoot =	useRef(null);

  const handleKey = (event)=>{
    if(event.key === 'ArrowLeft'){
      motion(-1, 0);
    }
    if(event.key === 'ArrowRight'){
      motion(1, 0);
    }
    if(event.key === 'ArrowUp'){
      rotation();
    }
    if(event.key === 'ArrowDown'){
      motion(0, 1);
    }
    if(event.key === 'a'){
      pressKey('a');
    }
    if(event.key === 'b'){
      pressKey('b');
    }
  }

  useEffect(()=>{
    localStorage.setItem('skin', state?.skin);
  },[state?.skin])

  useEffect(()=>{
    if(containerRoot.current){
      containerRoot.current.focus();
    }
  },[]);
  return (
    <div className='container' tabIndex={0}  onKeyDown={e=>{handleKey(e);}} ref={containerRoot}> 
     <BaseGame/>
    </div>
  )
}

export default App
