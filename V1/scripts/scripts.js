async function fetchCharacters(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function renderCharacters(characters) {
    const charactersListEl = document.getElementById('charactersList');
    charactersListEl.innerHTML = '';

    characters.results.forEach(character => {
        const characterCardEl = document.createElement('div');
        characterCardEl.className = 'characterCard';
        characterCardEl.textContent = character.name;
        characterCardEl.addEventListener('click', () => {
            showCharacterDetails(character);
        });
        charactersListEl.appendChild(characterCardEl);
    });

    if (characters.previous) {
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Назад';
        backBtn.addEventListener('click', () => {
            fetchCharacters(characters.previous).then(renderCharacters);
        });
        charactersListEl.appendChild(backBtn);
    }

    if (characters.next) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Вперед';
        nextBtn.addEventListener('click', () => {
            fetchCharacters(characters.next).then(renderCharacters);
        });
        charactersListEl.appendChild(nextBtn);
    }
}

function showCharacterDetails(character) {
    const characterDetailsEl = document.getElementById('characterDetails');
    characterDetailsEl.innerHTML = '';

    const characterTableEl = document.createElement('table');
    characterTableEl.innerHTML = `
        <tr>
            <th>Name</th>
            <td>${character.name}</td>
        </tr>
        <tr>
            <th>Height</th>
            <td>${character.height}</td>
        </tr>
        <tr>
            <th>Mass</th>
            <td>${character.mass}</td>
        </tr>
        <tr>
            <th>Hair Color</th>
            <td>${character.hair_color}</td>
        </tr>
        <tr>
            <th>Skin Color</th>
            <td>${character.skin_color}</td>
        </tr>
        <tr>
            <th>Eye Color</th>
            <td>${character.eye_color}</td>
        </tr>
        <tr>
            <th>Birth Year</th>
            <td>${character.birth_year}</td>
        </tr>
        <tr>
            <th>Gender</th>
            <td>${character.gender}</td>
        </tr>
        <tr>
            <th>Homeworld</th>
            <td>${character.homeworld}</td>
        </tr>
        <tr>
            <th>Films</th>
            <td>${character.films}</td>
        </tr>
        <tr>
            <th>Species</th>
            <td>${character.species}</td>
        </tr>
        <tr>
            <th>Vehicles</
            </th>
            <td>${character.vehicles}</td>
        </tr>
        <tr>
            <th>Starships</th>
            <td>${character.starships}</td>
        </tr>
    `;
    characterDetailsEl.appendChild(characterTableEl);
}

window.addEventListener('DOMContentLoaded', () => {
const apiUrl = 'https://swapi.dev/api/people/';
fetchCharacters(apiUrl).then(renderCharacters);
});
