import CodeRunner from "../CodeRunner/CodeRunner.js";
import {editor} from "../main.js";

export default class CompilePanel {
    #panel = document.getElementById("compile_panel");
    #header = document.getElementById("compile_panel__header");
    #hideBtn = document.getElementById("compile_panel__header__btn-hide");
    #console = document.getElementById("compile_panel__console-text");
    #runBtn = document.getElementById("settings__btn-run");
    #editorScroll = document.getElementsByClassName("CodeMirror-scroll")[0];
    #buildLogBtn = document.getElementById("compile_panel__header__build-log-btn");
    #outputBtn = document.getElementById("compile_panel__header__output-btn");
    #runArgumentsInput = document.getElementById("settings__run-arguments__input");
    #loader = document.getElementById("ballsWaveG");
    #helpBtn = document.getElementById("keyboards-shortcuts_help");

    #codeRunner = new CodeRunner;

    constructor() {
        this.#hideBtn.addEventListener('click', this.hidden.bind(this) );
        this.#runBtn.addEventListener('click', this.runCompile.bind(this));

        this.#buildLogBtn.addEventListener('click', this.#displayBuildLog.bind(this));
        this.#outputBtn.addEventListener('click', this.#displayOutput.bind(this));

        this.#runArgumentsInput.addEventListener('input', this.#saveValueToLocalStorage.bind(this));

        this.#header.ondragstart = function() { return false; };
        this.#trackMove();

        if (localStorage['runArguments']) {
            this.#runArgumentsInput.value = localStorage['runArguments'];
        }
        if (localStorage['build_log']) {
            this.#setText(localStorage['build_log']);
        }
    }

    hidden() {
        this.#panel.style.visibility = "hidden";
        this.#editorScroll.style.height = "100%";
    }

    show() {
        this.#panel.style.visibility = "visible";
    }

    #setText(text) {
        this.#console.innerHTML = text;
    }
    #setTextColor(color) {
        this.#console.style = "color:" + color + " !important;";
    }

    #buildCompileTextForConsole(compilationOutput) {
        let compileTextForConsole = "";

        const serviceStrIndex = compilationOutput[0].indexOf("root");
        if (serviceStrIndex != -1) {
            compilationOutput[0] = compilationOutput[0].slice(serviceStrIndex + 4);
        }
        for (let i = 0; i < compilationOutput.length; i++) {
            compileTextForConsole += compilationOutput[i] + '<br>';
        }
        return compileTextForConsole;
    }

    #displayCompileTextToConsole() {
        let compileTextForConsole;
        if (localStorage["isRunningCode"] === "false") {
            const resultCompile = this.#codeRunner.getResult();
            if (!resultCompile) {
                compileTextForConsole = localStorage['output'];
            } else {
                let text = resultCompile["output"];
                if (resultCompile["result_val_comp"]) {
                    this.#displayBuildLogToConsole();
                    text = "";
                }
                compileTextForConsole = this.#buildCompileTextForConsole(text);
            }
        } else {
            compileTextForConsole = "Running code"
        }
        localStorage.setItem('output', compileTextForConsole);
        this.#setText(compileTextForConsole);
    }

    #displayBuildLogToConsole() {
        let buildLogForConsole;
        if (localStorage["isRunningCode"] === "false") {
            const resultCompile = this.#codeRunner.getResult();
            if (resultCompile) {
                if (resultCompile["result_val_comp"]) {
                    this.#setTextColor("red");
                }
                buildLogForConsole = resultCompile["build_log"];
            } else {
                buildLogForConsole = localStorage["build_log"];
            }
        } else {
            buildLogForConsole = "Running code";
        }
        localStorage.setItem('build_log', buildLogForConsole);
        this.#setText(buildLogForConsole);
    }

    async runCompile() {
        localStorage.setItem("isRunningCode", true);
        const runArguments = this.#runArgumentsInput.value;

        this.#displayBuildLog(false);
        this.#setText("Running code");
        this.#loader.style.visibility = "visible";
        this.#setTextColor("var(--var-font-color)");
        this.show();

        await this.#codeRunner.run(editor.getCode(), runArguments);
        localStorage["isRunningCode"] = false;
        if (!this.#codeRunner.getResult()['result_val_comp']) {
            this.#displayOutput();
        } else {
            this.#displayBuildLog();
        }

        this.#loader.style.visibility = "hidden";
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

    isVisible() {
        return this.#panel.style.visibility === "visible";
    }
}
