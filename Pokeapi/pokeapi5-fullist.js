let monPrev2;
let monPrev1;
let monNext1;
let monNext2;
let path = 'https://pokeapi.co/api/v2/pokemon/';
let listPath = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';
let table = document.getElementById("body");
let result = document.getElementById("result");
let tableContent = result.innerHTML;

// getMoreInfo("https://pokeapi.co/api/v2/pokemon/1");

loadPokemon()

function getMoreInfo(url) {
    tableContent = result.innerHTML;

    let pokemon = new XMLHttpRequest();
    pokemon.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let currentMon = JSON.parse(this.response);
            console.log(currentMon)
            let ability = currentMon.abilities[0].ability.name;

            let secondAbility = "None";
            let hiddenAbility = "None";

            for (let i = -2; i <= 2; i++) {
                generateDifferentMon(i, currentMon);
            }

            if (currentMon.abilities.length > 1) {
                if (currentMon.abilities[1].is_hidden) {
                    hiddenAbility = currentMon.abilities[1].ability.name;
                } else {
                    secondAbility = currentMon.abilities[1].ability.name;
                }
            } else if (currentMon.abilities.length > 2) {
                hiddenAbility = currentMon.abilities[2].ability.name;
                secondAbility = currentMon.abilities[1].ability.name;
            }

            result.innerHTML = "<div id=\"wrapper\">\n" + "        <h1 id=\"name\" style='text-transform: capitalize'>" + currentMon.name + "</h1>\n" + "        <div id=\"imgWrapper\">\n" + "            <img src=\"" + currentMon.sprites.front_default + "\">\n" + "        </div>\n" + "        <div id=\"Info\">\n" + "\n" + "            <div class=\"group\">\n" + "                <p>Weight: " + currentMon.weight / 10 + " kg</p>\n" + "                <p>Height: " + currentMon.height + " cm</p>\n" + "            </div>\n" + "            <div class=\"group\">\n" + "                <p style='text-transform: capitalize'>Type: " + currentMon.types[0].type.name + "</p>\n" + "                <p style='text-transform: capitalize'>Secondary-Type: " + currentMon.types[1].type.name + " </p>\n" + "            </div>\n" + "            <div class=\"group\">\n" + "                <p style='text-transform: capitalize'>Ability: " + ability + "</p>\n" + "                <p style='text-transform: capitalize'>Alternative-Ability: " + secondAbility + "</p>\n" + "                <p style='text-transform: capitalize'>Hidden Ability: " + hiddenAbility + "</p>\n" + "            </div>\n" + "        </div>\n" + "    </div>\n" + "    <div id=\"navbar\">\n" + "        <div onclick=\"getMoreInfo()\" style='text-transform: capitalize;'>" + monPrev2 + "</div>\n" + "        <div onclick=\"getMoreInfo()\" style='text-transform: capitalize;'>" + monPrev1 + "</div>\n" + "        <div onclick=\"getMoreInfo()\" style='text-transform: capitalize;'>" + currentMon.name + "</div>\n" + "        <div onclick=\"getMoreInfo()\" style='text-transform: capitalize;'>" + monNext1 + "</div>\n" + "        <div onclick=\"getMoreInfo()\" style='text-transform: capitalize;'>" + monNext2 + "</div>\n" + "    </div>\n" + "    <div id=\"backToStart\" onclick=\"backToStart()\" style=\"cursor: pointer\">Back To List</div>";
        }
    }

    pokemon.open('GET', path + url, true);
    pokemon.send();
}

function generateDifferentMon(difference, currentMon) {
    let list = new XMLHttpRequest();
    let prevMon = new XMLHttpRequest();
    let index = currentMon + difference;

    if (index < 1) {
        index += 1154
    }

    let newMonUrl = "https://pokeapi.co/api/v2/pokemon/1/";

    list.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let pokemonList = JSON.parse(this.response);
                newMonUrl = pokemonList.results[index].url;
            }
        }
    }

    prevMon.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let answer = JSON.parse(this.responseText)
            switch (difference) {
                case -2:
                    monPrev2 = answer.name;
                    break;
                case -1:
                    monPrev1 = answer.name;
                    break;
                case 1:
                    monNext1 = answer.name;
                    break;
                case 2:
                    monNext2 = answer.name;
                    break;
            }
        }
    }

    prevMon.open('GET', newMonUrl, true);
    prevMon.send();
}

function backToStart() {
    result.innerHTML = tableContent;
}

function loadPokemon() {
    let list = new XMLHttpRequest();
    let output = "";

    list.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let pokemonList = JSON.parse(this.responseText);
            console.log(pokemonList);
            for (let i = 0; i < pokemonList.count - 1; i++) {
                output += `<tr><td>  ${(i + 1)}  </td><td style="background-color: #d5d1d6; color: black; text-transform: capitalize"> ${pokemonList.results[i].name}  </td><td><div style="cursor: pointer; background-color: #666267" onclick="getMoreInfo(${i + 1})"><p>Get More Info</p></div></td></tr>`;
            }
            table.innerHTML += output;
        }
    };

    list.open('GET', listPath, true);
    list.send();
}