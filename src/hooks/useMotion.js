import {useContext} from 'react';
import {GlobalStateContext} from '../components/state/State';
import { Pieces, actions } from '../constant/gameConstant';

export function useMotion(){
  const {state, dispatch} = useContext(GlobalStateContext);
  const {game:{rotation}} = state;
  const moveShape = (addX, addY)=>{
    const piece = Pieces[state.game.currentPiece];
    if(state.game.currentX == 0 && addX < 0){
      return;
    }
    const isTheEnd = state.game.currentX + ((rotation == 1 || rotation == 3)?piece.dimensions[0]:piece.dimensions[1]) == state.game.board[0].length;
    if(isTheEnd && addX > 0){
      return;
    }
    let shapeX = rotation === 2 ? piece.dimensions[1]-1:
                 rotation === 3 ? piece.dimensions[0]-1: 0;
    let shapeY = rotation === 2 ? piece.dimensions[0]-1: 
                 rotation === 3 ? piece.dimensions[1]-1: 0;
    let limitX = rotation === 0 ? piece.dimensions[1]:
                 rotation === 1 ? piece.dimensions[0]: 0;
    let limitY = rotation === 0 ? piece.dimensions[0]:
                 rotation === 1 ? piece.dimensions[1]: 0;
    let boardX = state.game.currentX + addX; 
    let boardY = state.game.currentY + addY;
    dispatch({type:'SET_POSITION', payload:{x:boardX, y:boardY}});
    let newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 0 : value))); 
    let value = 0;
    if(rotation >= 2){
      while(shapeY >= limitY){
	while(shapeX >= limitX){
	  value = piece.shape[rotation === 2 ? shapeY:shapeX][rotation === 2 ? shapeX:shapeY];
	  newBoard[boardY][boardX] =(newBoard[boardY][boardX] == 1 && value == 0)? 1: value;
	  shapeX--;
	  boardX++;
	}
	boardY++; 
	boardX = state.game.currentX + addX;
	shapeX = rotation === 2 ? piece.dimensions[1]-1:
                 rotation === 3 ? piece.dimensions[0]-1: 0;
	shapeY--;
      }
    }else{
      while(shapeY < limitY){
	while(shapeX < limitX){
	  value = piece.shape[rotation === 0 ? shapeY:shapeX][rotation === 0 ? shapeX:shapeY];
	  newBoard[boardY][boardX] = (newBoard[boardY][boardX] == 1 && value == 0)? 1: value;
	  shapeX++;
	  boardX++;
	}
	boardY++; 
	boardX = state.game.currentX + addX;
	shapeX = rotation === 2 ? piece.dimensions[1]:
                 rotation === 3 ? piece.dimensions[0]: 0;
	shapeY++;
      }
    }
    dispatch({type:'SET_BOARD', payload:newBoard});
  }

  return moveShape;

}

export function useRotation(){
  const {state, dispatch} = useContext(GlobalStateContext);
  const {game:{rotation}} = state;
  const rotatePiece = ()=>{  
    let newRotation = rotation === 3 ? 0 : rotation + 1; 
    const newShapeDimension = state.game.currentX + Pieces[state.game.currentPiece].dimensions[(newRotation == 1 || newRotation == 3)? 0:1]
    if(newShapeDimension > state.game.board[0].length){
      return;
    }
    dispatch({type:'SET_ROTATION', payload:newRotation});
  }

  return rotatePiece;
}
