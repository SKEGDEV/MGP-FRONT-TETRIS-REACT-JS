import styles from './TextField.module.scss';

const TextField = (props)=>{
  return(
    <div className={styles.input_container}>
     <input
      value={props.value}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      onChange={(e)=>{props.onChange(e);}}
      />
    </div>
  );
}

export default TextField;
