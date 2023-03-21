import React from "react";

export function ChallengeButton(params) {

    var [count, setCount] = React.useState(["thing 1", "thing 2"]);

    function increase() {
        setCount(odlValue => {
            return [...odlValue, `Things ${odlValue.length + 1}`]
        })

    }

    function decrease() {
        setCount(count - 1);
    }

    return ( <
        div >
        <
        button onClick = { increase } > + < /button> <
        p key = { count } > { count } < /p> <
        button onClick = { decrease } > - < /button> < /
        div >
    )
}