import styles from './GameBoard.module.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { Pieces } from '../../constant/gameConstant';
import { GlobalStateContext } from '../state/State';
import { useInterval } from '../../hooks/useInterval';
import { LuArrowUpSquare, LuArrowRightSquare, LuArrowLeftSquare, LuArrowDownSquare } from "react-icons/lu";
import Modal from '../modal/Modal';
import LayoutModal from '../modalLayout/Layout';


const GameBoard = ()=>{
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
    if(boardSizeRef.current && state.game.isGameStarted){
      const {offsetWidth, offsetHeight } = boardSizeRef.current;
      let height = Math.floor(parseInt(offsetHeight) / 20) - 1;
      createBoard(13, height);
    }
  },[state.game.isGameStarted]);

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
    <div tabIndex={0} onKeyDown={e=>{handleKey(e);}} className={styles.container}> 
      <CoverStartGame/>
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

const CoverStartGame = ()=>{
  return(
    <span className={styles.cover_start_game}>
      <div>
        <span></span>
        <h4>{`WELCOME PLEASE PRESS TO CONTINUE`}</h4>
        <span></span>
      </div>
      <div>
        <div>
          <LuArrowLeftSquare/>
          <p>{`MOVE LEFT`}</p>
        </div>
        <div>
          <LuArrowDownSquare/>
          <p>{`MOVE DOWN`}</p>
        </div>
        <div>
          <LuArrowUpSquare/>
          <p>{`ROTATE SHAPE`}</p>
        </div>
        <div>
          <LuArrowRightSquare/>
          <p>{`MOVE RIGHT`}</p>
        </div>
      </div>
    </span>
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
          <h4>{state?.currentPlayer?.p_name}</h4>
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

const ModalStart = ()=>{
  const keyWord = {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}
  const key = {color:'white', fontSize:'8dvh'};
  const {state, dispatch} = useContext(GlobalStateContext);

  const startGame = ()=>{
    dispatch({type:'OPEN_CLOSE_START_MODAL'});
    dispatch({type:'START_GAME'});
  }

  return(
    <Modal isOpen={state.game.isModalStartOpen} modalState={startGame}>
      <LayoutModal>
        <div>
          <h1>{`WELCOME ${state.currentPlayer.p_name}`}</h1>
        </div>
        <div>
          <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems: 'center', marginTop:'3dvh'}}>
   
          </div>
          <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <div style={keyWord}>
              <LuArrowLeftSquare style={key}/>
              <p>LEFT</p>
            </div>
            <div style={keyWord}>
              <LuArrowUpSquare style={key}/>
              <p>ROTATE</p>
            </div>
            <div style={keyWord}>
              <LuArrowDownSquare style={key}/>
              <p>DOWN</p>
            </div>
            <div style={keyWord}>
              <LuArrowRightSquare style={key}/>
              <p>RIGHT</p>
            </div>
          </div>
        </div>
      </LayoutModal>
    </Modal>
  )
}



export default GameBoard;

