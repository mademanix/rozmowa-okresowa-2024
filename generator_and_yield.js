// Generator do obsługi zapytań asynchronicznych
function* fetchDataGenerator() {
    let id = 1;
    while (true) {
        const data = yield fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json());
        console.log(`Pobrano dane: ${JSON.stringify(data)}`);
        id++;
    }
}

// Pomocnicza funkcja do zarządzania generatorem
async function runDataFetcher() {
    const generator = fetchDataGenerator();
    
    // Pierwsze uruchomienie generatora
    let result = generator.next();

    while (!result.done && result.value) {
        try {
            const data = await result.value;
            // Wywołanie następne z przesłaniem pobranych danych do generatora
            result = generator.next(data);
        } catch (err) {
            console.error("Błąd podczas pobierania danych", err);
        }
    }
}

// Start fetching
runDataFetcher();
