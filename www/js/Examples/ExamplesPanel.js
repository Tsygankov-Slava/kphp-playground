import {exampleName, examples} from "./examples.js";
import {editor} from "../main.js";

export default class ExamplesPanel {
    #panelSelectContent = document.getElementById("settings__examples-select-content");
    #examplesSelectBtn = document.getElementById("settings__examples-select");
    #examplesList = document.getElementsByClassName("settings__examples-select-content-text");
    #examplesSelectBtnText = document.getElementById("settings__examples-select-text");

    #exampleName = exampleName;
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
    }

    #changeExample(exampleName) {
        this.setExampleName(exampleName);
        this.#examplesSelectBtnText.innerHTML = this.getExampleName();
        editor.setCode(this.getExamples().find(this.findExampleName).code);
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
        if (this.#examplesSelectBtn.contains(e.target)) {
            this.#panelSelectContent.style.display="inline-block";
        } else {
            this.#panelSelectContent.style.display="none";
        }
    }
}
