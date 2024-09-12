import {useEffect, useState} from 'react'
import '../styles/App.css'

// todo: remove all face_of_x then rename all face_of_x2 to face_of_x
// todo: create difficulty setting with instructions modal
const suits = ["clubs", "diamonds", "hearts", "spades"]
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "ace", "jack", "king", "queen"]
const all_cards = ["red_joker", "black_joker"]
values.forEach(value => {
    suits.forEach(suit => {
        all_cards.push(value + "_of_" + suit)
    })
})

const cards = shuffleArray(all_cards).slice(0, 12)

function App() {
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
        <img src={`src/assets/cards/${link}.png`} alt="card"/>
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
