import CodeRunner from "../CodeRunner/CodeRunner.js";
import {editor} from "../main.js";

export default class CompilePanel {
    #panel = document.getElementById("compile_panel");
    #header = document.getElementById("compile_panel__header");
    #hideBtn = document.getElementById("compile_panel__header__btn-hide");
    #console = document.getElementById("compile_panel__console");
    #runBtn = document.getElementById("settings__btn-run");
    #editorScroll = document.getElementsByClassName("CodeMirror-scroll")[0];
    #buildLogBtn = document.getElementById("compile_panel__header__build-log-btn");
    #outputBtn = document.getElementById("compile_panel__header__output-btn");
    #runArgumentsInput = document.getElementById("settings__run-arguments__input");

    #codeRunner = new CodeRunner;

    constructor() {
        this.#hideBtn.addEventListener('click', this.#hidden.bind(this) );
        this.#runBtn.addEventListener('click', this.runCompile.bind(this));

        this.#buildLogBtn.addEventListener('click', this.#displayBuildLog.bind(this));
        this.#outputBtn.addEventListener('click', this.#displayOutput.bind(this));

        this.#runArgumentsInput.addEventListener('input', this.#saveValueToLocalStorage.bind(this));

        this.#header.ondragstart = function() { return false; };
        this.#trackMove();

        if (localStorage['runArguments']) {
            this.#runArgumentsInput.value = localStorage['runArguments'];
        }
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

    #displayCompileTextToConsole() {
        const resultCompile = this.#codeRunner.getResult();
        let text = resultCompile["output"];
        if (resultCompile["result_val_comp"]) {
            this.#displayBuildLogToConsole();
            text = "";
        }

        let compileTextForConsole = this.#buildCompileTextForConsole(text);
        this.#setText(compileTextForConsole);
    }

    #displayBuildLogToConsole() {
        const resultCompile = this.#codeRunner.getResult();
        if (resultCompile["result_val_comp"]) {
            this.#setTextColor("red");
        }

        let buildLogForConsole = resultCompile["build_log_stderr"] + resultCompile["build_log_stdout"];
        this.#setText(buildLogForConsole);
    }

    async runCompile() {
        const runArguments = this.#runArgumentsInput.value;

        this.#displayBuildLog(false);
        this.#setText("Running code...");
        this.#setTextColor("#B8B8B8");
        this.#show();

        await this.#codeRunner.run(editor.getCode(), runArguments);
        if (!this.#codeRunner.getResult()['result_val_comp']) {
            this.#displayOutput();
        } else {
            this.#displayBuildLog();
        }

        this.#generateEditorHeight();
    }

    #generateEditorHeight() {
        const editorHeight = this.#panel.getBoundingClientRect().y - this.#editorScroll.getBoundingClientRect().y;
        this.#editorScroll.style.height = editorHeight + 'px';
    }

    #trackMove() {
        let mouseDown = false;
        this.#header.addEventListener('mousedown', () => {
            mouseDown = true;
        });

        document.addEventListener('mousemove', (event) => {
            if (!mouseDown) return;
            const consolePanelHeight = innerHeight - event.clientY + (this.#header.clientHeight / 2);
            this.#panel.style.height = consolePanelHeight + 'px';
            this.#console.style.height = consolePanelHeight - 60 + 'px';

            this.#generateEditorHeight();
        });

        document.addEventListener('mouseup', () => {
            mouseDown = false;
        })
    }

    #displayBuildLog($callDisplayBuildLog = true) {
        this.#outputBtn.style.borderBottom = "none";
        this.#outputBtn.style.paddingTop = "0px";
        this.#buildLogBtn.style.paddingTop = "2px";
        this.#buildLogBtn.style.borderBottom = "solid 2px #0069c2";

        if ($callDisplayBuildLog) {
            this.#displayBuildLogToConsole();
        }
    }

    #displayOutput() {
        this.#buildLogBtn.style.borderBottom = "none";
        this.#buildLogBtn.style.paddingTop = "0px";
        this.#outputBtn.style.paddingTop = "2px";
        this.#outputBtn.style.borderBottom = "solid 2px #0069c2";

        this.#displayCompileTextToConsole();
    }

    #saveValueToLocalStorage() {
        localStorage.setItem('runArguments', this.#runArgumentsInput.value)
    }
}