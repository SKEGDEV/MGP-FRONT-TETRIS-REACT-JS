import styles from './Button.module.scss';

const Button = ({variant,children})=>{

  return(
    <>
     {variant === 'close' ? <ButtonClose/> : 
      <button 
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
const ButtonClose = ()=>{

}

export default Button;
