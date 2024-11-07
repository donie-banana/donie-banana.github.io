function movePipes(pipeElement, speed) {
    setTimeout(() => {
        console.log("This runs after 25ms");
        let right = parseInt(pipeElement.style.right, 10); // Get the current position
        right += speed; // Move the pipe to the right
        pipeElement.style.right = '' + right + 'px';

        // Check if the pipe is out of the screen and reset it if necessary
        if (right > window.innerWidth) {
            pipeElement.style.right = '-500px'; // Reset position
            pipeElement.style.top = `${getRandomInt(25, 75)}%`; // Randomize the vertical position again
        }

        movePipes(pipeElement, speed); // Recursively move the pipe
    }, 25); 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var pipeElement = document.getElementById('pipe-og');
var numberOfClones = 3;
var offset = 550;

for (var i = 1; i <= numberOfClones; i++) {
    var clone = pipeElement.cloneNode(true); 
    clone.id = 'pipe' + i;

    clone.style.position = "absolute";
    clone.style.right = (i * offset * -1) + "px";
    clone.style.top = '' + (getRandomInt(25, 75)) + '%';

    var imgChildren = clone.querySelectorAll('img');
    imgChildren.forEach(function(imgChild) {
        randomColor(imgChild, 'randomBrightColorFilter');
    });

    document.body.appendChild(clone);
    movePipes(clone, 4); // Move each pipe independently
}
