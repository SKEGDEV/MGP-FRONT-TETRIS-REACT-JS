import styles from './GameBoard.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Pieces } from '../../constant/gameConstant';

const GameBoard = ()=>{
  const boardSizeRef = useRef(null);
  const [board, setBoard] = useState([]);
  const [startX, setStartX] = useState(0);
  const [currentPiece, setCurrentPiece] = useState({});
  let boardT = [];

  const drawNewPiece = (array, start)=>{
    let newBoard = array || board;
    const randomIndex = Math.floor(Math.random()*7);
    const piece = Pieces[randomIndex]
    let boardX = start || startX;
    let boardY = 0;
    for(let y = 0; y < 2; y++){
      for(let x = 0; x < 3; x++){
	newBoard[boardY][boardX] = piece.shape[y][x]
	boardX++;
      }
      boardY++;
      boardX = start||startX;
    }
    setBoard(newBoard); 
    setCurrentPiece(piece);
  }

  const moveLeft = ()=>{
    let x = findCurrentPositionShapeX();
    let y = findCurrentPositionShapeY();
    movePiece((parseInt(x)-1),(parseInt(y)));
  }

  const moveRight = ()=>{
    let x = findCurrentPositionShapeX();
    let y = findCurrentPositionShapeY();
    movePiece((parseInt(x)+1),(parseInt(y)));
  }

  const movePiece = (boardX,boardY)=>{
    let newBoard = board.map(d=>d.map(value => (value == 2 ? 0 : value)));
    const backupX = boardX;
    for(let y = 0; y < 2; y++){
      for(let x = 0; x < 3; x++){
	newBoard[boardY][boardX] = currentPiece.shape[y][x]
	boardX++;
      }
      boardY++;
      boardX = backupX;
    }
    setBoard(newBoard);
  }

  const findCurrentPositionShapeY = ()=>{
    return board.findIndex(element => element.find(element => element == 2));
  }

  const findCurrentPositionShapeX = ()=>{
    const positionY = findCurrentPositionShapeY();
    return board[positionY].findIndex(element => element == 2);
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

  document.addEventListener('keydown', (event)=>{
    switch(event.key){
      case 'ArrowLeft':
	moveLeft();
	break;
      case 'ArrowRight':
	moveRight();
	break;
    }
  });

  return(
    <div className={styles.container}>
      <div className={styles.statistics_container}>
        <h3>{`A-TYPE`}</h3>
        <div className={styles.statistics}>
          <h3>{`STATISTICS`}</h3>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.board} ref={boardSizeRef}> 
       {board.map((d, index)=>(
	 <div key={index} style={{width:"100%", display:"flex", flexDirection:"row"}}>
	 {d.map((d, index)=>(
	   <div key={index} style={{width:"20px", height:"20px", backgroundColor:`${d == 1? 'red': d== 2 ? 'white':''}`, border:"1px solid black"}}>
	   </div>
	 ))}
	 </div>
       ))}
      </div>
      <div className={styles.play_container}>
        <div className={styles.player_container}>
          <div className={styles.player_info}>
            <h3>{`PLAYER`}</h3>
            <h4>{`TEST`}</h4>
          </div>
          <div className={styles.player_info}>
            <h3>{`TOP`}</h3>
            <h4>{`000000`}</h4>
          </div>
          <div className={styles.player_info}>
            <h3>{`SCORE`}</h3>
            <h4>{`383888`}</h4>
          </div>
        </div>
        <div className={styles.next_container}>
          <h4>{`NEXT`}</h4>
          <span></span>
        </div>
        <div className={styles.level_container}>
          <h3>{`LEVEL`}</h3>
          <h4>{`1`}</h4>
        </div>
      </div>
    </div> 
  );
}

export default GameBoard;
