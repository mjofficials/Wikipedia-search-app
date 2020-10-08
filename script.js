
const form = document.querySelector('.js-search-form');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('.js-search-input').value;
    const searchQuery = inputValue.trim();
    const searchResults = document.querySelector('.js-search-results');

    // Clear the previous results

    searchResults.innerHTML = '';

    const spinner = document.querySelector('.js-spinner');

    spinner.classList.remove('hidden');


    try {
        const results = await searchWikipedia(searchQuery);

        //Display an alert when there are no results
        if (results.query.searchinfo.totalhits === 0) {
            alert('No results found. Try different keywords');
            return;
        }
        displayResults(results);
    } catch (err) {
        console.log(err);
        alert('Failed to search wikipedia');

    } finally {
        spinner.classList.add('hidden');
    }

}

async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(results) {
    const searchResults = document.querySelector('.js-search-results');

    results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchResults.insertAdjacentHTML(
            'beforeend',
            `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
        </div>`
        );
    });
}
// LINK TAG
//<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>

// DESCRIPTION SPAN ELEMENT
//<span class="result-snippet">${result.snippet}</span><br>