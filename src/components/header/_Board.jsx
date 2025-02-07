import styles from './Header.module.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { Pieces } from '../../constant/gameConstant';
import { GlobalStateContext } from '../state/State';
import { useInterval } from '../../hooks/useInterval';

export default function Board(){
  const boardSizeRef = useRef(null);
  const {state, dispatch} = useContext(GlobalStateContext); 
  const startX = 6;
  const [rotation, setRotation] = useState(0);

  const createBoard = (width, height)=>{
    let arrayBoard = [];
    let arrayTemp = []; 
    for(let y = 1; y < height; y++){
      arrayTemp = [];
      for(let x = 1; x < width; x++ ){	
	arrayTemp.push(0);
      }
      arrayBoard.push(arrayTemp);
    } 
    drawPiece(arrayBoard);
    console.log(arrayBoard);
  }

  const existShape = ()=>{
    const exist = state.game.board.filter(y => y.includes(2));
    return exist.length == 0 ? false:true;
  }
  //useEffect uses for draw new shape and checkColision
  const drawPiece = (board)=>{
    setRotation(0);  
    let newBoard = board;
    let current = state.game.nextPiece;
    const piece = Pieces[current];
    let boardX = startX;
    let boardY = 0;
    for(let y = 0; y < piece.dimensions[0]; y++){
      for(let x = 0; x < piece.dimensions[1]; x++){
	newBoard[boardY][boardX] = piece.shape[y][x];
	boardX++;
      }
      boardY++;
      boardX = startX;
    } 
    const isOnBotton = board[piece.dimensions[0]].slice(startX, startX + piece.dimensions[1]-1).includes(1);
    if(isOnBotton){
      newBoard = newBoard.map(d=>d.map(value => ((value == 2 || value == 1) && 0)));
      dispatch({type:'IS_GAME_OVER'});
    } 
    dispatch({type:'SET_POSITION', payload:{x:startX, y:0, change:true}});
    dispatch({type:'SET_BOARD', payload:newBoard});
  }

  useEffect(()=>{ 
    if(existShape() && state.game.board.length > 0){
      try{
	checkColision();
      }catch(ex){} 
    }
  },[state.game.board]);

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

  const checkColision = ()=>{
    const boardHeigh = state.game.board.length-1;
    const piece = Pieces[state.game.currentPiece];
    const currentPositionShapeY = state.game.currentY + ((rotation == 1 || rotation == 3)? piece.dimensions[1] - 1: piece.dimensions[0]-1);
    const isTheEnd = (boardHeigh == currentPositionShapeY); 
    const limitX= state.game.currentX + ((rotation == 1 || rotation == 3)? piece.dimensions[0]:piece.dimensions[1])+1;
    let firstSolidLine = -1;
    let matchLine = [];
    let includesSolid;
    if(isTheEnd){
      solidifyShape();
    }  
    if(!isTheEnd){
      for(let i = state.game.currentY; i < state.game.board.length; i++){
	for(let j = state.game.currentX; j < limitX; j++){
	  if(state?.game?.board[i][j]==1  && state?.game?.board[i-1][j] == 2){
	    solidifyShape();
	    return;
	  }
	}	 
	includesSolid = state.game.board[i].filter(x => x==1);
	if(includesSolid.length > 0 && firstSolidLine === -1){firstSolidLine=i;}
	if(includesSolid.length === state.game.board[0].length){matchLine.push(i);}
      }
    }
    if(matchLine.length > 0 && firstSolidLine >= 0){
      matchPoint(matchLine, firstSolidLine);
    }
  }

  const matchPoint = (matchLine, firstSolidLine)=>{
    let newBoard = state.game.board;
    for(let i = matchLine[matchLine.length-1]; i >= firstSolidLine; i--){
      if(matchLine.length === 1){
	newBoard[i] = newBoard[i-1];
      }  
      if(matchLine.length === 2){
	newBoard[i] = newBoard[i-2];
      }
      if(matchLine.length === 3){
	newBoard[i] = newBoard[i-3];
      }
    }
    dispatch({type:'SET_BOARD', payload:newBoard});
    dispatch({type:'SET_STATISTICS_GAME', linesCleared:matchLine.length});
  }

  const solidifyShape = ()=>{
    const newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 1 : value)));
    drawPiece(newBoard);
  }

  const rotatePiece = ()=>{  
    let newRotation = rotation === 3 ? 0 : rotation + 1; 
    const newShapeDimension = state.game.currentX + Pieces[state.game.currentPiece].dimensions[(newRotation == 1 || newRotation == 3)? 0:1]
    if(newShapeDimension > state.game.board[0].length){
      return;
    }
    setRotation(newRotation);
  }

  //init effect to draw the board
  useEffect(()=>{
    createBoard(15, 16);
  },[/*state.game.isGameStarted*/]);

  //effect uses when the rotation change
  useEffect(()=>{
    if(existShape()){
      moveShape(0, 0);
    } 
  },[rotation]);

  const handleKey = (event)=>{
    if(event.key === 'ArrowLeft'){
      moveShape(-1, 0);
    }
    if(event.key === 'ArrowRight'){
      moveShape(1, 0);
    }
    if(event.key === 'ArrowUp'){
      rotatePiece();
    }
    if(event.key === 'ArrowDown'){
      moveShape(0, 1);
    }
  }

  useInterval(()=>{
    if(Object.keys(state.currentPlayer).length === 0){return;}
    moveShape(0,1);
  },state.game.speed);


  return(
    <div className={styles.game}>
      <main className={styles.board} tabIndex={0} onKeyDown={e=>{handleKey(e);}}>
    {
      state.game.board.map((row, index)=>(
	<div key={index} className={styles.row}>
	  {row.map((cell, index)=>(
	    <div style={{backgroundColor:`${cell == 1 ? '#2b2919': cell == 2? '#2b2919': ''}`, borderColor:`${cell == 2 ? '#cccfb2':'#2b2919'}`}} key={index} className={styles.cell}></div>
	  ))}
	</div>
      ))
    }
      </main>
      <aside>
        <div className={styles.infoBox}>
          <h4><b>SCORE</b></h4>
          <p>{state.game.score}</p>
        </div>
        <div className={styles.infoBox}>
          <h4><b>LEVEL</b></h4>
          <p>{state.game.level}</p>
        </div>
        <div className={styles.infoBox}>
          <h4><b>LINES</b></h4>
          <p>{state.game.linesCleared}</p>
        </div>
        <div className={styles.shape}>
          {Pieces[state?.game?.nextPiece].shape.map((row, index)=>(
	    <div key={index} className={styles.row} style={{justifyContent:'center', alignItems:'center'}}>
	      {row.map((cell, index)=>(
		<div  key={index} className={styles.cell} style={{backgroundColor:`${cell == 2 ? '#2b2919': ''}`, borderColor:`${cell == 2 ? '#cccfb2': ''}`, border:`${cell == 2 ? '0.1px solid #cccfb2': 'none'}`}}></div>
	      ))}
	    </div>
	  ))}
        </div>
      </aside>
    </div>
  );
}
