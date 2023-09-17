import { Schema, model } from 'mongoose';

const schema = Schema({
  title: String,
  content: String,
  expiry: {
    type: Date,
    default: undefined,
    index: {
      expires: 0,
    }
  },
  viewCount: {
    type: Number,
    default: 0,
  }
},
{ timestamps: true }
);

// Using a pre-save hook to update the index, use mongodb's ttl index to 
// routinely delete expired records from the database -> Note that this is a background
// operation that is controlled by the MongoDB server itself, so it is not guaranteed that
// the records will be deleted immediately after the expiry time.
schema.pre('save', function(next) {
  console.log(`pre save: ${this.expiry}`)
  if (this.expiry !== undefined) {
    // Calculate the offset in milliseconds
    const offset = this.expiry - this.createdAt;
    console.log(`pre save: ${offset}`);
    this.expiry.index = {
      expires: offset,
    }
  } 
  next();
});

const Snippet = model('Snippet', schema);

export default Snippet;