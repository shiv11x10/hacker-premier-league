const express = require("express");

const Team = require("../models/team");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    const team = new Team({
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    team.save().then(createdData => {
      res.status(201).json({
        message: "Data added successfully",
        data: {
          ...createdData
        }
      });
    });
  }
);

router.get("", (req, res, next) => {
  const teamQuery = Team.find();
  let fetcheddata;
  teamQuery
    .then(data => {
      res.status(200).json({
        message: "Data fetched successfully!",
        data: data
      });
    });
});

router.put(
  "/win/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.put(
  "/lose/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.put(
  "/tie/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

module.exports = router;
