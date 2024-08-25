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

  const drawNewPiece = (array, start)=>{
    let newBoard = array || state.game.board;
    const current = state.game.nextPiece;
    const next = Math.floor(Math.random()*7);
    const piece = Pieces[current];
    let boardX = start || startX;
    let boardY = 0;
    dispatch({type:'SET_POSITION', payload:{x:boardX, y:boardY}});
    for(let y = 0; y < 2; y++){
      for(let x = 0; x < 3; x++){
        newBoard[boardY][boardX] = piece.shape[y][x];
        boardX++;
      }
      boardY++;
      boardX = start||startX;
    }

    dispatch({type:'SET_BOARD', payload:newBoard});
    dispatch({type:'SET_SHAPES', payload:{current:current, next:next}});
  }

  const movePiece = (addX, addY, newRotation)=>{
    let boardX = state.game.currentX + addX;
    let boardY = state.game.currentY + addY;
    let newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 0 : value)));
    let rotatePosition = newRotation || rotation;
    const currentPiece = Pieces[state.game.currentPiece]
    dispatch({type:'SET_POSITION', payload:{x:boardX, y:boardY}}); 

    let initX = rotatePosition == 2 ? 2 : 
                  rotatePosition == 3 ? 1 : 0;

    const initY = rotatePosition == 2 ? 1 : 
                  rotatePosition == 3 ? 2 : 0;

    let limitX = rotatePosition == 0 ? 3: 
                   rotatePosition == 1 ? 2: 0;

    const limitY = rotatePosition == 0 ? 2: 
                   rotatePosition == 1 ? 3: 0;  

    const isSpecial = (currentPiece.name === 'Z_tetromino' || currentPiece.name === 'S_tetromino');    
    
    if(rotatePosition > 1 && isSpecial){
      initX = 0;
      limitX = rotatePosition == 2 ? 3:2;
      for(let y = initY; y >= limitY; y--){
	for(let x = initX; x < limitX; x++){
	  newBoard[boardY][boardX] = currentPiece.shape[rotatePosition == 2 ? y:x][rotatePosition == 2 ? x:y]
	  boardX++;
	}
	boardY++;
	boardX = state.game.currentX + addX;
      }
    }
    else if(rotatePosition > 1 && !isSpecial){
      for(let y = initY; y >= limitY; y--){
	for(let x = initX; x >= limitX; x--){
	  newBoard[boardY][boardX] = currentPiece.shape[rotatePosition == 2 ? y:x][rotatePosition == 2 ? x:y]
	  boardX++;
	}
	boardY++;
	boardX = state.game.currentX + addX;
      }
    }else{
      for(let y = initY; y < limitY; y++){
	for(let x = initX; x < limitX; x++){
	  newBoard[boardY][boardX] = currentPiece.shape[rotatePosition == 0 ? y:x][rotatePosition == 0 ? x:y]
	  boardX++;
	}
	boardY++;
	boardX = state.game.currentX + addX;
      }
    }
    dispatch({type:'SET_BOARD', payload:newBoard});
  }

  const rotatePiece = ()=>{  
    const isSimple = (Pieces[state.game.currentPiece].name == 'I_tetromino');
    const isDontRotate = (Pieces[state.game.currentPiece].name == 'O_tetromino');
    let newRotation = isDontRotate ? 0:
                      (isSimple && rotation == 1) ? 0:
                      rotation == 3 ? 0 :
                      rotation + 1; 
    setRotation(newRotation);
    movePiece(0,0, newRotation);
  }

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
    let start = Math.floor(parseInt(width)/2); 
    setStartX(start);
    drawNewPiece(arrayBoard, start);
  }

  const solidifyPiece = ()=>{
    /*
     * solidify case
     * 1. when the piece is in the end of board Y
     * 2. when the piece colision with another part of solid board
     * */
  }

  const checkColition = ()=>{

  }
  useEffect(()=>{
    if(boardSizeRef.current){
      const {offsetWidth, offsetHeight } = boardSizeRef.current;
      let width = Math.floor(parseInt(offsetWidth) / 20);
      let height = Math.floor(parseInt(offsetHeight) / 20) - 1;
      createBoard(width, height);
    }
  },[]);

  const handleKey = (event)=>{
    if(event.key === 'ArrowLeft'){
      movePiece(-1, 0);
    }
    if(event.key === 'ArrowRight'){
      movePiece(1, 0);
    }
    if(event.key === 'ArrowUp'){
      rotatePiece();
    }
    if(event.key === 'ArrowDown'){
      movePiece(0, 1);
    }
  }

  useInterval(()=>{
    //movePiece(0,1);
  },1500)

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

