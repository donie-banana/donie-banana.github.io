function movePipes(pipeElement, speed) {
    setTimeout(() => {
        let right = parseInt(pipeElement.style.right, 10); 
        right += speed; // Move the pipe to the right
        pipeElement.style.right = `${right}px`;

        if (right > window.innerWidth) {
            pipeElement.style.right = '-500px'; 
            pipeElement.style.top = `${getRandomInt(25, 75)}%`; 
        }

        movePipes(pipeElement, speed); 
    }, 25); 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var pipeElement = document.getElementById('pipe-og');
const pipeWidth = pipeElement.clientWidth;
pipeElement.style.display = 'none';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
var numberOfClones = Math.floor(screenWidth / (pipeWidth * 1.5));
var offset = (screenWidth + 500 - pipeWidth * numberOfClones) / numberOfClones + pipeWidth;

console.log(
    `width: ${screenWidth}; height: ${screenHeight}; pipe width: ${pipeWidth}; numberOfClones: ${numberOfClones}; gapSize: ${offset}`
);


for (var i = 1; i <= numberOfClones; i++) {
    var clone = pipeElement.cloneNode(true); 
    clone.id = 'pipe' + i;

    clone.style.position = "absolute";
    clone.style.right = (i * offset * -1) + "px";
    clone.style.top = '' + (getRandomInt(35, 65)) + '%';
    clone.style.display = 'flex';

    var imgChildren = clone.querySelectorAll('img');
    imgChildren.forEach(function(imgChild) {
        randomColor(imgChild, 'randomBrightColorFilter');
    });

    document.body.appendChild(clone);
    movePipes(clone, 4); 
}
