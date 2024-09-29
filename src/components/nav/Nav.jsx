import logo from '../../assets/logo.png';
import styles from './Nav.module.scss';
import { GrProjects } from "react-icons/gr";
import { MdOutlineDeveloperMode, MdVideogameAsset, MdMore } from "react-icons/md";
import { IoPersonAddSharp  } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import Modal from '../modal/Modal';
import LayoutModal from '../modalLayout/Layout';
import TextField from '../textField/TextField';
import Social from '../SocialBottom/Social';
import { useState, useContext, useEffect } from 'react';
import { GlobalStateContext } from '../state/State';

const NavBar = ()=>{
  const [modalAbout, setModalAbout] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalPlayer, setModalPlayer] = useState(false);
  const {state, dispatch} = useContext(GlobalStateContext);

  useEffect(()=>{
    if(state?.players?.length === 0){
      setModalPlayer(true);
    }
  },[state.players]);  

  const controlModalPlayer = (value, isFirst)=>{
    if(state?.players?.length === 0 && !isFirst){
      return;
    }
    if(!state?.game?.isGameStarted){
      dispatch({type:'OPEN_CLOSE_START_MODAL'});
    }
    setModalPlayer(value);
  }

  return(
    <div className={styles.nav}>
      <ModalAbout isOpen={modalAbout} modalSet={setModalAbout}/>
      <ModalContact isOpen={modalContact} modalSet={setModalContact}/>
      <ModalForMore/>
      <ModalCreatePlayer isOpen={modalPlayer} modalState={controlModalPlayer}/>
      <div className={styles.nav_left}><img src={logo} alt="not found" /></div>
      <ul className={styles.nav_right}>
        <li onClick={()=>{setModalAbout(true);}}><button><GrProjects/>{`About Project`}</button></li>
        <li onClick={()=>{setModalContact(true);}}><button><MdOutlineDeveloperMode/>{`Contact With Developer`}</button></li>
        <li className={styles.menuPlayerButton}>
         <button><MdVideogameAsset/>{`Player`}</button>
         <ul className={styles.players_menu}>
           {state.players.length > 0 ?
	     <>
	      {state.players.map((d,index)=>(<li className={styles.playersButton} key={index}><button>{d.p_name}</button></li>))}
	     </>
	     :<p>{`Don't exist players please add a new player`}</p>} 
           <li className={styles.playersButton} onClick={()=>{setModalPlayer(true);}}><button><IoPersonAddSharp/>{`Add New Player`}</button></li>
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
           <h1>{`TETRIS`}</h1>
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
  const [notifyState, setNotifyState] = useState({
    isShow:false,
    message:''
  });

  const onChange = (e)=>{
    if(e.target.value.length <= 4){
      setName(e.target.value.toUpperCase());
    }
    return;
  }

  const existPlayer = ()=>{
    const findPlayer = state.players.filter(x=>x.p_name == name);
    return findPlayer.length === 0 ? false:true;
  }

  const onClick = ()=>{ 
    if(name.length === 0){
      setNotifyState({
	isShow:true,
	message:`Sorry but you need type minimun one character to continue`
      });
      setTimeout(()=>{setNotifyState({...notifyState, isShow:false})}, 4000);
      return;
    }
    if(existPlayer()){
      setNotifyState({
	isShow:true,
	message:`The nickname: ${name} is already exist please try with another nickname`
      });
      return;
    }
    dispatch({type:'CREATE_PLAYER', payload:{p_name:name, topPoints:0}}); 
    setName('');
    props.modalState(false, true);
  }

  const Notify = ()=>{
    return(
      <>  
      <div 
      style={{width:'100%', padding:'2dvh', flexDirection:'row',
	      justifyContent:'center', backgroundColor:`#DC3545`,
	      marginBottom:'2dvh', borderRadius:'10px', display:`${notifyState.isShow ? `flex`:`none`}`}}>
        <IoIosCloseCircle style={{color:'white', fontSize:'3dvh', marginRight:'1dvh'}}/>
        <p>{notifyState.message}</p>
      </div>	
      </>
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
