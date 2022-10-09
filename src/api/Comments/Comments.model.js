const { Schema, model, models } = require("mongoose");
const scoreRegex = new RegExp("/[0-5]/");

const messageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    homeId: {
      type: Schema.Types.ObjectId,
      ref: "Homes",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Debe ingresar un mensaje"],
    },
    score: {
      type: {
        cleanliness: {
          type: Number,
          required: [true, "ingrese su calificacion de cleanliness"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
        Accuracy: {
          type: Number,
          required: [true, "ingrese su calificacion de Accuracy"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
        Communication: {
          type: Number,
          required: [true, "ingrese su calificacion de Communication"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
        Location: {
          type: Number,
          required: [true, "ingrese su calificacion de Location"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
        Checkin: {
          type: Number,
          required: [true, "ingrese su calificacion de Checkin"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
        Value: {
          type: Number,
          required: [true, "ingrese su calificacion de Value"],
          match: [scoreRegex, "Ingrese un numero de 0 a 5"],
        },
      },
      required: true,
    },
  },
  { timestamps: true }
);
const Comments = model("Comments", messageSchema);

module.exports = Comments;