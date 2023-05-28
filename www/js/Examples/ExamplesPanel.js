import {examples} from "./examples.js";
import {editor, examplesPanel} from "../main.js";

export default class ExamplesPanel {
    #panelSelectContent = document.getElementById("settings__examples-select-content");
    #examplesSelectBtn = document.getElementById("settings__examples-select");
    #examplesList = document.getElementsByClassName("settings__examples-select-content-text");
    #examplesSelectBtnText = document.getElementById("settings__examples-select-text");

    #exampleName = "Hello, KPHP!";
    #examples = examples;

    findExampleName = this.#findExampleName.bind(this);
    #boundSetDisplayProperty = this.#setDisplayProperty.bind(this);

    constructor() {
        window.addEventListener('click', this.#boundSetDisplayProperty);

        for (let i = 0; i < this.#examplesList.length; i++) {
            let elementOfExamples = this.#examplesList[i];
            elementOfExamples.addEventListener('click', () => {
                const exampleName = elementOfExamples.childNodes[1].innerHTML;
                this.#changeExample(exampleName);
            });
        }

        if (localStorage['exampleName']) {
            this.#exampleName = localStorage['exampleName'];
            this.#examplesSelectBtnText.innerHTML = this.#exampleName;
        }
    }

    #changeExample(exampleName) {
        this.setExampleName(exampleName);
        this.#examplesSelectBtnText.innerHTML = this.getExampleName();
        const codeName = examplesPanel.getExampleName() + '_code';
        let code = this.getExamples().find(this.findExampleName).code;
        if (localStorage[codeName]) {
            code = localStorage[codeName];
        }
        editor.setCode(code);
    }

    getExampleName() {
        return this.#exampleName;
    }

    getExamples() {
        return this.#examples;
    }

    setExampleName(newName) {
        this.#exampleName = newName;
    }

    #findExampleName(el) {
        return this.#exampleName === el.name;
    }

    #setDisplayProperty(e) {
        if (this.#examplesSelectBtn.contains(e.target) &&  this.#panelSelectContent.style.display === "none") {
            this.#panelSelectContent.style.display="inline-block";
        } else {
            this.#panelSelectContent.style.display="none";
        }
    }
}
