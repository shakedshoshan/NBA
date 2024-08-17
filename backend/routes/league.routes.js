import express from 'express';
import { League } from '../models/leagueModel.js';

const leagueRouter = express.Router();

leagueRouter.post('/', async (request, response) => {
        try {
          if (
            !request.body.name 
          ) {
            return response.status(400).send({
              message: 'Send all required fields: name',
            });
          }
          const newLeague = {
            name: request.body.name,
            users: request.body.users
          };
      
          const league = await League.create(newLeague);
      
          return response.status(201).send(league);
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
        }
});

  //get all league
  leagueRouter.get('/', async (req, res) => {
    try {
      const leagues = await League.find({});
      return res.status(200).json({
        count: leagues.length,
        data: leagues});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({massage:error.message});
    }
  });

  

  //update league new user
  leagueRouter.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.users
      ) {
        return response.status(400).send({
          message: 'Send all required fields: users',
        });
      }
  
      const { id } = request.params;
  
      const result = await League.findByIdAndUpdate(
        id,
        { $push: { users: request.body.users } },// Use $push for adding to an array
        // { $push: { 'users.$.point': request.body.users.point } }, 
        { new: true, runValidators: true } // Return updated document and validate
      );
  
      if (!result) {
        return response.status(404).json({ message: 'league not found' });
      }
  
      return response.status(200).json({result});
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  
  // delete existing user from league
  leagueRouter.delete('/:id/users/:userId', async (request, response) => {
    try {
      const { id, userId } = request.params;
  
      // Find the league document by ID
      const league = await League.findByIdAndUpdate(id, {
        // Use $pull operator to remove the user with the specified userId
        $pull: { users: { _id: userId } }, // Use _id for user identification
      });
  
      if (!league) {
        return response.status(404).json({ message: 'League not found' });
      }
  
      // Check if the user with the specified userId was actually present
      const userIndex = league.users.findIndex(user => user._id.toString() === userId);
      if (userIndex === -1) {
        return response.status(404).json({ message: 'User not found in league' });
      }
  
      await league.save(); // Save the updated league document
  
      return response.status(200).json({ message: 'User deleted from league' });
    } catch (error) {
      console.error(error.message);
      response.status(500).send({ message: 'Internal Server Error' });
    }
  });
  

  // update existing user 
  




export default leagueRouter;