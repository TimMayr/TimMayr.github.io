"use strict";
let noOfImages = 7;
let currentLocation = 0;
let wrapper = document.getElementById("wrapper");

for (let i = 0; i < 5; i++) {
    wrapper.innerHTML += '<img alt="tree" class="image" src="./img/' + i + '.jpg">';
}

renderImages();

function renderImages() {
    let images = document.getElementsByClassName("image");

    images[1].classList.add('SecondLevel');
    images[2].id = 'active';
    images[3].classList.add('SecondLevel');
}

function rotateImages(direction) {
    console.log(direction)
    let currentImages = document.images;
    let urls = [noOfImages];

    for (let i = 0; i < noOfImages; i++) {
        urls[i] = './img/' + i + '.jpg';
    }

    if (!direction) {
        if (currentLocation < noOfImages) {
            currentLocation++;
        } else {
            currentLocation = 0;
        }
    } else {
        if (currentLocation > 0) {
            currentLocation--;
        } else {
            currentLocation = noOfImages - 1;
            console.log(currentLocation);
        }
    }

    if (!direction) {
        for (let i = 0; i < 5; i++) {
            if (currentLocation + i < noOfImages - 1) {
                currentImages[i].src = urls[currentLocation + i + 1];
            } else {
                currentImages[i].src = urls[(currentLocation + i + 1) - noOfImages];
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            if (currentLocation + i < noOfImages) {
                currentImages[i].src = urls[(currentLocation + i) - 1];
            } else {
                currentImages[i].src = urls[(currentLocation + i) - noOfImages];
            }
        }
    }


}

function left() {
    rotateImages(true);
}

function right() {
    rotateImages(false);
}