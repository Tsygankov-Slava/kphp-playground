import {editor, examplesPanel} from "../main.js";

export default class Formatter {
    #formatBtn = document.getElementById("settings__btn-format");
    #output;
    constructor() {
        this.#formatBtn.addEventListener('click', this.format.bind(this));
    }

    format() {
        try {
            this.#output = prettier.format(editor.getCode(), {
                plugins: prettierPlugins,
                parser: "php",
                phpVersion: "7.0",
                tabWidth: 4,
                braceStyle: "1tbs"
            });
        } catch (error) {
            this.#output = error;
        }
        editor.setCode(this.#output);
        localStorage.setItem(examplesPanel.getExampleName(), this.#output);
    }
}
