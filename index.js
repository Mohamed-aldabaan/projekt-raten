// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input
const prompt = require('prompt-sync')({ sigint: true });

// Test that prompt is working 
// let number = prompt('What is your name? ');
// console.log(`User's input is: ${number}`);

// Feel free to edit / remove the line above, this is just to test the package
//  Although we may want to use the user's name for something 



// Funktion zum Generieren einer zufälligen 4-stelligen Geheimzahl.

function ertelleGeheimNummer() {
    const zahlen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let geheim = '';
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * zahlen.length);
        const zahl = zahlen.splice(index, 1); 
        geheim += zahl;
        // console.log(zahl);
    }
    return geheim;
}
// console.log(ertelleGeheimNummer());



// Funktion zum Überprüfen, ob die Eingabe gültig ist
function isValidNumber(raten) {
    if (raten.length !== 4) {
        return false;
    }

    // Überprüfen, ob jede Ziffer eindeutig ist und eine Zahl ist
    for (let i = 0; i < raten.length; i++) {
        const zahl = parseInt(raten[i]);
        if (isNaN(zahl)) {
            return false; // Überprüfen, ob die Ziffer eine Zahl ist
        }
        for (let j = i + 1; j < raten.length; j++) {
            if (zahl === parseInt(raten[j])) {
                return false; // Überprüfen, ob die Ziffer eindeutig ist
            }
        }
    }

    return true;
}

// console.log(isValidNumber('5241'));

function numberVergleich(geheim, raten) {
    let stiere = 0;
    let kühe = 0;
    for (let i = 0; i < 4; i++) {
        if (geheim[i] === raten[i]) {
            stiere++;
        } else if (geheim.includes(raten[i].toString())) {
            kühe++;
        }
    }
    return [stiere, kühe];
}



function spielen() {
    const geheim = ertelleGeheimNummer();
    let versuche = 0;
    console.log(`\n` + geheim);
    console.log(`\n` +"Willkommen bei Bullen und Kühen! Versuche, die 4-stellige Geheimzahl zu erraten.");

    while (true) {

        const raten = prompt("Gib einen Nummer ein: ");
        if (!isValidNumber(raten)) {
            console.log(`\n` + "Ungültige Eingabe. Bitte gib eine 4-stellige Zahl mit eindeutigen Ziffern ein.");
            continue;
        }

        versuche++;

        const [stiere, kühe] = numberVergleich(geheim, raten);
        console.log(`Tipp: ${stiere} Stiere und ${kühe} Kühe.`);

        if (stiere === 4) {
            console.log(`Glückwunsch! Du hast die Geheimzahl ${geheim} in ${versuche} Versuchen erraten.`);
            break;
        }
    }
}

spielen();