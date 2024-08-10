import { createContext, useReducer, useContext } from "react";

const GlobalStateContext = createContext();

const reducer = (state, action) =>{
  switch(action.type){ 
    default:
      return state;
  }
}

const initState = {
  players:[],
  test:'hello bitches'
}

const GlobalStateProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer, initState);
  return(
    <GlobalStateContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export {GlobalStateProvider, GlobalStateContext}
