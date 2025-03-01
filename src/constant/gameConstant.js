import styles from '../components/base/base.module.scss';

export const Pieces = {
  0:{
    shape:[
      [2,2,2] 
    ],
    color:'#00FFFF',
    name:'I_tetromino',
    dimensions:[1,3]
  },
  1:{
    shape:[
      [2,2],
      [2,2]
    ],
    color:'#FFFF00',
    name:'O_tetromino',
    dimensions:[2,2]
  },
  2:{
    shape:[
      [2,2,2],
      [0,2,0]
    ],
    color:'#800080',
    name:'T_tetromino',
    dimensions:[2,3]
  },
  3:{
    shape:[
      [0,2,2],
      [2,2,0]
    ],
    color:'#00FF00',
    name:'S_tetromino',
    dimensions:[2,3]
  },
  4:{
    shape:[
      [2,2,0],
      [0,2,2]
    ],
    color:'#FF0000',
    name:'Z_tetromino',
    dimensions:[2,3]
  },
  5:{
    shape:[
      [2,2,2],
      [2,0,0]
    ],
    color:'#0000FF',
    name:'J_tetromino',
    dimensions:[2,3]
  },
  6:{
    shape:[
      [2,2,2],
      [0,0,2]
    ],
    color:'#FFA500',
    name:'L_tetromino',
    dimensions:[2,3]
  },
}

export const actions = {
  SET_BOARD: 'SET_BOARD',
  SET_POSITION: 'SET_POSITION',
  CREATE_PLAYER: 'CREATE_PLAYER',
  SET_PLAYER: 'SET_PLAYER',
  IS_GAME_OVER: 'IS_GAME_OVER',
  START_GAME: 'START_GAME',
  OPEN_CLOSE_START_MODAL: 'OPEN_CLOSE_START_MODAL',
  SET_STATISTICS_GAME: 'SET_STATISTICS_GAME',
  SET_ROTATION: 'SET_ROTATION',
  SET_MENU_OPTIONS: 'SET_MENU_OPTIONS',
  OPEN_SUB_MENU: 'OPEN_SUB_MENU',
  SET_SKIN: 'SET_SKIN',
}

export const MenuItems = [
  {
    name:'home',
    subMenu:[],
    type: 'screen'
  },
  {
    name:'play',
    subMenu:[],
    type: 'screen'
  },
  {
    name:'aparience',
    type: 'submenu',
    subMenu:[
      {
	name:'default',
	type:'skin',
        className: styles.default,
      },
      {
	name:'eda & king',
	type: 'skin',
	className: styles.eda_king
      },
      {
	name:'king',
	type: 'skin',
	className: styles.king
      },
      {
	name:'nes control',
	type: 'skin',
	className: styles.nes
      },
      {
	name:'rick & morty 1',
	type: 'skin',
	className: styles.rick_morty_1	
      },
      {
	name:'rick & morty 2',
	type: 'skin',
	className: styles.rick_morty_2
      },
      {
	name:'trinity',
	type: 'skin',
	className: styles.trinity
      },
      {
	name:'miles',
	type: 'skin',
	className: styles.miles
      },
      {
	name:'sweetie fox',
	type: 'skinP',
	className: styles.sweetie_fox
      }
    ]
  },
  {
    name:'about',
    subMenu:[],
    type: 'screen'
  }
]
