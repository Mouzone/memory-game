import {useEffect, useState} from 'react'
import '../styles/App.css'

// todo: remove all face_of_x then rename all face_of_x2 to face_of_x
const suits = ["clubs", "diamonds", "hearts", "spades"]
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
    "ace", "jack", "king", "queen"]
let all_cards = ["red_joker", "black_joker"]
values.forEach(value => {
    suits.forEach(suit => {
        all_cards.push(value + "_of_" + suit)
    })
})
let cards

function App() {
    // takes "instructions", "difficulty", "game", "endGame"
    const [curr_screen, setCurrScreen] = useState("instructions")
    let text= "Select unique cards consecutively without repetition"

    function nextScreen(curr_screen) {
        if (curr_screen === "instructions") {
            setCurrScreen("difficulty")
        } else if (curr_screen === "difficulty") {
            setCurrScreen("game")
        } else if (curr_screen === "game") {
            setCurrScreen("end")
        } else {
            setCurrScreen("difficulty")
        }
    }

    if (curr_screen === "game") {
        return <Game nextScreen={nextScreen}/>
    }

    text = (curr_screen === "difficulty") ?  "Select Difficulty" : text
    text = (curr_screen === "end") ? "You Won" : text
    return <Modal type={curr_screen}
                  text={text}
                  nextScreen={nextScreen}/>
}

function Modal({type, text, nextScreen}) {
    const button_mappings = {
        4: "Easy",
        8: "Medium",
        12: "Hard"
    }

    return <div id="modal">
        <h1> {text} </h1>
        {["instructions", "end"].includes(type) && <button onClick={() => nextScreen(type)}> Continue </button>}
        {type === "difficulty" && <div id="buttons"> {
            Object.entries(button_mappings)
                .map(([num_cards, label]) => {
                    return <button key={label}
                                   onClick={() => {
                                       cards = shuffleArray(all_cards).slice(0, parseInt(num_cards))
                                       nextScreen("difficulty")
                                   }}
                                   style={{cursor: "pointer"}}>
                        {label}
                    </button>
            })} </div>}
    </div>
}

function Game({nextScreen}) {
    const [best_score, setBestScore] = useState(0)
    const [curr_score, setCurrScore] = useState(0)
    const [seen, setSeen] = useState([])


    function handleClick(link) {
        const new_curr_score = seen.includes(link)
            ? 0
            : curr_score + 1
        const new_best_score = Math.max(best_score, seen.includes(link)
            ? curr_score
            : curr_score + 1)
        const new_seen = seen.includes(link)
            ? []
            : [...seen, link]

        if (new_best_score === cards.length) {
            nextScreen("game")
        }

        setCurrScore(new_curr_score)
        setBestScore(new_best_score)
        setSeen(new_seen)
    }


    return <>
                <Scores curr_score={curr_score} best_score={best_score}/>
                <div id="cards">
                    { shuffleArray(cards).map((link, index) =>
                        <Card key={index} link={link} handleClick={handleClick}/>)
                    }
                </div>
            </>
}

function Scores({curr_score, best_score}) {
    return <div id="scores">
        <div id="curr-score"> Current Score: {curr_score} </div>
        <div id="best-score"> Best Score: {best_score} </div>
    </div>
}

function Card({link, handleClick}) {
    return <div onClick={() => handleClick(link)}>
        <img src={`/cards/${link}.png`} alt="card"/>
    </div>
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default App
