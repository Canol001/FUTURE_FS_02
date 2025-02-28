const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Ensure this path is correct

mongoose.connect('mongodb://127.0.0.1:27017/foodDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const recipes = [
    {
        name: "Chapati",
        image: "/images/chapati.jpg",
        description: "Soft and layered flatbread, a staple in East African cuisine.",
        prepTime: "30 mins",
        ingredients: [
            "2 cups all-purpose flour",
            "1 cup warm water",
            "1 teaspoon salt",
            "2 tablespoons vegetable oil"
        ],
        procedure: [
            "Mix flour and salt in a bowl.",
            "Add warm water and oil, mixing to form a dough.",
            "Knead for 10 minutes until smooth, then let it rest for 20 minutes.",
            "Roll into small balls, flatten into circles, and cook on a skillet until golden brown."
        ]
    },
    {
        name: "Ugali",
        image: "/images/ugali.jpg",
        description: "A dense maize meal dish, commonly eaten in Kenya.",
        prepTime: "20 mins",
        ingredients: [
            "2 cups maize flour",
            "4 cups water",
            "1 teaspoon salt (optional)"
        ],
        procedure: [
            "Boil water in a pan.",
            "Gradually add maize flour while stirring to avoid lumps.",
            "Cook for 5-10 minutes, stirring continuously until firm."
        ]
    },
    {
        name: "Sukuma Wiki",
        image: "/images/sukuma.jpg",
        description: "Collard greens sautéed with onions and tomatoes.",
        prepTime: "15 mins",
        ingredients: [
            "1 bunch of sukuma wiki, chopped",
            "1 onion, chopped",
            "2 tomatoes, diced",
            "2 tablespoons vegetable oil"
        ],
        procedure: [
            "Heat oil in a pan and sauté onions until soft.",
            "Add tomatoes and cook until they break down.",
            "Add sukuma wiki, stir, and cook for 5 minutes."
        ]
    },
    {
        name: "Nyama Choma",
        image: "/images/nyama-choma.jpg",
        description: "Grilled meat, often goat or beef, served with kachumbari.",
        prepTime: "1 hour",
        ingredients: [
            "1 kg goat or beef meat",
            "Salt to taste",
            "Black pepper",
            "1 teaspoon garlic paste",
            "Juice of 1 lemon"
        ],
        procedure: [
            "Marinate meat with spices and lemon juice for 30 minutes.",
            "Grill over charcoal until cooked, turning occasionally.",
            "Serve with kachumbari (tomato and onion salad)."
        ]
    },
    {
        name: "Githeri",
        image: "/images/githeri.jpg",
        description: "A mix of boiled maize and beans, flavored with onions and spices.",
        prepTime: "45 mins",
        ingredients: [
            "2 cups maize kernels",
            "1 cup beans",
            "1 onion, chopped",
            "2 tomatoes, chopped"
        ],
        procedure: [
            "Boil maize and beans together until soft.",
            "Sauté onions and tomatoes in oil.",
            "Add maize and beans, stir well, and cook for 10 minutes."
        ]
    },
    {
        name: "Matoke",
        image: "/images/matoke.jpg",
        description: "Cooked green bananas in a rich, flavorful stew.",
        prepTime: "30 mins",
        ingredients: [
            "6 green bananas, peeled",
            "1 onion, chopped",
            "2 tomatoes, chopped",
            "1 teaspoon salt",
            "1 teaspoon turmeric",
            "2 tablespoons vegetable oil"
        ],
        procedure: [
            "Heat oil in a pan and sauté onions until soft.",
            "Add tomatoes, salt, and turmeric, cooking until soft.",
            "Add chopped bananas and stir well.",
            "Cover and simmer for 20 minutes until tender."
        ]
    },
    {
        name: "Mukimo",
        image: "/images/mukimo.jpg",
        description: "Mashed potatoes mixed with pumpkin leaves, maize, and beans.",
        prepTime: "40 mins",
        ingredients: [
            "5 potatoes, peeled",
            "1 cup maize kernels",
            "1 cup beans",
            "1 bunch pumpkin leaves, chopped",
            "Salt to taste"
        ],
        procedure: [
            "Boil potatoes, maize, and beans until soft.",
            "Mash everything together and mix with sautéed onions.",
            "Serve hot as a side dish."
        ]
    },
    {
        name: "Mutura",
        image: "/images/mutura.jpg",
        description: "Kenyan blood sausage made with minced meat and spices.",
        prepTime: "1 hour",
        ingredients: [
            "500g minced meat",
            "1/2 cup cooked blood",
            "1 teaspoon salt",
            "1 teaspoon black pepper",
            "1 teaspoon coriander powder",
            "Sausage casing"
        ],
        procedure: [
            "Mix minced meat with cooked blood and spices.",
            "Stuff into sausage casing and boil for 30 minutes.",
            "Grill over charcoal until crispy."
        ]
    },
    {
        name: "Pilau",
        image: "/images/pilau.jpg",
        description: "Spiced rice dish often made with beef or chicken.",
        prepTime: "1 hour",
        ingredients: [
            "2 cups rice",
            "500g beef, cubed",
            "2 onions, chopped",
            "2 tomatoes, chopped",
            "2 tablespoons pilau masala",
            "4 cups beef broth"
        ],
        procedure: [
            "Sauté onions until golden brown.",
            "Add beef, tomatoes, and pilau masala. Cook until soft.",
            "Add rice and broth, cover, and simmer until cooked."
        ]
    },
    {
        name: "Nyama Choma",
        image: "/images/nyama_choma.jpg",
        description: "Grilled meat, often goat or beef, served with kachumbari.",
        prepTime: "1 hour",
        ingredients: [
            "1 kg goat or beef meat",
            "Salt to taste",
            "Black pepper",
            "1 teaspoon garlic paste",
            "Juice of 1 lemon"
        ],
        procedure: [
            "Marinate meat with spices and lemon juice for 30 minutes.",
            "Grill over charcoal until cooked, turning occasionally.",
            "Serve with kachumbari (tomato and onion salad)."
        ]
    },
    {
        name: "Mandazi",
        image: "/images/mandazi.jpg",
        description: "Fried dough that is slightly sweet, often enjoyed with tea.",
        prepTime: "30 mins",
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup sugar",
            "1 teaspoon baking powder",
            "1/2 cup coconut milk",
            "Oil for frying"
        ],
        procedure: [
            "Mix flour, sugar, and baking powder.",
            "Add coconut milk to form a dough.",
            "Roll out, cut into pieces, and deep-fry until golden brown."
        ]
    },
    {
        name: "Samosa",
        image: "/images/samosa.jpg",
        description: "Crispy pastry filled with spiced minced meat or vegetables.",
        prepTime: "45 mins",
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup water",
            "1/2 kg minced meat or potatoes",
            "1 onion, chopped",
            "1 teaspoon curry powder",
            "Salt to taste"
        ],
        procedure: [
            "Prepare dough by mixing flour and water, then roll out thin sheets.",
            "Cook minced meat or potatoes with onions and curry powder.",
            "Fill and fold into triangles, then deep-fry until golden brown."
        ]
    },
    {
        name: "Kachumbari",
        image: "/images/kachumbari.jpg",
        description: "A refreshing salad of tomatoes, onions, and coriander.",
        prepTime: "10 mins",
        ingredients: [
            "2 tomatoes, chopped",
            "1 onion, sliced",
            "1 bunch coriander, chopped",
            "Juice of 1 lemon",
            "Salt to taste"
        ],
        procedure: [
            "Mix tomatoes, onions, and coriander in a bowl.",
            "Add lemon juice and salt.",
            "Toss well and serve fresh."
        ]
    },
    {
        name: "Tilapia Fry",
        image: "/images/tilapia_fry.jpg",
        description: "Deep-fried tilapia, often served with ugali.",
        prepTime: "45 mins",
        ingredients: [
            "1 whole tilapia, cleaned",
            "1 teaspoon salt",
            "1 teaspoon black pepper",
            "1 teaspoon turmeric",
            "Oil for frying"
        ],
        procedure: [
            "Season the tilapia with salt, pepper, and turmeric.",
            "Heat oil in a pan and fry the fish until golden brown.",
            "Serve hot with ugali and kachumbari."
        ]
    },
    {
        name: "Mahindi Choma",
        image: "/images/mahindi_choma.jpg",
        description: "Grilled maize, a popular street food in Kenya.",
        prepTime: "20 mins",
        ingredients: [
            "4 ears of maize",
            "Salt to taste",
            "Chili powder (optional)",
            "Butter (optional)"
        ],
        procedure: [
            "Grill maize over an open flame, turning occasionally.",
            "Sprinkle with salt and chili powder for extra flavor.",
            "Serve hot with butter if desired."
        ]
    },
    {
        name: "Bhajia",
        image: "/images/bhajia.jpg",
        description: "Crispy potato fritters coated in a spiced gram flour batter.",
        prepTime: "30 mins",
        ingredients: [
            "4 large potatoes, sliced",
            "1 cup gram flour",
            "1 teaspoon salt",
            "1 teaspoon turmeric",
            "1 teaspoon cumin",
            "1 cup water",
            "Oil for frying"
        ],
        procedure: [
            "Mix gram flour, salt, turmeric, and cumin with water to form a batter.",
            "Dip potato slices in the batter, ensuring they are well coated.",
            "Deep-fry in hot oil until golden brown and crispy.",
            "Serve hot with chutney or tomato sauce."
        ]
    },
    {
        name: "Mutura",
        image: "/images/mutura.jpg",
        description: "Kenyan-style sausage made with minced meat, blood, and spices.",
        prepTime: "1 hour",
        ingredients: [
            "500g minced meat",
            "1/2 cup cooked blood",
            "1 teaspoon salt",
            "1 teaspoon black pepper",
            "1 teaspoon coriander powder",
            "Sausage casing"
        ],
        procedure: [
            "Mix minced meat with cooked blood and spices.",
            "Stuff the mixture into the sausage casing and secure the ends.",
            "Boil the sausage for 30 minutes until firm.",
            "Grill over charcoal until crispy and browned.",
            "Slice and serve with kachumbari."
        ]
    },
    {
        name: "Samosa",
        image: "/images/samosa.jpg",
        description: "Crispy pastry triangles filled with spiced minced meat or vegetables.",
        prepTime: "45 mins",
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup water",
            "1/2 kg minced meat or mashed potatoes",
            "1 onion, chopped",
            "1 teaspoon curry powder",
            "Salt to taste",
            "Oil for frying"
        ],
        procedure: [
            "Prepare dough by mixing flour and water, then roll out thin sheets.",
            "Cook minced meat or mashed potatoes with onions, curry powder, and salt.",
            "Fill and fold into triangles, sealing the edges.",
            "Deep-fry in hot oil until golden brown and crispy.",
            "Serve hot with chutney or sauce."
        ]
    },
    {
        name: "Mbaazi wa Nazi",
        image: "/images/mbaazi_wa_nazi.jpg",
        description: "Pigeon peas cooked in rich coconut milk, a Swahili delicacy.",
        prepTime: "45 mins",
        ingredients: [
            "2 cups pigeon peas",
            "1 onion, chopped",
            "2 tomatoes, chopped",
            "1 cup coconut milk",
            "1 teaspoon salt",
            "1 teaspoon turmeric",
            "2 tablespoons vegetable oil"
        ],
        procedure: [
            "Boil pigeon peas until tender, then drain excess water.",
            "Sauté onions and tomatoes in oil until soft.",
            "Add the boiled peas, salt, and turmeric, stirring well.",
            "Pour in coconut milk and simmer for 10 minutes.",
            "Serve hot with chapati or rice."
        ]
    },
    {
        name: "Kaimati",
        image: "/images/kaimati.jpg",
        description: "Sweet, deep-fried dumplings coated in a sugary syrup.",
        prepTime: "30 mins",
        ingredients: [
            "2 cups all-purpose flour",
            "1 teaspoon yeast",
            "1/2 cup sugar",
            "1/2 cup water",
            "Oil for frying"
        ],
        procedure: [
            "Mix flour, yeast, and water to form a thick batter.",
            "Let the batter rest for 30 minutes until it rises.",
            "Heat oil and drop small spoonfuls of batter into the oil.",
            "Fry until golden brown, then remove and drain excess oil.",
            "Coat with sugar syrup and serve warm."
        ]
    }
    
    // Add the remaining 25 recipes following the same format...
];

async function seedDB() {
    await Recipe.deleteMany({}); // Clear old data
    await Recipe.insertMany(recipes);
    console.log("Database seeded with 30 Kenyan foods!");
    mongoose.connection.close();
}

seedDB();
