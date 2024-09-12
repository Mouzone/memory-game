import {useEffect, useState} from 'react'
import '../styles/App.css'

const cards = [
    "2_of_clubs",
    "2_of_diamonds",
    "2_of_hearts",
    "2_of_spades",
]

function App() {
    // todo: pick 12 random cards from cards
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

    return <div id="cards">
            { cards.map((link, index) =>
                <Card key={index} link={link} handleClick={handleClick}/>)
            }
        </div>
}

function Card({link, handleClick}) {
    return <div onClick={() => handleClick(link)}>
        <img src={`src/assets/cards/${link}.png`} alt="card"/>
    </div>
}

export default App
