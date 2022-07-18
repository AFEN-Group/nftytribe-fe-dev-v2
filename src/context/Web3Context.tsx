import { createContext } from "react";
import useWeb3 from "../hooks/web3";

export const Web3Context = createContext({});
const Web3ContextProvider = ({ children }: { children: any }) => {
  const data = useWeb3();
  return <Web3Context.Provider value={data}>{children}</Web3Context.Provider>;
};

export default Web3ContextProvider;
