import styles from './Modal.module.scss';
import Button from '../button/Button';
import { introAnimation, outroAnimation } from '../../constant/animateConstant';
import { useState, useEffect } from 'react';

const Modal = ({modalState, isOpen, children})=>{
  const [animation, setAnimation] = useState('');

  const closeModal = ()=>{
    setAnimation(outroAnimation.bounceDownOut);
    setTimeout(()=>{modalState(false); setAnimation('');}, 700)
  }

  useEffect(()=>{
    if(isOpen){
      setAnimation(introAnimation.bounceUpIn);
    }
  },[isOpen]);

  return(
    <div style={isOpen === false ? {display:'none'}: {display:'flex'} }
     className={styles.modal_bg}> 
      <div className={`${styles.modal_content} ${animation}`}>
       <Button onClick={closeModal} variant="close"/>
       {children}
      </div>
    </div>
  );
}

export default Modal;
