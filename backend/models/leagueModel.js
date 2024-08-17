import mongoose from 'mongoose';
//import {User} from './backend/models/userModel.js';

const leagueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [{
      name: {
        type: String,
        required: false,
      },
      points: {
        type: Number,
        default: 0,
      },
    }],
  },
  {
    timestamps: true,
  }
);

export const League = mongoose.model('League', leagueSchema);