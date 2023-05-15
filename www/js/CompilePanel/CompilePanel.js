import CodeRunner from "../CodeRunner/CodeRunner.js";
import {editor} from "../main.js";

export default class CompilePanel {
    #panel = document.getElementById("compile_panel");
    #header = document.getElementById("compile_panel__header");
    #hideBtn = document.getElementById("compile_panel__header__btn-hide");
    #console = document.getElementById("compile_panel__console");
    #runBtn = document.getElementById("settings__btn-run");
    #editorScroll = document.getElementsByClassName("CodeMirror-scroll")[0];

    constructor() {
        this.#hideBtn.addEventListener('click', this.#hidden.bind(this) );
        this.#runBtn.addEventListener('click', this.runCompile.bind(this));

        this.#header.ondragstart = function() { return false; };
        this.#trackMove();

    }

    #hidden() {
        this.#panel.style.visibility = "hidden";
        this.#editorScroll.style.height = "100%";

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

        this.#generateEditorHeight();

        let codeRunner = new CodeRunner;
        const resultCompile = await codeRunner.run(editor.getCode());
        this.#outputCompileTextToConsole(resultCompile);
    }

    #generateEditorHeight() {
        const editorHeight = this.#panel.getBoundingClientRect().y - this.#editorScroll.getBoundingClientRect().y;
        this.#editorScroll.style.height = editorHeight + 'px';
    }
    #trackMove() {
        let mouseDown = false;

        this.#header.addEventListener('mousedown', (event) => {
            mouseDown = true;
        });

        document.addEventListener('mousemove', (event) => {
            if (!mouseDown) return;
            const height = innerHeight - event.clientY + (this.#header.clientHeight / 2);
            this.#panel.style.height = height + 'px';

            this.#generateEditorHeight();
        });

        document.addEventListener('mouseup', () => {
            mouseDown = false;
        })
    }
}

