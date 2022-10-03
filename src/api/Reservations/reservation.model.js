const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    date: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    guests: {
      type: {
        adults: {
          type: Number,
          required: true,
        },
        childs: {
          type: Number,
          required: false,
        },
        babys: {
          type: Number,
          required: false,
        },
        pets: {
          type: Number,
          required: false,
        },
      },
      required: true
    },
    home:{
        type: Schema.Types.ObjectId,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

const Reservation = model('Reservation',reservationSchema)

module.exports = Reservation