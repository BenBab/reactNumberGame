import React from 'react';
import _ from 'lodash';



const Stars = (props) => {
 // random number of stars constant i have now put up a level in the game components state and pass it in as props
 // this should stop the random stars re-rendering
 // const numberOfStars = 1 + Math.floor(Math.random()*9);
 


 // old way of pushing star icons into the stars array
 // let stars = [];
 // for (let i=0; i<numberOfStars; i++){
 //   stars.push(<i key={i} className="fa fa-star"></i>)
 //  }

//  return(
//    <div className= "col-sm-5">
//      {stars}      
//    </div>
//   );
//  } 


  return(
    <div className= "col-sm-5">
      {_.range(props.numberOfStars).map(i =>
          <i key={i} className="fa fa-star"></i>
        )}      
    </div>
  );
} 


export default Stars;
