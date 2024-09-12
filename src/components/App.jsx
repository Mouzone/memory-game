import { useState } from 'react'
import '../styles/App.css'

function App() {
    // todo: pick 12 random cards from cards
    const cards = [
        "src/assets/cards/2_of_clubs.png",
        "src/assets/cards/2_of_diamonds.png",
        "src/assets/cards/2_of_hearts.png",
        "src/assets/cards/2_of_spades.png",
    ]

    return <div id="cards">
            { cards.map((link, index) =>
                <Card key={index} link={link}/>)
            }
        </div>
}

function Card({link}) {
    return <div>
        <img src={link} alt="card"/>
    </div>
}

export default App
