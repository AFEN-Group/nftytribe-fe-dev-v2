import { useState, useContext } from "react";
//import { ThemeContext } from '../../../../context/ThemeContext'
import CircularProgress from "@material-ui/core/CircularProgress";
//import TextField from '@material-ui/core/TextField'
//import Input from '../../../../components/Footer/TextInput'
import TextInput from "../TextInput";
import { motion } from "framer-motion";
import style from "../Footer.module.scss";
import { useTranslation } from "react-i18next";

const SubscribeForm = ({ status, message, onValidated }) => {
  // const [themeState] = useContext(ThemeContext)
  // const dark = themeState.dark
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const inputHandler = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValidated = onValidated({ EMAIL: email });
    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };
  const handleKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit();
    }
  };
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return message;
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    setEmail("");
    //setErr(formattedMessage)
    return formattedMessage ? formattedMessage : null;
  };

  return (
    <>
      <form className={style.lbody} onSubmit={handleSubmit}>
        <p>{t("subscribe-text")}</p>
        <TextInput
          type="email"
          inputName="email"
          labelName={t("email-placeholder")}
          inputHandler={inputHandler}
          onKeyUp={(e) => handleKey}
        />
        <br />
        <button className={style.sub}>{t("subscribe-btn")}</button>
      </form>

      <motion.div className={style.subResponse}>
        {status === "sending" && <CircularProgress color="primary" />}
        {status === "error" && (
          <div
            className={style.subErr}
            dangerouslySetInnerHTML={{
              __html:
                getMessage(message).substr(0, 3) === "Rec"
                  ? getMessage(message)
                  : `Hi! You're already part of the tribe!`,
            }}></div>
        )}
        {status === "success" && (
          <p className={style.subSucc}>{t("subscribe-success")}</p>
        )}
      </motion.div>
    </>
  );
};

export default SubscribeForm;
