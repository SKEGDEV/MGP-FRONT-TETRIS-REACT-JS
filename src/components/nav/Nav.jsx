import logo from '../../assets/logo.png';
import styles from './Nav.module.scss';
import { GrProjects } from "react-icons/gr";
import { MdOutlineDeveloperMode, MdVideogameAsset, MdMore } from "react-icons/md";
import Modal from '../modal/Modal';
import LayoutModal from '../modalLayout/Layout';
import Social from '../SocialBottom/Social';
import { useState } from 'react';

const NavBar = ()=>{
  const [modalAbout, setModalAbout] = useState(false);
  const [modalContact, setModalContact] = useState(false);

  return(
    <div className={styles.nav}>
      <ModalAbout isOpen={modalAbout} modalSet={setModalAbout}/>
      <ModalContact isOpen={modalContact} modalSet={setModalContact}/>
      <ModalForMore/>
      <div className={styles.nav_left}><img src={logo} alt="not found" /> <h1>TETRIS APP</h1> </div>
      <ul className={styles.nav_right}>
        <li onClick={()=>{setModalAbout(true);}}><button><GrProjects/>{`About Project`}</button></li>
        <li onClick={()=>{setModalContact(true);}}><button><MdOutlineDeveloperMode/>{`Contact With Developer`}</button></li>
        <li><button><MdVideogameAsset/>{`Player`}</button></li>
        <li><button><MdMore/> {`For More`}</button></li>
      </ul>
    </div>
  );
}

const ModalAbout = (props)=>{

  return(
    <Modal isOpen={props.isOpen} modalState={props.modalSet}>
     <LayoutModal>
       <div style={{width:"100%", padding:"1dvh",display:"flex", overflowY:"scroll", flexDirection:"column", alignItems:"center", scrollbarWidth:"none"}}>
         <div style={{marginBottom:"3dvh"}}>
           <h1>{`TETRIS PROJECT`}</h1>
         </div>
         <div style={{marginBottom:"3dvh"}}>
           <p style={{textAlign:"justify"}}>
            {`Welcome! this game is part of my professional portfolio, i'm Eduardo Gonzalez junior developer with 3 years of experience.`}
            <br />
            <br /> 
            {`I did this project for a challenge that i saw on a youtube for the youtuber and senior developer Midu dev, i saw how he did this 
	      technical test for a job as developer for $250k/year and for challenge me i want do this challenge within the stipulated
	      time for the test that 40 minutes, i don't know if i can but i'll try it.`}
            <br/>
            <br/>
            {`If you want to see if i succeeded, here is the video from my YouTube Channel`}
            
           </p>
         </div>
         <div style={{marginBottom:"3dvh"}}><iframe width="560" height="315" src="https://www.youtube.com/embed/6hzrDeceEKc"></iframe></div>
         <div style={{marginBottom:"3dvh"}}>
           <p>{`If you like my work and want get to know more about me this it's my social information, it will be a pleasure to chat with you`}</p>
         </div>
         <Social/>
       </div>
     </LayoutModal>
    </Modal>
  );

}

const ModalContact = (props)=>{
  return(
    <Modal isOpen={props.isOpen} modalState={props.modalSet}>

    </Modal>
  );
}

const ModalForMore = (props)=>{
  return(
    <Modal isOpen={false}>

    </Modal>
  )
}

export default NavBar;
