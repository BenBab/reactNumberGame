import React, { Component } from 'react';
import {Icon} from 'react-fa'
import _ from 'lodash';

import Answer from './Answer';
import Button from './Button';
import Stars from './Stars';

import Numbers from './Numbers';
import DoneFrame from './DoneFrame';



//bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};




class Game extends Component {
  state = {
    selectedNumbers: [],
    randomNumberOfStars : 1 + Math.floor(Math.random()*9),
    usedNumbers : [],
    answerIsCorrect : null,
    redrawsLeft : 4,
    doneStatus : null,
};

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){return;}
    this.setState(prevState => ({
      answerIsCorrect : null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unSelectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect : null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc + n, 0)
    }));
};

  acceptAnswer = () => {
    
     this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect : null,
      randomNumberOfStars : 1 + Math.floor(Math.random()*9),
    }), this.updateDoneStatus);

  };

  redraw = () => {
    if (this.state.redrawsLeft === 0){return;}
    this.setState(prevState => ({
      randomNumberOfStars : 1 + Math.floor(Math.random()*9),
      answerIsCorrect : null,
      selectedNumbers : [],
      redrawsLeft : prevState.redrawsLeft -1,
    }), this.updateDoneStatus); 
};


  possibleSolutions = (state) => {
    const possibleNumbers = _.range (1,10).filter(number => state.usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers,state.randomNumberOfStars);
  }


  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9){
        return { doneStatus : 'Done Nice!'};
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)){
        return { doneStatus : 'Game Over!'};
      }

    });
  };


  render() {
    return (
      <div className="container">
        <h3 >Play Nine</h3>
        <hr/>
        <div className= "row">
          <Stars numberOfStars = {this.state.randomNumberOfStars}/>
          <Button selectedNumbers= {this.state.selectedNumbers}
                  checkAnswer = {this.checkAnswer}
                  answerIsCorrect = {this.state.answerIsCorrect}
                  acceptAnswer = {this.acceptAnswer}
                  redraw = {this.redraw}
                  redrawsLeft = {this.state.redrawsLeft}
          />
          <Answer selectedNumbers= {this.state.selectedNumbers}
                  unSelectNumber = {this.unSelectNumber}
                  />
        </div>
        <br/>

        {this.state.doneStatus 
          ?
            <DoneFrame doneStatus = {this.state.doneStatus}/> 
          :
            <Numbers selectedNumbers={this.state.selectedNumbers}
                 selectNumber = {this.selectNumber}
                 usedNumbers = {this.state.usedNumbers}/>
         }

      </div>
    );
  }
}

export default Game;
