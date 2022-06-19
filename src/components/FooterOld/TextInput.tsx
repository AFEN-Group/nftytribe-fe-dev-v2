import style from "./Footer.module.scss";

const TextInput = (props: any) => {
  return (
    <div className={style.inputBox}>
      <input
        className={style.field}
        type={props.type}
        name={props.inputName}
        value={props.value}
        onChange={props.inputHandler}
        autoComplete="off"
        required
        //minLength="3"
        placeholder=" "
      />
      <label htmlFor="name" className={style.labelName}>
        <span className={style.contentName}>{props.labelName}</span>
      </label>
    </div>
  );
};

export default TextInput;
