//DOM Info-sidan, variablar
const planetName = document.getElementById('name')
const aboutPlanet = document.getElementById('about')
const circumferencePlanet= document.getElementById('circumference')
const distanceToSol = document.getElementById('distance')
const dayTemp = document.getElementById('maxtemp')
const nightTemp = document.getElementById('minstemp')
const moon = document.getElementById('mon')
const planetsColor = document.getElementById('planet');
const planets = document.querySelectorAll('.plan');
const planetColor=['yellow',
'gray',
'#E7CDCD',
'#428ED4',
'#EF5F5F',
'#E29468',
'#C7AA72',
'#C9D4F1',
'#7A91A7',
]
//API-Anrop
const baseUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
async function getApiKey() {
    try {
        const response = await fetch(`${baseUrl}/keys`, {
            method: 'POST',
        })
        if (!response.ok) {
            throw new Error('Misslyckades att hämta API-nyckel');
        }
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error(error);
    }
}
async function getBodies() {
    try {
        const apiKey = await getApiKey();
        const response = await fetch(`${baseUrl}/bodies`, {
            method: 'GET',
            headers: {'x-zocom': apiKey}
        });
        if (!response.ok) {
            throw new Error('Misslyckades att hämta stora himlakroppar');
        }
        const data = await response.json();
        return data.bodies;
    } catch (error) {
        console.error(error);
    }
}

// Evnelistiner för varje planet, index.html
planets.forEach((div, index) => {
        div.addEventListener('click', () => {
            window.location.href = 'info.html?index=' + index;
        });
    });

document.addEventListener('DOMContentLoaded', async function () {
        try {
            const himla = await getBodies();
            const urlParams = new URLSearchParams(window.location.search);
            const index = urlParams.get('index');
            if (index !== null && !isNaN(index) && index >= 0 && index < himla.length) {
                const selectedItem = himla[index];
                print(selectedItem);
                setColor(index);
            } else {
                console.log('Ingen val ännu.');
            }

        } catch (error) {
            console.error(error);
        }
    });

// Hämta rätt färg för planet i info sidan, STYLE
function setColor(index){
    planetsColor.style.backgroundColor = planetColor[index];
}

// skriva ut infon i sidan, info.html
function print(object) {
    planetName.append(`${object.name}`)
    aboutPlanet.append(`${object.desc}`)
    circumferencePlanet.append(`${object.circumference}`)
    distanceToSol.append(`${object.distance}`)
    dayTemp.append(`${object.temp.day}`)
    nightTemp.append(`${object.temp.night}`)
    moon.textContent = object.moons.join(', ');
}


