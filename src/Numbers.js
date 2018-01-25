import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
  //const arrayOfNumbers = _.range(1,10);

const numberClassName = (num) =>{
  if (props.usedNumbers.indexOf(num) >= 0){
    return 'used';
  }
  if (props.selectedNumbers.indexOf(num) >= 0){
    return 'selected';
  }
}

const isUsed = (number) => {
  if (props.usedNumbers.indexOf(number) >= 0){
    return;
  }
  return () => props.selectNumber(number)

}

  return(
    
    <div className = "thumbnail text-center">
      <div >
      {Numbers.list.map((number,i) =>
          <span key={i} 
                className={numberClassName(number)}
                onClick =  {isUsed(number)}
                >{number}</span>
        )}
     </div>
    </div>
  );
} 

Numbers.list = _.range(1,10);

export default Numbers;