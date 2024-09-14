
export default function die(props){
        const styles = {
                backgroundColor : props.isHeld ? "#59E391" : "white" 
        }
   return( 
        <div className="diceFace" style = {styles}  onClick={props.holdDice}>
        <div className="die1">{props.values}</div>
        </div>)
}