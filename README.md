# About this project

This project simply compares between two different movies based on different KPIs (like IMDB Rating).

It uses the `omdbapi` where you need to get an API-Key.
You can get a free one [here](http://www.omdbapi.com/apikey.aspx).

You must add the API-Key into `index.js` and replay `<Your API KEY` with the actual key.

````js
    async fetchData (searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey:'<Your API KEY>',
                s: searchTerm
            }
        });
````

You can run some tests with fake data by opening `test.html` within the html folder.
The tests are based on `Mocha` and uses `Chai`.

The whole repository is based on the Udemy course [The Modern Javascript Bootcamp Course](https://www.udemy.com/course/javascript-beginners-complete-tutorial/).
