import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"

export const GameForm = () => {
    const history = useHistory()
    const { categories, getCategories } = useContext(CategoryContext)
    const {getGames, createGame} = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: "",
        num_of_players: 0,
        play_time: 0,
        recommended_age: 0,
        categories: []
    })

    useEffect(() => {
        getCategories()
        getGames()
    }, [])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        if (event.target.name === "title") {
            newGameState.title = event.target.value
        }
        else if (event.target.name === "description") {
            newGameState.description = event.target.value
        }
        else if (event.target.name === "designer") {
            newGameState.designer = event.target.value
        }
        else if (event.target.name === "year_released") {
            newGameState.year_released = event.target.value
        }
        else if (event.target.name === "num_of_players") {
            newGameState.num_of_players = parseInt(event.target.value)
        }
        else if (event.target.name === "recommended_age") {
            newGameState.recommended_age = parseInt(event.target.value)
        }
        else if (event.target.name === "categories") {
            newGameState.categories = [parseInt(event.target.value)]
        }
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="date" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number Of Players: </label>
                    <input type="number" name="num_of_players" required autoFocus className="form-control"
                        value={currentGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recommended_age">Recommended Age: </label>
                    <input type="number" name="recommended_age" required autoFocus className="form-control"
                        value={currentGame.recommended_age}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                    <select type="text" name="categories" required autoFocus className="form-control"
                        value={currentGame.categories}
                        onChange={changeGameState}
                    >
                        {
                            categories.map(
                                category => <option value={category.id}>{category.name}</option>
                            )
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        year_released: currentGame.year_released,
                        num_of_players: parseInt(currentGame.num_of_players),
                        play_time: parseInt(currentGame.play_time),
                        recommended_age: parseInt(currentGame.recommended_age),
                        categories: currentGame.categories
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
