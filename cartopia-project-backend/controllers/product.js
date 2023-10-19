const Product = require('../models/products')
const db = require('../models/index')

const productItems = [
    {
      'name': "Spaghetti Carbonara",
      'description': "Creamy pasta with bacon and parmesan cheese.",
      'price': 12.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Margherita Pizza",
      'description': "Classic pizza with tomato, mozzarella, and basil.",
      'price': 10.49,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {
    
      'name': "Grilled Chicken Salad",
      'description': "Fresh greens with grilled chicken, tomatoes, and balsamic vinaigrette.",
      'price': 8.99,
      'stock':10,
      'ratings': 5,    
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
  
    
    },
    {

      'name': "Beef Burger",
      'description': "Juicy beef patty with lettuce, tomato, and cheddar cheese.",
      'ratings': 5,
      'stock':10,
      'price': 9.99,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
  
    
    },
    {

      'name': "Vegetable Stir-Fry",
      'description': "Assorted vegetables sautéed in a savory sauce.",
      'price': 11.49,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Seafood Paella",
      'description': "Spanish rice dish with shrimp, mussels, and saffron.",
      'price': 14.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Caesar Salad",
      'description': "Romaine lettuce, croutons, and Caesar dressing.",
      'stock':10,
      'ratings': 5,    
      'price': 7.99,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
    
    },
    {

      'name': "Mushroom Risotto",
      'description': "Creamy risotto with mushrooms and Parmesan cheese.",
      'price': 13.49,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Sushi Combo",
      'description': "Assorted sushi rolls and sashimi.",
      'price': 16.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    },
    {

      'name': "BBQ Pulled Pork Sandwich",
      'description': "Slow-cooked pulled pork with barbecue sauce.",
      'ratings': 5,    
      'stock':10,
      'price': 8.49,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    },
    {

      'name': "Greek Salad",
      'description': "Crisp lettuce, cucumbers, olives, and feta cheese.",
      'stock':10,
      'ratings': 5,    
      'price': 9.49,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
    },
    {

      'name': "Chicken Alfredo",
      'description': "Fettuccine pasta with creamy Alfredo sauce and grilled chicken.",
      'price': 11.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Steak Tacos",
      'description': "Tender steak strips in soft tortillas with salsa and guacamole.",
      'price': 12.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Vegetable Lasagna",
      'description': "Layered pasta with ricotta, spinach, and marinara sauce.",
      'price': 10.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Shrimp Scampi",
      'description': "Sautéed shrimp in garlic butter and white wine sauce.",
      'price': 14.49,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Chocolate Lava Cake",
      'description': "Warm chocolate cake with a molten center.",
      'stock':10,
      'ratings': 5,   
      'price': 6.99,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
  
    
    },
    {
      'name': "Pho Soup",
      'description': "Vietnamese noodle soup with beef or chicken.",
      'stock':10,
      'ratings': 5,    
      'price': 9.99,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
  
    },
    {

      'name': "Tandoori Chicken",
      'description': "Marinated chicken cooked in a tandoor oven.",
      'price': 13.99,
      'stock':10,
      'ratings': 5,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Margarita Cocktail",
      'description': "Classic tequila-based cocktail with lime and salt.",
      'stock':10,
      'ratings': 5,  
      'price': 7.49,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    
    },
    {

      'name': "Caprese Panini",
      'description': "Tomato, mozzarella, and basil in a grilled panini.",
      'stock':10,
      'ratings': 5, 
      'price': 8.99,
      'image': "https://imgs.search.brave.com/lRIar3YNFnkkUCc_UfooO3Jm9O562GtYpC7o09dgKaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA"
    }
  ]
const addProduct = (req, res) => {
  const newProduct = Product(db.sequelize, db.Sequelize.DataTypes).bulkCreate(productItems)
  .then((createdRecords) => {
    console.log('Records inserted successfully:', createdRecords);
    res.status(200).json({message:"added"})
  })
  .catch((error) => {
    console.error('Error inserting records:', error);
    res.status(400).json({message:"err", error})
  });
  console.log(newProduct)
}

module.exports = {addProduct}