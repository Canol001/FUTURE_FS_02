const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const Recipe = require('./models/Recipe');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the 'uploads' directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/recipe-detail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'recipe-detail.html')));
app.get('/favourites', (req, res) => res.sendFile(path.join(__dirname, 'views', 'favourites.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, 'views', 'upload.html')));
app.get('/featured-recipe', (req, res) => res.sendFile(path.join(__dirname, 'views', 'featured-recipe.html')));

// Fetch all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// Fetch a single recipe by ID
app.get('/api/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Error fetching recipe" });
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
        console.error("Error searching recipes:", error);
        res.status(500).json({ message: "Error searching recipes" });
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
        console.error("Error fetching related recipes:", error);
        res.status(500).json({ message: "Error fetching related recipes" });
    }
});


// ✅ Upload recipe API
app.post('/api/recipes/upload', upload.single('image'), async (req, res) => {
    try {
        const { name, description, prepTime, ingredients, procedure } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Ensure ingredients and procedure are parsed as arrays
        let ingredientsArray = [];
        let procedureArray = [];

        try {
            ingredientsArray = JSON.parse(ingredients);
        } catch (error) {
            // Handle error if ingredients are not a valid array string
            return res.status(400).json({ error: 'Ingredients must be a valid array' });
        }

        try {
            procedureArray = JSON.parse(procedure);
        } catch (error) {
            // Handle error if procedure is not a valid array string
            return res.status(400).json({ error: 'Procedure must be a valid array' });
        }

        if (!name || !description || !image || !prepTime || !ingredientsArray.length || !procedureArray.length) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        // Create a new recipe object with ingredients and procedure as proper arrays
        const newRecipe = new Recipe({
            name,
            description,
            image,
            prepTime,
            ingredients: ingredientsArray, // Store as an array
            procedure: procedureArray, // Store as an array
        });

        await newRecipe.save();
        res.status(201).json({ message: 'Recipe uploaded successfully!', recipe: newRecipe });

    } catch (error) {
        console.error('Error uploading recipe:', error);
        res.status(500).json({ message: 'Error uploading recipe', error: error.message });
    }
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Access from mobile: http://<YOUR_LOCAL_IP>:${PORT}`);
});
