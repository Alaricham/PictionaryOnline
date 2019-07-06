
import React from 'react';

const User = (props) => {
    return (<div>
        {props.user.name ? <h1>Logged as {props.user.name}</h1> :
            <div className="container">
                <h1>Select User Name</h1>
                <input onKeyPress={props.inputName} type="text" />
            </div>
        }
    </div>
    )

}

export default User;