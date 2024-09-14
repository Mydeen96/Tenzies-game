import React from "react"
import { nanoid } from "nanoid"
import Die from "./component/Die"

export default function App(){
  
  const [dices , setDice] = React.useState(allDice())

  function generateNewDice(){
            return{
              id : nanoid() ,
              value : Math.ceil(Math.random()*6) ,
              isHeld : false
            }
  }

  function allDice(){
    let randomdice = []
    for(let i = 0 ; i < 10 ; i++){
        randomdice.push( generateNewDice() )
    }
    return randomdice
  
  }
  function rollDice(){
    setDice(oldDice => oldDice.map(dice => {
      return dice.isHeld ?
                          dice :
                          generateNewDice()

    }))
  }

  function holdDice(id){
    console.log(id)
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? 
                            {...dice ,
                               isHeld :!dice.isHeld} : 
                                                    dice
    }))
  }

   let diceComponent = dices.map(dice => (
   <Die  
      key = {dice.id} 
      values={dice.value}
      isHeld = {dice.isHeld}
      holdDice = { () => holdDice(dice.id)}
    />))
  return(
    <div className="content">
      <div className="diceContainer">
          {diceComponent}
      </div>
          <button className="roll-dice" onClick={rollDice} >Roll</button>
    </div>
  )
}