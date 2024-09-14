import React from "react"
import { nanoid } from "nanoid"
import Die from "./component/Die"

export default function App(){
  
  const [dice , setDice] = React.useState(allDice())

  function allDice(){
    let randomdice = []
    for(let i = 0 ; i < 10 ; i++){
      randomdice.push({
        value : Math.ceil(Math.random()*6) ,
        isHeld : false ,
        id : nanoid()
      })
    }
    return randomdice
  }

  function roll(){
    setDice(allDice)
  }
   let diceComponent = dice.map(dices => (
   <Die  
      key = {dices.id} 
      values={dices.value}/>))
  
  return(
    <div className="content">
      <div className="diceContainer">
          {diceComponent}
      </div>
          <button className="roll-dice" onClick={roll} >Roll</button>
    </div>
  )
}