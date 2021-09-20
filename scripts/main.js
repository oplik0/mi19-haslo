"use strict";
const zxcvbn_enabled = false;

const runScript = async () => {
    const options = {
        translations: zxcvbnts["language-en"].translations,
        graphs: zxcvbnts["language-common"].adjacencyGraphs,
        dictionary: {
            ...zxcvbnts["language-common"].dictionary,
            ...zxcvbnts["language-en"].dictionary,
        },
    };
    zxcvbnts.core.ZxcvbnOptions.setOptions(options);
    const input = document.querySelector("#password-input");
    const button = document.querySelector("#password-button");
    const output = document.querySelector("#password-output");
    const checkPassword = async () => {
        const password = input.value;
        const zxcvbnScore = zxcvbnts.core.zxcvbn(password);
        const defaultScore =
            -1 +
            (password.length > 0) +
            (password.length >= 4 && !!password.match(/\d/)) +
            (password.length >= 7 && !!password.match(/\d/));
        const score = zxcvbn_enabled ? zxcvbnScore.score : defaultScore;
        switch (score) {
            case -1:
                output.innerText = "WPISZ HASŁO!";
                output.style.color = "red";
                break;
            case 0:
                output.innerText = "SŁABE";
                output.style.color = "yellow";
                break;
            case 1:
                output.innerText = "ŚREDNIE";
                output.style.color = "blue";
                break;
            case 2:
                output.innerText = "DOBRE";
                output.style.color = "green";
                break;
            case 3:
                output.innerText = "BARDZO DOBRE";
                output.style.color = "green";
                break;
            case 4:
                output.innerText = "ŚWIETNE";
                output.style.color = "green";
                break;
            default:
                output.innerText = "TO NIE POWINNO SIĘ STAĆ";
                output.style.color = "red";
        }
    };
    button.addEventListener("click", checkPassword);
    input.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            checkPassword();
        }
    });
};

if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
) {
    runScript();
} else {
    document.addEventListener("DOMContentLoaded", runScript);
}
