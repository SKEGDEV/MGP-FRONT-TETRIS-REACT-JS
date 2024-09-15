import styles from './GameBoard.module.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { Pieces } from '../../constant/gameConstant';
import { GlobalStateContext } from '../state/State';
import { useInterval } from '../../hooks/useInterval';

const GameBoard = ()=>{
  const boardSizeRef = useRef(null);
  const {state, dispatch} = useContext(GlobalStateContext); 
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

  const createBoard = (width, height)=>{
    let arrayBoard = [];
    let arrayTemp = [];
    let start = Math.floor(parseInt(width)/2); 
    setStartX(start);
    for(let y = 1; y < height; y++){
      arrayTemp = [];
      for(let x = 1; x < width; x++ ){	
	arrayTemp.push(0);
      }
      arrayBoard.push(arrayTemp);
    } 

    dispatch({type:'SET_BOARD', payload:arrayBoard});
  }

  const existShape = ()=>{
    const index = state.game.board.findIndex(item => item.find(d => d == 2));
    return index === -1 ? false:true;
  }

  useEffect(()=>{
    
    if(!existShape() && state.game.board.length > 0){
      setRotation(0);
      let newBoard = state.game.board;
      const current = state.game.nextPiece;
      const next = Math.floor(Math.random()*7);
      const piece = Pieces[current];
      let boardX = startX;
      let boardY = 0;
      dispatch({type:'SET_POSITION', payload:{x:boardX, y:boardY}});
      dispatch({type:'SET_SHAPES', payload:{current:current, next:next}});
      dispatch({type:'ADD_STATISTICS_SHAPES', payload:piece.name});
      for(let y = 0; y < piece.dimensions[0]; y++){
	for(let x = 0; x < piece.dimensions[1]; x++){
	  newBoard[boardY][boardX] = piece.shape[y][x];
	  boardX++;
	}
	boardY++;
	boardX = startX;
      }
      dispatch({type:'SET_BOARD', payload:newBoard});
    }
    if(existShape() && state.game.board.length > 0){
      try{
	checkColision();
      }catch(ex){} 
    }
    
  },[state.game.board]);

  const moveShape = (addX, addY)=>{
    const piece = Pieces[state.game.currentPiece];
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
    if(isTheEnd){
      solidifyShape();
    }  
    if(!isTheEnd){
      for(let i = 0; i < state.game.board.length; i++){
	for(let j = 0; j < state.game.board[i].length; j++){
	  if(state?.game?.board[i][j]==1  && state?.game?.board[i-1][j] == 2){
	    solidifyShape();
	    return;
	  }
	}
      }
    }
  }

  const solidifyShape = ()=>{
    const newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 1 : value)));
    dispatch({type:'SET_BOARD', payload:newBoard});
  }

  const rotatePiece = ()=>{  
    let newRotation = rotation === 3 ? 0 : rotation + 1; 
    setRotation(newRotation);
  }

  useEffect(()=>{
    if(boardSizeRef.current){
      const {offsetWidth, offsetHeight } = boardSizeRef.current;
      let width = Math.floor(parseInt(offsetWidth) / 20);
      let height = Math.floor(parseInt(offsetHeight) / 20) - 1;
      createBoard(width, height);
    }
  },[]);

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
    moveShape(0,1);
  },700);

  return(
    <div tabIndex={0} onKeyDown={e=>{handleKey(e);}} className={styles.container}>
      <StatisticsL/>
      <div className={styles.board} ref={boardSizeRef}> 
       {state.game.board.map((d, index)=>(
	 <div key={index} style={{width:"100%", display:"flex", flexDirection:"row"}}>
	 {d.map((d, index)=>(
	   <div key={index} style={{width:"20px", height:"20px", backgroundColor:`${d == 1? 'white': d== 2 ? Pieces[state.game.currentPiece].color:''}`, border:"1px solid black"}}>
	   </div>
	 ))}
	 </div>
       ))}
      </div>
      <StatisticsR/>
    </div> 
  );
}

const StatisticsL = ()=>{
  const {state, dispatch} = useContext(GlobalStateContext);

  return(
    <div className={styles.statistics_container}>
      <h3>{`A-TYPE`}</h3>
      <div className={styles.statistics}>
        <h3>{`STATISTICS`}</h3>
      </div>
      <Shape index={0} points={state.game.shapeStatistics.I_tetromino}/>
      <Shape index={1} points={state.game.shapeStatistics.O_tetromino}/>
      <Shape index={2} points={state.game.shapeStatistics.T_tetromino}/>
      <Shape index={3} points={state.game.shapeStatistics.S_tetromino}/>
      <Shape index={4} points={state.game.shapeStatistics.Z_tetromino}/>
      <Shape index={5} points={state.game.shapeStatistics.J_tetromino}/>
      <Shape index={6} points={state.game.shapeStatistics.L_tetromino}/>
    </div>
  );
}

const Shape = (props)=>{
  
  return(
    <div className={styles.shape} style={{marginLeft:`${props.points == -1 ? '2dvh':''}`}}>
    <div style={{width:`${props.points == -1 ? '100%': '80%'}`}}>
      {Pieces[props.index].shape.map((y,index)=>(
	<div key={index} style={{width:"50%", display:"flex", flexDirection:"row"}}>
	{y.map((x, index)=>(
	  <div key={index} style={{width:"12px", height:"12px", backgroundColor:`${x == 2? Pieces[props.index].color : ''}`, border:`${x == 2? '1px solid black' : ''}`}}></div>
	))}
	</div>
      ))}
  </div>
  {props.points != -1 ?
    <div style={{width:"20%"}}>
     <p>{props.points}</p>   
    </div>:<></>
  }
   </div>
  );
}

const StatisticsR = ()=>{
  const {state, dispatch} = useContext(GlobalStateContext);
  return(
    <div className={styles.play_container}>
      <div className={styles.player_container}>
        <div className={styles.player_info}>
          <h3>{`PLAYER`}</h3>
          <h4>{state?.currentPlayer?.name}</h4>
        </div>
        <div className={styles.player_info}>
          <h3>{`TOP`}</h3>
          <h4>{state?.currentPlayer?.topPoints}</h4>
        </div>
        <div className={styles.player_info}>
          <h3>{`SCORE`}</h3>
          <h4>{state?.game?.score}</h4>
        </div>
      </div>
      <div className={styles.next_container}>
        <h4>{`NEXT`}</h4>
        <div><Shape index={state?.game?.nextPiece} points={-1}/></div>
      </div>
      <div className={styles.level_container}>
        <h3>{`LEVEL`}</h3>
        <h4>{state?.game?.level}</h4>
      </div>
    </div>
  );
}

export default GameBoard;

