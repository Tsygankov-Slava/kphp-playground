import CodeRunner from "../CodeRunner/CodeRunner.js";
import {editor} from "../main.js";

export default class CompilePanel {
    #panel = document.getElementById("compile_panel");
    #header = document.getElementById("compile_panel__header");
    #hideBtn = document.getElementById("compile_panel__header__btn-hide");
    #console = document.getElementById("compile_panel__console");
    #runBtn = document.getElementById("settings__btn-run");

    constructor() {
        this.#hideBtn.addEventListener('click', this.#hidden.bind(this) );
        this.#runBtn.addEventListener('click', this.runCompile.bind(this));

        this.#header.ondragstart = function() { return false; };
        this.#header.onmousedown = this.#trackMove.bind(this);
    }

    #hidden() {
        this.#panel.style.visibility = "hidden"
    }

    #show() {
        this.#panel.style.visibility = "visible";
    }

    #setText(text) {
        this.#console.innerHTML = text;
    }
    #setTextColor(color) {
        this.#console.style.color = color;
    }

    #buildCompileTextForConsole(compilationOutput) {
        let compileTextForConsole = "";
        for (let i = 0; i < compilationOutput.length; i++) {
            compileTextForConsole += compilationOutput[i] + '<br>';
        }
        return compileTextForConsole;
    }

    #outputCompileTextToConsole(resultCompile) {
        if (resultCompile["result_val_comp"]) {
            this.#setTextColor("red");
        }

        let compileTextForConsole = this.#buildCompileTextForConsole(resultCompile["output"]);
        this.#setText(compileTextForConsole);
    }

    async runCompile() {
        this.#setText("Running code...");
        this.#setTextColor("#B8B8B8");
        this.#show();

        let codeRunner = new CodeRunner;
        const resultCompile = await codeRunner.run(editor.getCode());
        this.#outputCompileTextToConsole(resultCompile);
    }

    #trackMove(event) {
        let boundMoveAt = moveAt.bind(this);
        boundMoveAt(event.clientY);
        document.addEventListener('mousemove', onMouseMove);
        function moveAt(clientY) {
            this.#panel.style.height = innerHeight - clientY + (this.#header.clientHeight / 2) + 'px';
        }
        function onMouseMove(event) {
            boundMoveAt(event.clientY);
        }

        this.#header.onmouseup = onMouseUp.bind(this);
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            this.#header.onmouseup = null;
        }
    }
}

