import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { ReviewContext } from "./ReviewProvider"


export const ReviewForm = () => {
    const { createReview } = useContext(ReviewContext)
    const history = useHistory()
    const {gameId} = useParams()
    const [currentReview, setCurrentReview] = useState({
            game_id: parseInt(gameId),
            article: ""
        })
   
        const changeReviewState = (event) => {
            const newReviewState = { ...currentReview }
            if (event.target.name === "article") {
                newReviewState.article = event.target.value
            }
            setCurrentReview(newReviewState)
        }

    return (
        <form className="reviewForm">
        <h2 className="reviewForm__title">Review This Game</h2>
        <fieldset>
            <div className="form-group">
                <textarea type="text" name="article" required autoFocus className="form-control"
                        value={currentReview.article}
                        onChange={changeReviewState}
                    ></textarea>
            </div>
        </fieldset>
        <button type="submit" onClick={event => {
            event.preventDefault()

            const review = {
                game_id: currentReview.game_id,
                article: currentReview.article
            }

            createReview(review).then(()=> history.push(`/games/${currentReview.game_id}`))
        }}>Save</button>
        </form>
    )
}
