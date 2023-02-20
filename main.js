const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener(`click`,getMealList);
mealList.addEventListener(`click` ,getMealRecipe);
recipeCloseBtn.addEventListener(`click`,() => {
    mealDetailsContent.parentElement.classList.remove(`showRecipe`);
})

function getMealList() {
     const searchInputTxt = document.getElementById('search-input').value.trim()

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
    
let html = '' ;
if(data.meals){
    data.meals.forEach(meal => {
        html += `
        <div class="meal-items" data-id= ${meal.idMeal}>
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                </div>
            <a href="#" data-id= ${meal.idMeal}  class="recipe-btn">Get Recipe</a>
        </div>
        `
        
            });
            mealList.classList.remove(`notFound`);
        }else{
            html = "Sorry , we didn't find any meal!" ;
            mealList.classList.add(`notFound`);
        }
        mealList.innerHTML= html;
    });
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>

        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>

        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add(`showRecipe`)
}

