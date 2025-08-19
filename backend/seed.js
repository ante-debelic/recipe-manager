const mongoose = require("mongoose");
require("dotenv").config();

const Recipe = require("./models/recipe");
const seedRecipes = require("./data/seedRecipes");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function seedDB() {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("❌ Seeding aborted: running in production mode!");
      mongoose.connection.close();
      return;
    }

    await Recipe.deleteMany({});
    console.log("🗑️ Cleared existing recipes");

    await Recipe.insertMany(seedRecipes);
    console.log("✅ Inserted sample recipes");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDB();
