const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i = 0; i <50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: "66f15b9b95d34fa47c9418b8",
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat amet totam quibusdam dolorum perferendis, quia sapiente accusamus ex eum unde tenetur suscipit corrupti, quae, inventore dolor nulla fugit molestiae dolore?",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dk0voghbf/image/upload/v1727435788/YelpCamp/k5uv97v1gwwhmx61e1dy.jpg',
                  filename: 'YelpCamp/k5uv97v1gwwhmx61e1dy'
                },
                {
                  url: 'https://res.cloudinary.com/dk0voghbf/image/upload/v1727435788/YelpCamp/w1jlz6ce4c0ajabf7t3h.jpg',
                  filename: 'YelpCamp/w1jlz6ce4c0ajabf7t3h'
                }
              ]
        })
        await camp.save();
    }

    const c = new Campground({title:"purple field"});
    await c.save();
}

seedDB().then(()=>{
    mongoose.connection.close()
})