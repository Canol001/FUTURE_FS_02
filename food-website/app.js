require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Recipe = require('./models/Recipe');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodDB';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve HTML pages
const pages = ['index', 'recipe-detail', 'favourites', 'about', 'contact', 'upload', 'featured-recipe'];
pages.forEach(page => app.get(`/${page}`, (req, res) => res.sendFile(path.join(__dirname, 'views', `${page}.html`))));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
// API Routes

// Fetch all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
});

// Fetch a single recipe by ID
app.get('/api/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error });
    }
});

// Search recipes by name or description
app.get('/api/recipes/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: 'Search query is required' });

        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error searching recipes", error });
    }
});

// Fetch related recipes based on ingredients
app.get('/api/recipes/related', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "Recipe ID is required" });

        const currentRecipe = await Recipe.findById(id);
        if (!currentRecipe || !currentRecipe.ingredients) {
            return res.status(404).json({ message: "Recipe not found or has no ingredients" });
        }

        const relatedRecipes = await Recipe.find({
            ingredients: { $in: currentRecipe.ingredients },
            _id: { $ne: id }
        }).limit(3);

        res.json(relatedRecipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching related recipes", error });
    }
});

// Upload a new recipe
app.post('/api/recipes/upload', upload.single('image'), async (req, res) => {
    try {
        const { name, description, prepTime, ingredients, procedure } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !description || !image || !prepTime || !ingredients || !procedure) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const ingredientsArray = JSON.parse(ingredients);
        const procedureArray = JSON.parse(procedure);

        const newRecipe = new Recipe({
            name,
            description,
            image,
            prepTime,
            ingredients: ingredientsArray,
            procedure: procedureArray
        });

        await newRecipe.save();
        res.status(201).json({ message: 'Recipe uploaded successfully!', recipe: newRecipe });

    } catch (error) {
        res.status(500).json({ message: 'Error uploading recipe', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
