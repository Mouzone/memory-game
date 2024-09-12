import {useEffect, useState} from 'react'
import '../styles/App.css'

// todo: pick 12 random cards from cards
const cards = [
    "2_of_clubs",
    "2_of_diamonds",
    "2_of_hearts",
    "2_of_spades",
]

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
                <div id="scores">
                    <div id="curr-score"> Current Score: {curr_score} </div>
                    <div id="best-score"> Best Score: {best_score} </div>
                </div>
                <div id="cards">
                    { shuffleArray(cards).map((link, index) =>
                        <Card key={index} link={link} handleClick={handleClick}/>)
                    }
                </div>
            </>
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
