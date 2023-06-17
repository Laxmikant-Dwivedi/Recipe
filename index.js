let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let userInp = document.getElementById("user-inp").value;


searchBtn.addEventListener("click",() => {
    let userInp = document.getElementById("user-inp").value;
    if(userInp.length == 0) {
        result.innerHTML = `<h3>This field cannot be empty</h3>`;
    }
    else{
        fetch(url + userInp).
then((response) => response.json())
.then((data) => {
    console.log(data);
    let myMeal = data.meals[0];
    console.log(myMeal);
    console.log(myMeal.strMealThumb);
    console.log(myMeal.strMeal);
    console.log(myMeal.strArea);
    console.log(myMeal.strInstructions);
    let cnt = 1;
    let ingredients = [];
    for(let i in myMeal){
        let ingredient = "";
        let measure = "";
        if(i.startsWith("strIngredient") && myMeal[i]){
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + cnt];
            cnt += 1;
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    console.log(ingredients);

    result.innerHTML = `<img src = ${myMeal.
        strMealThumb}>

        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h2>${myMeal.strArea}</h2>
        </div>
        <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>

    `;

    let ingredientCon = document.getElementById("ingredient-con");
    let parent = document.createElement("ul");
    let recipe = document.getElementById("recipe");
    let hideRecipe = document.getElementById("hide-recipe");
    let showrecipe = document.getElementById("show-recipe");

    ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
      }); 

      hideRecipe.addEventListener("click", ()=>{
         recipe.style.display = "none";
      });
      showrecipe.addEventListener("click",() =>{
        recipe.style.display = "block";
      });
}).catch(()=>{
    result.innerHTML = `<h3>Sahi se Likho Yarr </h3>`;
});
    }
});

