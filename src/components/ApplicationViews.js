import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider";
import { GameDetail } from "./game/GameDetails";
import { GameForm } from "./game/GameForm";
import { GameList } from "./game/GameList";
import { GameProvider } from "./game/GameProvider";
import { ReviewForm } from "./review/ReviewForm";
import { ReviewProvider } from "./review/ReviewProvider";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <ReviewProvider>
          <GameProvider>
            <CategoryProvider>
              <Route exact path="/games">
                <GameList />
              </Route>
              <Route exact path="/games/:gameId(\d+)">
                <GameDetail />
              </Route>
              <Route exact path="/games/new">
                <GameForm />
              </Route>
              <Route exact path="/game/:gameId(\d+)/review">
                <ReviewForm />
              </Route>
            </CategoryProvider>
          </GameProvider>
        </ReviewProvider>
      </main>
    </>
  );
};
