import React from "react"
import { nanoid } from "nanoid"
import Die from "./component/Die"
import Confetti from 'react-confetti'

export default function App(){
  
  const [dices , setDice] = React.useState(allDice())
  const [tenzies,setTenzies] =  React.useState(false)


  React.useEffect(() => {
    const allHeld = dices.every(dice => dice.isHeld )
    const firstValue = dices[0].value
    const allSameValue = dices.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  },[dices])

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
    if(tenzies){
      setTenzies(false)
      setDice(allDice)
    }
    else{
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ?
                            dice :
                            generateNewDice()
  
      }))
    }
  }

  function holdDice(id){
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
      {tenzies && <Confetti />}
      <h1 className="heading">Tenzies</h1>
      <h1 className="subtext">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h1>
      <div className="diceContainer">
          {diceComponent}
      </div>
          <button className="roll-dice" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
    </div>
  )
}