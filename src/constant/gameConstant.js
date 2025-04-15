import styles from '../components/base/base.module.scss';
import stylesMidContent from '../components/midContent/midContent.module.scss';
import stylesFooter from '../components/footer/Footer.module.scss';

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
    name:'about',
    subMenu:[],
    type: 'screen',
    translateX:'-33%',
  },
  {
    name:'aparience',
    type: 'submenu',
    translateX:'0%',
    subMenu:[
      {
	name:'default',
	type:'skin',
        className: styles.default,
	translateY: '0vh',
	colorHeaderNintendo: '#012c9e',
	colorA: '#000103',
	colorB: '#000103',
	classMidContent: '',
	classFooter: '',
      },
      {
	name:'Final Fantasy',
	type: 'skin',
	className: styles.eda_king,
	translateY: '-7vh',
	colorA: '#4ecdc4',
	colorB: '#ffe66d',
	classMidContent: stylesMidContent.final_fantasy,
	classFooter: stylesFooter.final_fantasy,
      },
      {
	name:'Kindred 1',
	type: 'skin',
	className: styles.king,
	translateY: '-14vh',
	colorA: '#ff6b6b',
	colorB: '#4ecdc4',
	classMidContent: stylesMidContent.kindred_1,
	classFooter: stylesFooter.kindred_1,
      },
      {
	name:'nes control',
	type: 'skin',
	className: styles.nes,
	translateY: '-21vh',
	colorA: '#00f5d4',
	colorB: '#9b5de5',
	classMidContent: stylesMidContent.nes,
	classFooter: stylesFooter.nes,
      },
      {
	name:'rick & morty 1',
	type: 'skin',
	className: styles.rick_morty_1,
	translateY: '-28vh',
	colorA: '#b5ead7',
	colorB: '#f6bd60',
	classMidContent: stylesMidContent.rick_morty_1,
	classFooter: stylesFooter.rick_morty_1,	
      },
      {
	name:'rick & morty 2',
	type: 'skin',
	className: styles.rick_morty_2,
	translateY: '-35vh',
	colorA: '#fee440',
	colorB: '#f15bb5',
	classMidContent: stylesMidContent.rick_morty_2,
	classFooter: stylesFooter.rick_morty_2,
      },
      {
	name:'Kindred 2',
	type: 'skin',
	className: styles.trinity,
	translateY: '-42vh',
	colorA: '#ff6ec7',
	colorB: '#00f5d4',
	classMidContent: stylesMidContent.kindred_2,
	classFooter: stylesFooter.kindred_2,
      },
      {
	name:'The legend of Zelda',
	type: 'skin',
	className: styles.miles,
	translateY: '-49vh',
	colorA: '#f1faee',
	colorB: '#e63946',
	classMidContent: stylesMidContent.Zelda,
	classFooter: stylesFooter.Zelda,
      },
      {
	name:'sweetie fox',
	type: 'skinP',
	className: styles.sweetie_fox,
	classHeader: '',
	classMidContent: '',
	classFooter: '',
      }
    ]
  },
  {
    name:'play',
    subMenu:[],
    type: 'screen',
    translateX:'33%',
  }
]
