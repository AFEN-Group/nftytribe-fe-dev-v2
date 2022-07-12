import { createContext, useState } from "react";

export const LanguageContext = createContext("zh");

const useLanguage = () => {
  const langState = useState("zh");
  return {
    langState,
  };
};

export default useLanguage;
