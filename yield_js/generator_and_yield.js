function* fetchDataGenerator() {
    let id = 1;
    while (true) {
        const data = yield fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json());
        console.log(`${JSON.stringify(data)}`);
        id++;
    }
}

async function runDataFetcher() {
    const generator = fetchDataGenerator();
    
    let result = generator.next();

    while (!result.done && result.value) {
        try {
            const data = await result.value;
            result = generator.next(data);
        } catch (err) {
            console.error("dude you totally fucked up", err);
        }
    }
}

// Start fetching
runDataFetcher();
