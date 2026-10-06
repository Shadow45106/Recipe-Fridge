const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const recipesFilePath = path.join(__dirname, 'recipes.json');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/cuisine-data", (req, res) => {
  fs.readFile(recipesFilePath, 'utf8', (err, data) => {
    const recipes = JSON.parse(data);
    const occurrences = recipes.reduce((accumulator, recipe) => {
      const currentCuisine = recipe.cuisine;
      if (currentCuisine) {
        if (accumulator[currentCuisine]) {
          accumulator[currentCuisine] += 1;
        } else {
          accumulator[currentCuisine] = 1;
        }
      }
      return accumulator;
    }, {});
    console.log(occurrences);
    res.json(occurrences);
  });
});


app.get("/recipes", (req, res) => {
  // Read the recipes from the JSON file
  fs.readFile(recipesFilePath, 'utf8', (err, data) => {
    // we read in the file path and if there is an error we will log it to the console
    // the err variable holds the error if there is one 
    // the data variable holds the contents of the file 
    // we need to parse the data from the file into a JavaScript object so we can send it as a response
    const recipes = JSON.parse(data);
    // we send the recipes as a JSON response
    res.json(recipes);
  });
});

app.post("/recipes", (req, res) => {

  const newRecipe = req.body;
  fs.readFile(recipesFilePath, 'utf8', (err, data) => {
    const recipes = JSON.parse(data);
    recipes.push(newRecipe);


    fs.writeFile(recipesFilePath, JSON.stringify(recipes), () => { });
  });

  res.send("Adding a new recipe!");
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:", port);
});
