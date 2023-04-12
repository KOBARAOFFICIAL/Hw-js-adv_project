const charactersList = document.getElementById('characters-list');
const characterDetails = document.getElementById('character-details');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const backToListBtn = document.getElementById('back-to-list');
const characterName = document.getElementById('name');
const characterHeight = document.getElementById('height');
const characterMass = document.getElementById('mass');
const characterHairColor = document.getElementById('hair-color');
const characterSkinColor = document.getElementById('skin-color');
const characterEyeColor = document.getElementById('eye-color');
const characterBirthYear = document.getElementById('birth-year');
const characterGender = document.getElementById('gender');
const characterHomeworld = document.getElementById('homeworld');
const characterFilms = document.getElementById('films');
const characterSpecies = document.getElementById('species');
const characterVehicles = document.getElementById('vehicles');
const characterStarships = document.getElementById('starships');
const characterCreated = document.getElementById('created');
const characterEdited = document.getElementById('edited');
const characterUrl = document.getElementById('url');

let currentPage = 1;
let characters = [];

async function fetchCharacters(page) {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();
    characters = data.results;
    renderCharacters(characters);
    renderPagination(data.previous, data.next);
}

function renderCharacters(characters) {
    charactersList.innerHTML = '';
    characters.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.classList.add('character-item');
        characterItem.textContent = character.name;
        characterItem.addEventListener('click', () => {
            showCharacterDetails(character);
        });
        charactersList.appendChild(characterItem);
    });
}

function renderPagination(previous, next) {
    prevBtn.classList.toggle('hidden', !previous);
    nextBtn.classList.toggle('hidden', !next);
}

function showCharacterDetails(character) {
    charactersList.classList.add('hidden');
    characterDetails.classList.remove('hidden');
    characterName.textContent = character.name;
    characterHeight.textContent = character.height;
    characterMass.textContent = character.mass;
    characterHairColor.textContent = character.hair_color;
    characterSkinColor.textContent = character.skin_color;
    characterEyeColor.textContent = character.eye_color;
    characterBirthYear.textContent = character.birth_year;
    characterGender.textContent = character.gender;
    characterHomeworld.textContent = character.homeworld;
    characterFilms.textContent = character.films.join(', ');
    characterSpecies.textContent = character.species.join(', ');
    characterVehicles.textContent = character.vehicles.join(', ');
    characterStarships.textContent = character.starships.join(', ');
    characterCreated.textContent = character.created;
    characterEdited.textContent = character.edited;
    characterUrl.textContent = character.url;
}

function hideCharacterDetails() {
    charactersList.classList.remove('hidden');
    characterDetails.classList.add('hidden');
}

prevBtn.addEventListener('click', () => {
    currentPage--;
    fetchCharacters(currentPage);
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
});

backToListBtn.addEventListener('click', () => {
    hideCharacterDetails();
    charactersList.scrollTo(0, 0);
});

function init() {
    fetchCharacters(currentPage);
}

init();
