import express from 'express';
import { League } from '../models/leagueModel.js';
import { User } from '../models/userModel.js';

const leagueRouter = express.Router();


// create new league and update user leagues
leagueRouter.post('/', async (request, response) => {
  try {
    if (!request.body.name || !request.body.user) {
      return response.status(400).send({ message: 'Send all required fields' });
    }

    // Check for existing league with the same name
    const existingLeague = await League.findOne({ name: request.body.name });
    if (existingLeague) {
      return response.status(409).send({ message: 'League name already exists' });
    }

    const userUpdate = {
      name: request.body.user.name,
      points: 0
    }

    const newLeague = {
      name: request.body.name,
      users: [userUpdate],
    };

    const league = await League.create(newLeague);

    // Update user with the new league
     const result = await User.findByIdAndUpdate(
      request.body.user.id,
      { $push: { leagues: league._id } },
      { new: true } // Return the updated document
    );

    return response.status(201).send(league);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// join league and update user leagues
leagueRouter.post('/join', async (request, response) => {
  try {
    if (!request.body.name || !request.body.user) {
      return response.status(400).send({ message: 'Send all required fields' });
    }

    // Check for existing league with the same name
    const existingLeague = await League.findOne({ name: request.body.name });
    if (!existingLeague) {
      return response.status(409).send({ message: 'League name not exists' });
    }
    

    const userUpdate = {
      name: request.body.user.name,
      points: 0
    }


     // Update league with the new user
     existingLeague.users.push(userUpdate);
     await existingLeague.save();

    // Update user with the new league
     const result2 = await User.findByIdAndUpdate(
      request.body.user.id,
      { $push: { leagues: existingLeague._id } },
      { new: true } // Return the updated document
    );

    return response.status(201).send(existingLeague);
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

  //get league by id
  leagueRouter.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
    
      const league = await League.findById(id);
  
      if (!league) {
        return response.status(404).json({ message: 'League not found' });
      }
  
      return response.status(200).json(league);
    } catch (error) {
      console.error(error.message);
      response.status(500).send({ message: 'Internal Server Error' });
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