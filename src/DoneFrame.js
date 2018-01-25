import React from 'react';


const DoneFrame = (props) => {
    return(
        <div>
            <h2 className = "text-center">{props.doneStatus}</h2>
        </div>

    );
}

export default DoneFrame;