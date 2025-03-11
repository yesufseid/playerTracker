// models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shoeNumber: { type: Number, required: true },
  startTime: { type: Date, default: Date.now },
  active:{type:Boolean , default:true}
});

const Player =mongoose.models.Player || mongoose.model('Player', playerSchema);

export default Player;
