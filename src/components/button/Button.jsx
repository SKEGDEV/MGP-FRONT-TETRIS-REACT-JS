import styles from './Button.module.scss';
import { RiCloseLargeFill } from "react-icons/ri";

const Button = ({onClick,variant,children})=>{

  return(
    <>
     {variant === 'close' ? <ButtonClose onClick={onClick}/> : 
      <button 
       onClick={onClick}
       className={`${styles.btn_base} ${variant === 'success'? styles.success:
                                        variant === 'warning'? styles.warning:
                                        variant === 'danger'? styles.danger: styles.default}`}
      >
        {children}
      </button>}
    </>
  );
}

//space for special buttons
const ButtonClose = (props)=>{
  return(
    <button onClick={props.onClick} className={styles.btn_close}><RiCloseLargeFill/></button>
  )
}

export default Button;
