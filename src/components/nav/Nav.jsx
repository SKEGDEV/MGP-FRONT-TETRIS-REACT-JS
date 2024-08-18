import logo from '../../assets/logo.png';
import styles from './Nav.module.scss';
import { GrProjects } from "react-icons/gr";
import { MdOutlineDeveloperMode, MdVideogameAsset, MdMore } from "react-icons/md";
import { IoPersonAddSharp  } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Modal from '../modal/Modal';
import LayoutModal from '../modalLayout/Layout';
import TextField from '../textField/TextField';
import Social from '../SocialBottom/Social';
import { useState, useContext } from 'react';
import { GlobalStateContext } from '../state/State';

const NavBar = ()=>{
  const [modalAbout, setModalAbout] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalPlayer, setModalPlayer] = useState(false);
  const {state, dispatch} = useContext(GlobalStateContext);
  const [playerMenu, setPlayerMenu] = useState(false);

  return(
    <div className={styles.nav}>
      <ModalAbout isOpen={modalAbout} modalSet={setModalAbout}/>
      <ModalContact isOpen={modalContact} modalSet={setModalContact}/>
      <ModalForMore/>
      <ModalCreatePlayer isOpen={modalPlayer} modalState={setModalPlayer}/>
      <div className={styles.nav_left}><img src={logo} alt="not found" /> <h1>TETRIS APP</h1> </div>
      <ul className={styles.nav_right}>
        <li onClick={()=>{setModalAbout(true);}}><button><GrProjects/>{`About Project`}</button></li>
        <li onClick={()=>{setModalContact(true);}}><button><MdOutlineDeveloperMode/>{`Contact With Developer`}</button></li>
        <li>
         <button onClick={()=>{setPlayerMenu(!playerMenu);}} className={`${playerMenu? styles.activate:''}`}><MdVideogameAsset/>{`Player`}</button>
         <ul className={styles.players_menu} style={{display:`${playerMenu? 'block': 'none'}`}}>
           {state.players.length > 0 ? <li><button></button></li>:<p>{`Don't exist players please add a new player`}</p>} 
           <li onClick={()=>{setModalPlayer(true);}}><button><IoPersonAddSharp/>{`Add New Player`}</button></li>
         </ul>
        </li>
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

const ModalCreatePlayer = (props)=>{
  const [name, setName] = useState('');
  const {state, dispatch} = useContext(GlobalStateContext);
  const [isExist, setIsExist] = useState(true);

  const onChange = (e)=>{
    setIsExist(existPlayer());
    if(e.target.value.length <= 4){
      setName(e.target.value.toUpperCase());
    }
    return;
  }

  const existPlayer = ()=>{
    let searchExp = new RegExp(`${name}.*`, "i");
    const findText = state.players.filter(item => searchExp.test(item.name))?.name || '';
    return findText == '' ? false:true;
  }

  const onClick = ()=>{ 
    if(existPlayer()){
      return;
    }
    dispatch({type:'CREATE_PLAYER', payload:{name:name, topPoints:0}});
    props.modalState(false);
  }

  const Notify = ()=>{
    return(
      <div className={styles.notify}>
        {isExist ? <IoIosCloseCircle/>:<FaCheckCircle/>}
        <p>{isExist ? 'This player is already exist please enter another name':'This player is available'}</p>
      </div>
    );
  }

  

  return(
    <Modal isOpen={props.isOpen} modalState={props.modalState}>
      <LayoutModal variant='operation' btnTittle='Add Player' btnOnClick={onClick}>
       <Notify/>
       <div style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center"}}>
         <h1 style={{marginBottom:"3dvh"}}>{`ADD NEW PLAYER`}</h1>
         <TextField placeholder='Enter your player name' value={name} onChange={onChange}/>
       </div>
      </LayoutModal>
    </Modal>
  );
}

export default NavBar;
