const countriesBox = document.querySelector("#countries .row");
const searchInp = document.getElementById("search");

async function getCountry(url) {
  let response = await fetch(url);
  let responseJson = await response.json();

  return responseJson;
}

function createCard(countries) {
  countries.forEach((country) => {
    countriesBox.innerHTML += `
          <div class="col-md-3">
          <div class="card" style="width: 18rem">
            <img src="${country.flags.png}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <div class="card-item">
                <h6>Population:</h6>
                <span>${country.population}</span>
              </div>
              <div class="card-item">
                <h6>Region:</h6>
                <span>${country.region}</span>
              </div>
              <div class="card-item">
                <h6>Capital:</h6>
                <span>${country.capital}</span>
              </div>
            </div>
          </div>
        </div>
          `;
  });
}

async function getCountries() {
  let countries = await getCountry("https://restcountries.com/v3.1/all");
  //   let response = await fetch("https://restcountries.com/v3.1/all");
  //   let countries = await response.json();

  createCard(countries);
}

getCountries();

searchInp.addEventListener("keyup", searchCountry);

async function searchCountry(e) {
  let countries = await getCountry("https://restcountries.com/v3.1/all");

  let filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );

  countriesBox.innerHTML = "";

  createCard(filteredCountries);
}
