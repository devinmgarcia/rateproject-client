import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "./GameProvider.js";
import { Link } from "react-router-dom"


export const GameDetail = (props) => {
  const { getGameById } = useContext(GameContext);
  const [game, setGame] = useState({})
  const history = useHistory()
  const {gameId} = useParams()


  useEffect(() => {
    getGameById(gameId).then(game => setGame(game));
  }, [gameId]);

  return (
    <article className="game_detail">
          <section key={`game--${game.id}`} className="game">
            <div className="game_title">
                {game.title}         
            </div>
            <div className="game_description">
                {game.description}         
            </div>
          </section>
    </article>
  );
};