const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    prepTime: String,
    ingredients: [String], // Array of ingredients
    procedure: [String]    // Array of steps for preparation
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
