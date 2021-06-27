const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60d46dd566764e45d8a794e1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eos veniam dolorem quibusdam velit, culpa repudiandae ad odit quas ex eveniet deleniti delectus deserunt laboriosam quis? Ratione beatae earum magni.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/abhi-up79/image/upload/v1624767622/YelpCamp/ubkpaluzymhnv9l74ymw.jpg",
          filename: "YelpCamp/ubkpaluzymhnv9l74ymw",
        },
        {
          url: "https://res.cloudinary.com/abhi-up79/image/upload/v1624767624/YelpCamp/d7sklm0paogtamlasr2w.jpg",
          filename: "YelpCamp/d7sklm0paogtamlasr2w",
        },
        {
          url: "https://res.cloudinary.com/abhi-up79/image/upload/v1624767622/YelpCamp/bddwqqflvqmpsdoxlbe3.jpg",
          filename: "YelpCamp/bddwqqflvqmpsdoxlbe3",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
