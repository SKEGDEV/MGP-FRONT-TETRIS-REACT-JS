import { createContext, useReducer } from "react";
import { Pieces, actions } from "../../constant/gameConstant";

const GlobalStateContext = createContext();

const reducer = (state, action) =>{
  switch(action.type){ 
    case actions.SET_BOARD:
      return{
	...state,
	game:{
	  ...state.game,
	  board: action.payload
	}
      }
    case actions.SET_POSITION:
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
    case actions.CREATE_PLAYER:
      let newArrayPlayers = [...state.players, action.payload];
      const newPlayer = Object.keys(state.currentPlayer).length === 0 ? action.payload : state.currentPlayer;
      return{
	...state,
	players:newArrayPlayers,
	currentPlayer: newPlayer
      }
    case actions.SET_PLAYER:
      return{
	...state,
	currentPlayer:state.players[action.index]
      }
    case actions.IS_GAME_OVER:
      const newPlayerScore =(state.game.score > state.currentPlayer.topPoints) ? state.game.score : state.currentPlayer.topPoints;
      const indexCurrentPlayer = state.players.findIndex(x => x.p_name === state.currentPlayer.p_name);   
      let updateArrayPlayers = state.players;
      updateArrayPlayers[indexCurrentPlayer] = {
	...state.players[indexCurrentPlayer],
	topPoints:newPlayerScore
      }
      return{
	...state,
	currentPlayer:{
	  ...state.currentPlayer,
	  topPoints:newPlayerScore
	},
	players:updateArrayPlayers,
	game:{
	  ...state.game,
	  score:0,
	  level:1,
	  linesCleared:0,
	  speed:700,
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
    case actions.START_GAME:
      return{
	...state,
	game:{
	  ...state.game,
	  isGameStarted:true
	}
      }
    case actions.OPEN_CLOSE_START_MODAL:
      return{
	...state,
	game:{
	  ...state.game,
	  isModalStartOpen:!state.game.isModalStartOpen
	}
      }
    case actions.SET_STATISTICS_GAME:
      const newLevel = Math.floor(state.game.linesCleared/3)+1;
      let newSpeed = state.game.speed
      if(newLevel !== state.game.level){
	newSpeed -= newSpeed * 0.1;
      }
      return{
	...state,
	game:{
	  ...state.game,
	  score:state.game.score + (action.linesCleared === 1 ? 40 :
	                            action.linesCleared === 2 ? 100 : 300) * (state.game.level + 1),
	  level:newLevel,
	  linesCleared: state.game.linesCleared + 1,
	  speed:newSpeed
	}
      }
    case actions.SET_MENU_OPTIONS:
      return{
	...state,
	menu:{
	  ...state.menu,
	  [action.payload.name]:action.payload.value
	}
      }
    case actions.OPEN_SUB_MENU:
      return{
	...state,
	menu:{
	  ...state.menu,
	  onSelectSubMenu:state.menu.subMenu.open? -1: 0,
	  subMenu:{
	    ...state.menu.subMenu,
	    open:!state.menu.subMenu.open,
	    index:state.menu.subMenu.open ? -1 : action.payload
	  }
	}
      }
    case actions.SET_ROTATION:
      return{
	...state,
	game:{
	  ...state.game,
	  rotation:action.payload
	}
      }
    default:
      return state;
  }
}

const initState = {
  players:[],
  currentPlayer:{},
  menu:{
    isSelectedMenu:0,
    onSelectMenu:1,
    onSelectSubMenu:-1,
    subMenu:{
      open:false,
      index:-1
    }
  },
  skin:0,
  game:{
    board:[],
    rotation:0,
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
    linesCleared:0,
    speed:700,
    isGamePaused: false, 
    isGameStarted: false,
    isModalStartOpen:false
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
