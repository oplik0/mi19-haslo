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
    const checkbox = document.querySelector("#zxcvbn-checkbox");
    const checkPassword = async () => {
        const zxcvbn_enabled = checkbox.checked;
        const password = input.value;
        const zxcvbnScore = zxcvbnts.core.zxcvbn(password);
        const defaultScore =
            -1 +
            (password.length > 0) +
            (password.length >= 4 && !!password.match(/\d/)) +
            (password.length >= 7 && !!password.match(/\d/));
        const score = zxcvbn_enabled ? zxcvbnScore.score : defaultScore;
        let feedback = `<br>Złamanie tego hasła zajęło by ${zxcvbnScore.guesses} prób.
        <br>Oznacza to ${zxcvbnScore.crackTimesSeconds.onlineNoThrottling10PerSecond} sekund ataku online (bez throttlingu)
        <br>Albo ${zxcvbnScore.crackTimesSeconds.offlineFastHashing1e10PerSecond} sekund szybkiego ataku offline`;
        if (
            !!zxcvbnScore.feedback.suggestions.length ||
            !!zxcvbnScore.feedback.warning.length
        ) {
            feedback += `<br>Ostrzeżenia: ${zxcvbnScore.feedback.warning}<br>Sugestie: ${zxcvbnScore.feedback.suggestions}`;
        }
        switch (score) {
            case -1:
                output.innerText = "WPISZ HASŁO!";
                output.style.color = "red";
                break;
            case 0:
                output.innerHTML = "SŁABE" + (zxcvbn_enabled ? feedback : "");
                output.style.color = "yellow";
                break;
            case 1:
                output.innerHTML = "ŚREDNIE" + (zxcvbn_enabled ? feedback : "");
                output.style.color = "blue";
                break;
            case 2:
                output.innerHTML = "DOBRE" + (zxcvbn_enabled ? feedback : "");
                output.style.color = "green";
                break;
            case 3:
                output.innerHTML =
                    "BARDZO DOBRE" + (zxcvbn_enabled ? feedback : "");
                output.style.color = "green";
                break;
            case 4:
                output.innerHTML = "ŚWIETNE" + (zxcvbn_enabled ? feedback : "");
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
