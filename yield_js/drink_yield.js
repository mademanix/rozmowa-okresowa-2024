const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
let drinkId = 11000; // lowest possible value

async function* drinkGenerator() {
	while (true) {
		const response = await fetch(apiUrl + drinkId);
		const data = await response.json();
		yield data;
		drinkId++;
	}
}

const generator = drinkGenerator();

async function loadNextDrink() {
	const { value } = await generator.next();
	
	if (value && value.drinks && value.drinks.length > 0) {
		const drinkData = value.drinks[0];
		displayDrinkInfo(drinkData);
	} else {
		console.error(`'dude sth is smurfed up! no drink with id ${drinkId - 1} for you today'`);
	}
}

function displayDrinkInfo(drink) {
	document.getElementById('drink-name').textContent = drink.strDrink;
	document.getElementById('drink-glass').textContent = drink.strGlass;
	document.getElementById('drink-instructions').textContent = drink.strInstructions;
	document.getElementById('drink-thumb').src = drink.strDrinkThumb;
	
	const ingredientsTable = document.getElementById('ingredients-table');
	ingredientsTable.innerHTML = '';
	
	for (let i = 1; i <= 15; i++) {
		const ingredient = drink[`strIngredient${i}`];
		const measure = drink[`strMeasure${i}`];
		
		if (ingredient && measure) {
			const row = `<tr><td>${ingredient}</td><td>${measure}</td></tr>`;
			ingredientsTable.insertAdjacentHTML('beforeend', row);
		}
	}
}

document.getElementById('next-drink-btn').addEventListener('click', loadNextDrink);

// gut old JS
loadNextDrink();