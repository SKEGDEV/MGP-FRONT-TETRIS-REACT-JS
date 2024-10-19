import logo from '../../assets/logo.png';
import styles from './Nav.module.scss';
import { GrProjects } from "react-icons/gr";
import { MdOutlineDeveloperMode, MdVideogameAsset, MdMore } from "react-icons/md";
import { IoPersonAddSharp, IoPersonAdd  } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import Modal from '../modal/Modal';
import TextField from '../textField/TextField';
import Button from '../button/Button';
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
    <Modal isOpen={props.isOpen} modalState={props.modalState} variant='operation' btnTittle='Add new player' btnOnClick={onclick}>
      <div className={styles.modal_player_container}>
        <div className={styles.modal_player_head}>
          <span></span>
          <h4>{`Add new Player`}</h4>
          <span></span>
        </div>
        <div className={styles.modal_player_body}>
          <Notify/>
          <TextField/>
          <Button variant='success'><IoPersonAdd/>{` Create new player`}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default NavBar;
