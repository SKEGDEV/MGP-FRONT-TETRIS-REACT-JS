import styles from './TextField.module.scss';

const TextField = (props)=>{
  return(
    <div className={styles.input_container}><input placeholder={props.placeholder} type={props.type} /></div>
  );
}

export default TextField;
