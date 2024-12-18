function Translate() {
    function B2N() {    
        console.log(`${input}, ${outputEl}, B2N`);

        const inputSplit = input.split(' ');
        let output = '';

        inputSplit.forEach(binary => {
            let counter = 128;
            let decimal = 0;

            for (const char of binary) {
                if(char === '1') {
                    decimal += counter
                }

                counter /= 2;
            }

            output += String.fromCharCode(decimal);
        });

        outputEl.value = output;
    }

    function N2B() {
        console.log(`${input}, ${outputEl}, N2B`);
        
        let outputStep1 = []; 
    
        for (const char of input) { 
            let asciiDec = char.charCodeAt(0); 
            outputStep1.push(asciiDec); 
        }

        let output = '';
    
        outputStep1.forEach(asciiDec => {
            let steps = parseInt(asciiDec);
            let binary = '';
            let minus = 128;

            while(true) {

                if(steps - minus >= 0) {
                    binary += '1';
                    steps -= minus;
                } else {
                    binary += '0';
                }

                if (minus === 1) {
                    break;
                }

                minus /= 2;
            }

            output += `${binary} `;

        });

        outputEl.value = output;
    }

    const whatEl = document.getElementById("what");
    const inputEl = document.getElementById("input");
    const outputEl = document.getElementById("output");

    const what = whatEl.value;
    const input = inputEl.value;

    if (what !== 'auto') {
        (what === 'B2N') ? B2N() : N2B();
    } else {
        console.log(`auto`);  

        let isBinary = true;
        
        for (const char of input) { 
            if (char !== '1' && char !== '0' && char !== " ") {
                isBinary = false;
                break;
            }
        }   

        isBinary ? B2N() : N2B();
    }
}

console.log("SUCCESS: JS loaded");