import { createContext, useReducer, useContext } from "react";
import { Pieces } from "../../constant/gameConstant";

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
      let currentShape = action?.payload?.change ? state.game.nextPiece : state.game.currentPiece;
      let nextShape = action?.payload?.change ? Math.floor(Math.random()*7) : state.game.nextPiece; 
      let newStatistic = action?.payload?.change ? state.game.shapeStatistics[Pieces[currentShape].name] + 1 : state.game.shapeStatistics[Pieces[currentShape].name];
      return{
	...state,
	game:{
	  ...state.game,
	  currentX:action.payload.x,
	  currentY:action.payload.y,
	  currentPiece:currentShape,
	  nextPiece:nextShape,
	  shapeStatistics:{
	    ...state.game.shapeStatistics,
	    [Pieces[currentShape].name]:newStatistic
	  }
	}
      }
    case 'CREATE_PLAYER':
      let newArray = [...state.players, action.payload]
      return{
	...state,
	players:newArray
      }
    case 'SET_PLAYER':
      return{
	...state,
	currentPlayer:action.payload
      }
    case 'IS_GAME_OVER':
      return{
	...state,
	game:{
	  ...state.game,
	  score:0,
	  level:1,
	  linesCleared:0,
	  shapeStatistics:{
	    I_tetromino:0,
	    O_tetromino:0,
	    T_tetromino:0,
	    S_tetromino:0,
	    Z_tetromino:0,
	    J_tetromino:0,
	    L_tetromino:0
	  } 
	}
      }
    case 'SET_STATISTICS_GAME':
      return{
	...state,
	game:{
	  ...state.game,
	  score:Math.floor(state.game.score == 0 ? (state.game.level+1):(state.game.score*(state.game.level+1))),
	  level:Math.floor(state.game.linesCleared/5)+1,
	  linesCleared: state.game.linesCleared + 1
	}
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
    score:0,
    linesCleared:0
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
