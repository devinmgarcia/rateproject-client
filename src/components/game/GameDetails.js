import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "./GameProvider.js";
import { Link } from "react-router-dom"
import { ReviewContext } from "../review/ReviewProvider.js";


export const GameDetail = (props) => {
  const { getGameById } = useContext(GameContext);
  const { reviews, getReviews } = useContext(ReviewContext)
  const [game, setGame] = useState({})
  const [game_reviews, setReviews] = useState([])
  const [categories, setCategories] = useState([])
  const history = useHistory()
  const {gameId} = useParams()

  useEffect(()=>{
    getReviews()
  },[])

  useEffect(() => {
    getGameById(gameId).then(game => setGame(game));
  }, [gameId]);

  useEffect(()=>{
    setCategories(game.categories)
    const filteredReviews = reviews.filter(review => review.game.id === gameId)
    setReviews(filteredReviews)
  },[game])

  return (
    <article className="game_detail">
          <section key={`game--${game.id}`} className="game">
            <div className="game_title">
                {game.title}         
            </div>
            <div className="game_description">
                by: {game.designer}         
            </div>
            <div className="game_description">
                {game.description}         
            </div>
            <div className="game_description">
                Release Date: {game.year_released}         
            </div>
            <div className="game_description">
                Max Players: {game.num_of_players}         
            </div>
            <div className="game_description">
                Estimated Playtime (hours): {game.play_time}     
            </div>
            <div className="game_description">
                Recommeded Age: {game.recommended_age}+      
            </div>
            <div className="game_description">
              Categories:
                {categories?.map(category => 
                <li>{category.name}</li>
                  )} 
            </div>
            <div className="game_reviews">
              Reviews:
                {reviews?.map(review => 
                <li>{review.article}</li>
                  )} 
            </div>
          </section>
          <button onClick={()=>{history.push(`/game/${game.id}/review`)}}>Review Game</button>
    </article>
  );
};