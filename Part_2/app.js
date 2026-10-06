document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json()
    for (recipe of recipes) {
        // Create the container that will hold the recipe
        const recipeContainer = document.createElement("div");
        
        //create the name tag (h3), add text to it, glue it onto the container
        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);
       
        //same with cuisine and time tags
        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);
        
        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);
        
        //create the unordered list element for the ingredients
        const ingredientsListTag = document.createElement("ul");
       
        //create the list items for the ingredients list
        for (ingredient of recipe.ingredients) {
            const ingredientsListItemTag = document.createElement("li");
            ingredientsListItemTag.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItemTag);
        }
        
        recipeContainer.appendChild(ingredientsListTag);
        
        recipeContainer.appendChild(document.createElement("br"));
        
        //create the ordered list element for the steps of the recipe
        const stepsListTag = document.createElement("ol");
        
        //create the list items for the steps list
        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = step;
            stepsListTag.appendChild(stepsListItemTag);
        }

        recipeContainer.appendChild(stepsListTag);
        
        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);
    }


    const recipeForm = document.querySelector("form");
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const newRecipe = {};

        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        newRecipe.ingredients = event.target.ingredients.value.split("\n");
        newRecipe.steps = event.target.instructions.value.split("\n");
        
        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        })
        
    })    

    const cuisineResponse = await fetch("http://localhost:3000/cuisine-data");
    const cuisineData = await cuisineResponse.json();
    
    const xValues = Object.keys(cuisineData);
    const yValues = Object.values(cuisineData);
    
    new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#199161ff",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#e30f3dff",
                    "#a3eb36ff",
                    "#f5e30fff",
                    "#410ff5",
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Cuisine Distribution"
            }
        }
    
    });

})
