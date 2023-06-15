import express from "express";
import playerController from "../../controllers/Players/player.controller";
const playerRoute = express.Router();

playerRoute.post("/player", playerController.addPlayer);
playerRoute.put("/player/:playerId", playerController.updatePlayer);

export default playerRoute;
