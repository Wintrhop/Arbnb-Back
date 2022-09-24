const { Schema, model, models } = require("mongoose")
const priceRegex = new RegExp("^(0*[1-9][0-9]*([,.][0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$")

const homeSchema = new Schema(
    {
        location: {
            type: String,
            required: [true, 'Debe ingresar donde se encuentra ubicado el inmueble.']
        },
        price: {
            type: String,
            required: [true, 'Debe ingresar un precio.'],
            match: [priceRegex, 'Ingrese un precio valido superior a 0.00']
        },
        comments: {
            //model comments
        },
        images:{
            type: String,
            required: [true, 'Debe ingresar las imagenes del inmueble.']

        },
        amenities:{
            type: Array,
            required: [true, 'Debe ingresar las comodidades del inmueble.']
        },
        score:{
            // model score
        },
        capacity:{
            type: String,
            required: [true, 'Debe ingresar la capacidad total del inmueble.']
        },
        guests:{
            // historial de huespedes
        },
        dates:{
            type: String,
            required: [true, 'Debe ingresar las fechas de disponibilidad del inmueble.']
        },
        rooms:{
            type: Number,
            required: [true, 'Debe ingresar el numero de habitaciones del inmueble.']
        },
        reservations:{
            // model reservations
        }
    },
    {
        timestamps:true
    }
)

const Homes = model("Homes", homeSchema)

module.exports = Homes;