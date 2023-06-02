const mongoose= require('mongoose');
const tickerSchema= mongoose.Schema({
    name:String,
    last:String,
    buy:String,
    sell:String,
    volume:String,
    base_unit: String,
})

const Ticker= mongoose.model('Ticker',tickerSchema);
module.exports={Ticker};