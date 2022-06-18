import './App.css';
import React, { useEffect, useState } from 'react'
import cat from './img/cat.png'


// Плейсхолдер дата
const data = [
  {
    id:0,
    taste:'фуа-гра',
    gift:1,
    portion:10,
    weight:0.5
  },
  {
    id:1,
    taste:'рыбой',
    gift:2,
    portion:40,
    weight:2
  },
  {
    id:2,
    taste:'курой',
    gift:4,
    portion:100,
    weight:5
  }
]



function App() {
  //Состояние для карточек - включены или выкл
  const [disabled, setDisabled] = useState(true)
  //Состояние для подгрузки данных в компонент
  const [items, setItems] = useState(data)


  return (

    <div className="App">
      <div className = "appBody">
        <h1>Ты покормил кота?</h1>
        <div className = "appContent">
            {
              items.map((e,id) => <Card key = {id} data = {e} disabled = {disabled}></Card>)
            }
        </div>
      </div>
      <button className='disableBtn' onClick={()=>{
        setDisabled(pervstate => !pervstate)
      }}>Отключить карточки</button>
    </div>
  );
}


export default App;


const Card = ({data, disabled}) =>{

  const {
    id,
    weight,
    portion,
    gift,
    taste
  } = data

  //Состояние активны или нет
  const [isChecked, setIsChecked] = useState(false)


  return (
    // Контейнер карточки
    <div className={`cardItem ${stateHandler(isChecked, disabled).activeClass}`} 
    onClick = {()=>{
      if(!disabled){
        setIsChecked(pervstate => pervstate === false)
      }
      }}>

        {/* Сама карточка */}
        <div className='cardItemBody'>

          <div className='cardContent'>
              <p className='cardSlogan'>Сказочное заморское</p>
              <h2 className='cardTitle'>Нямушка</h2>
              <p className='cardTaste'>c {taste}</p>
              <p className='cardPortion'>{portion} порций</p>
              <p className='cardGift'>{gift > 1 ? gift : ""} {gift === 1 ? 'мышь' : gift === 2 ? 'мыши' : "мышей"} в подарок</p>
              {
                gift === 4 ? <p className='cardGiftExtra'>Заказчик доволен</p> : null
              }

              <div className='cardWeight'>
                <span className='cardWeigth-num'>{weight}</span>
                <span>кг</span>
              </div>
           </div>
           
        {/* Фон и обводка для карточек */}
            {svgBorder(stateHandler(isChecked, disabled))}
            {svgBg()}
        {/* Котей на фоне */}
            <div className = 'cardCat'></div>
              
        </div>

        {/* Футер карточки рендерится в зависимости от состояний */}
        {
          !disabled ?(
            !isChecked ? (
              <div className='cardItemFooter'>{textHandler(id, isChecked)}. <p onClick={()=>{
                if(!disabled){
                  setIsChecked(pervstate => pervstate === true)
                }
              }}>Купи</p></div>
            ):
            <div className='cardItemFooter'>{textHandler(id, isChecked)}</div>
          ) :
          <div className='cardItemFooter' style={{color:'#FFFF66'}}>{textHandler(id, 'disabled')}</div>
        }
    </div>
  )
}

//Вспомогательные функции, для обработки и изменения стилизации и текста, на основе состояния карточки
const stateHandler = (state, disabled) =>{
  if(disabled === false){
    if(!state){
      return {
        activeClass:'cardItem--standart',
        accent:"#1698D9"
      }
    }
    else if(state){
      return {
        activeClass:'cardItem--hovered',
        accent:"#D91667"
      }
    }
  }else{
    return {
      activeClass:'cardItem--disabled',
      accent:"#B3B3B3"
    }
  }
}

const textHandler = (id,state) => {
    if(state === false){
            return 'Чего сидишь? Порадуй коте.'
    }
    else if(state === true){
      if(id === 0){
        return 'Печень утки с артишоками'
      }else if(id === 1){
        return 'Головы щучьи с чесноком'
      }else{
        return 'Филе цыплят в бульоне'
      }
    }
    else if(state === 'disabled'){
      if(id === 0){
        return 'Печалька, утки нет'
      }else if(id === 1){
        return 'Печалька, рыбы нет'
      }else{
        return 'Печалька, куры нет'
      }
    }
}


const svgBorder = (callback) =>  <svg className='cardBorder' width="320" height="480" viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_41_410" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z"/>
</mask>
<path d="M0 42.6762L-2.82843 39.8478L-4 41.0193V42.6762H0ZM42.6762 0V-4H41.0193L39.8478 -2.82843L42.6762 0ZM4 468V42.6762H-4V468H4ZM12 476C7.58173 476 4 472.418 4 468H-4C-4 476.837 3.16345 484 12 484V476ZM308 476H12V484H308V476ZM316 468C316 472.418 312.418 476 308 476V484C316.837 484 324 476.837 324 468H316ZM316 12V468H324V12H316ZM308 4C312.418 4 316 7.58172 316 12H324C324 3.16344 316.837 -4 308 -4V4ZM42.6762 4H308V-4H42.6762V4ZM39.8478 -2.82843L-2.82843 39.8478L2.82843 45.5046L45.5046 2.82843L39.8478 -2.82843Z" fill = {`${callback.accent}`} mask="url(#path-1-inside-1_41_410)"/>
<mask id="path-3-inside-2_41_410" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z"/>
</mask>
<path d="M0 42.6762L-2.82843 39.8478L-4 41.0193V42.6762H0ZM42.6762 0V-4H41.0193L39.8478 -2.82843L42.6762 0ZM4 468V42.6762H-4V468H4ZM12 476C7.58173 476 4 472.418 4 468H-4C-4 476.837 3.16345 484 12 484V476ZM308 476H12V484H308V476ZM316 468C316 472.418 312.418 476 308 476V484C316.837 484 324 476.837 324 468H316ZM316 12V468H324V12H316ZM308 4C312.418 4 316 7.58172 316 12H324C324 3.16344 316.837 -4 308 -4V4ZM42.6762 4H308V-4H42.6762V4ZM39.8478 -2.82843L-2.82843 39.8478L2.82843 45.5046L45.5046 2.82843L39.8478 -2.82843Z" fill = {`${callback.accent}`} mask="url(#path-3-inside-2_41_410)"/>
</svg>


const svgBg = () =>  <svg className='cardBg' width="320" height="480" viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 42.6762V468C0 474.627 5.37259 480 12 480H308C314.627 480 320 474.627 320 468V12C320 5.37258 314.627 0 308 0H42.6762L0 42.6762Z" fill="white"/>
</svg>