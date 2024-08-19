import styles from './GameBoard.module.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { Pieces } from '../../constant/gameConstant';
import { GlobalStateContext } from '../state/State';

const GameBoard = ()=>{
  const boardSizeRef = useRef(null);
  const {state, dispatch} = useContext(GlobalStateContext); 
  const [startX, setStartX] = useState(0);

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

  const movePiece = (addX, addY)=>{
    let boardX = state.game.currentX + addX;
    let boardY = state.game.currentY + addY;
    let newBoard = state.game.board.map(d=>d.map(value => (value == 2 ? 0 : value)));
    const currentPiece = Pieces[state.game.currentPiece]
    const backupX = boardX;
    dispatch({type:'SET_POSITION', payload:{x:boardX, y:boardY}}); 
    for(let y = 0; y < 2; y++){
      for(let x = 0; x < 3; x++){
	newBoard[boardY][boardX] = currentPiece.shape[y][x]
	boardX++;
      }
      boardY++;
      boardX = backupX;
    }
    dispatch({type:'SET_BOARD', payload:newBoard});
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

  useEffect(()=>{
    if(boardSizeRef.current){
      const {offsetWidth, offsetHeight } = boardSizeRef.current;
      let width = Math.floor(parseInt(offsetWidth) / 20);
      let height = Math.floor(parseInt(offsetHeight) / 20) - 1;
      createBoard(width, height);
    }
  },[]);

  const handleKey = (event)=>{
    console.log(event.key);
    if(event.key === 'ArrowLeft'){
      movePiece(-1, 0);
    }
    if(event.key === 'ArrowRight'){
      movePiece(1, 0);
    }
    if(event.key === 'ArrowUp'){
      movePiece(0, -1);
    }
    if(event.key === 'ArrowDown'){
      movePiece(0, 1);
    }
  }

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
	  <div key={index} style={{width:"10px", height:"10px", backgroundColor:`${x == 2? Pieces[props.index].color : ''}`, border:`${x == 2? '1px solid black' : ''}`}}></div>
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

