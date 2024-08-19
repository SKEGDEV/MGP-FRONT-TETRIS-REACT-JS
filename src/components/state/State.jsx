import { createContext, useReducer, useContext } from "react";

const GlobalStateContext = createContext();

const reducer = (state, action) =>{
  switch(action.type){ 
    case 'SET_BOARD':
      return{
	...state,
	game:{
	  ...state.game,
	  board: action.payload
	}
      }
    case 'SET_POSITION':
      return{
	...state,
	game:{
	  ...state.game,
	  currentX:action.payload.x,
	  currentY:action.payload.y
	}
      }
    case 'SET_SHAPES':
      return{
	...state,
	game:{
	  ...state.game,
	  currentPiece:action.payload.current,
	  nextPiece: action.payload.next
	}
      }
    case 'CREATE_PLAYER':
      return{
	...state,
	players:state.players.push(action.payload)
      }
    case 'SET_PLAYER':
      return{
	...state,
	currentPlayer:action.payload
      }
    default:
      return state;
  }
}

const initState = {
  players:[],
  currentPlayer:{},
  game:{
    board:[],
    currentX:0,
    currentY:0,
    currentPiece:0,
    nextPiece:Math.floor(Math.random()*7),
    shapeStatistics:{
      I_tetromino:0,
      O_tetromino:0,
      T_tetromino:0,
      S_tetromino:0,
      Z_tetromino:0,
      J_tetromino:0,
      L_tetromino:0
    },
    level:1,
    score:0
  }
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
