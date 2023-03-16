var express = require('express');
const connection = require('../config/database-config');
const MovieModel = require('../models/MovieModel');
var router = express.Router();


/* Add new movie*/
router.post('/movies', async (req, resp, next) => {
  const { Title, Lead_Actor, Length, Description } = req.body;

  try {
    const newMovie = new MovieModel({
      Lead_Actor:Lead_Actor,
      Length:Length,
      Description:Description,
      Title:Title,
    });

    const savedMovie = await newMovie.save();
    resp.json(savedMovie);

  } catch (error) {
    next(error);
  }
});


/* GET all movie listing. */
router.get('/movies', async (req, resp, next) => {

  try {
    const movielist = await MovieModel.find();

    var records = [];
    movielist.forEach(movi => {
      if (movi) {
        const moviesRecord =
        {
          id: movi._id,
          Title:movi.Title,
          Lead_Actor:movi.Lead_Actor,
          Length:movi.Length,
          Description:movi.Description,
        }
        records.push(moviesRecord);
      }
    });
    console.log(records)
    resp.json(records);
  } catch (error) {
    next(error);
  }
});

/* Get movie based on id*/
router.get('/movies/:id', async (req, resp, next) => {

  try {
    const movi = await MovieModel.findById(req.params.id);

    resp.json(
      {
        id: movi._id,
        Title:movi.Title,
        Lead_Actor:movi.Lead_Actor,
        Length:movi.Length,
        Description:movi.Description,
      }
    );

  } catch (error) {
    next(error);
  }
});

/* Edit existing movie based on id*/
router.put('/movies/:id', async (req, resp, next) => {

  try {
    const requestBody = { 
      Title:req.body.Title, 
      Lead_Actor:req.body.Lead_Actor, 
      Length:req.body.Length,
      Description:req.body.Description 
    };

    let movi_rec = await MovieModel.findById(req.params.id);

    if (!movi_rec)
    return res.status(404).json({ msg: 'Movie record not found' });

    const updatedMovi = await MovieModel.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

    resp.json(updatedMovi);

  } catch (error) {
    next(error);
  }
});

/* Delete movie based on id*/
router.delete('/movies/:id', async (req, resp, next) => {

  try {
    const movi = await MovieModel.findByIdAndDelete(req.params.id);
    resp.send(`Movie ${movi.Title} record deleted!`)
  } catch (error) {
    next(error);
  }
});

module.exports = router;