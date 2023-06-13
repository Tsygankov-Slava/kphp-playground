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

    #buildingResult;
    #runningResult;

    constructor() {
        this.#hideBtn.addEventListener('click', this.hidden.bind(this));
        this.#runBtn.addEventListener('click', this.compile.bind(this));

        this.#buildLogBtn.addEventListener('click', this.#displayBuildLog.bind(this));
        this.#outputBtn.addEventListener('click', this.#displayOutput.bind(this));

        this.#runArgumentsInput.addEventListener('input', this.#saveValueToLocalStorage.bind(this));

        this.#header.ondragstart = function () {
            return false;
        };
        this.#trackMove();

        if (localStorage['runArguments']) {
            this.#runArgumentsInput.value = localStorage['runArguments'];
        }
        if (localStorage['build_log']) {
            this.#setText(localStorage['build_log']);
        }
        if (!localStorage['filename']) {
            localStorage.setItem('filename', "");
        }
        localStorage.setItem('state', "stable");
    }

    hidden() {
        this.#panel.style.visibility = "hidden";
        this.#editorScroll.style.height = "100%";
    }

    show() {
        this.#panel.style.visibility = "visible";
        this.#displayBuildLog();
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
        if (serviceStrIndex !== -1) {
            compilationOutput[0] = compilationOutput[0].slice(serviceStrIndex + 4);
        }

        for (let i = 0; i < compilationOutput.length; i++) {
            compileTextForConsole += compilationOutput[i] + '<br>';
        }
        return compileTextForConsole;
    }

    async compile() {
        localStorage.setItem("build_log", "");
        localStorage.setItem("output", "");
        localStorage.setItem("build_log_color", "var(--var-font-color)");
        localStorage.setItem("state", "compile");

        if (await this.#build()) {
            await this.#run();
        } else {
            this.#loader.style.visibility = "hidden";
            this.#setText(this.#buildingResult["build_log"]);
            this.#setTextColor("red");
            localStorage["build_log"] = this.#buildingResult["build_log"];
            localStorage["build_log_color"] = "red";
            localStorage["output"] = "";
        }

        this.#generateEditorHeight();
    }

    async #build() {
        this.#setBuildLogInPanel();
        this.#setText("Building code");
        this.#setTextColor("var(--var-font-color)");
        this.#loader.style.visibility = "visible";
        this.show();

        await this.#codeRunner.build(editor.getCode(), localStorage["filename"]);
        this.#buildingResult = this.#codeRunner.getResult();
        const build_log = this.#buildingResult["build_log"];
        localStorage["build_log"] = build_log;
        localStorage["filename"] = this.#buildingResult["filename"];
        this.#displayBuildLog();
        return !this.#buildingResult["result_val_comp"];
    }

    async #run() {
        const runArguments = this.#runArgumentsInput.value;

        this.#setOutputInPanel();
        this.#setText("Running code");
        this.#setTextColor("var(--var-font-color)");
        this.#loader.style.visibility = "visible";

        await this.#codeRunner.run(localStorage["filename"], runArguments);
        this.#runningResult = this.#codeRunner.getResult();
        const output = this.#runningResult["output"];
        localStorage["output"] = this.#buildCompileTextForConsole(output);
        this.#displayOutput();
    }

    #setBuildLogInPanel() {
        this.#outputBtn.style.borderBottom = "none";
        this.#outputBtn.style.paddingTop = "0px";
        this.#buildLogBtn.style.paddingTop = "2px";
        this.#buildLogBtn.style.borderBottom = "solid 2px #0069c2";
    }

    #displayBuildLog() {
        this.#setBuildLogInPanel();
        if (localStorage["build_log"] !== "") {
            this.#setText(localStorage["build_log"]);
            this.#setTextColor(localStorage["build_log_color"]);
            this.#loader.style.visibility = "hidden";
        } else if (localStorage["state"] === "compile") {
            this.#setText("Building code");
            this.#loader.style.visibility = "visible";
        }
    }

    #setOutputInPanel() {
        this.#buildLogBtn.style.borderBottom = "none";
        this.#buildLogBtn.style.paddingTop = "0px";
        this.#outputBtn.style.paddingTop = "2px";
        this.#outputBtn.style.borderBottom = "solid 2px #0069c2";
    }

    #displayOutput() {
        this.#setOutputInPanel();
        this.#setText("");
        this.#loader.style.visibility = "hidden";
        if (localStorage["output"] !== "") {
            this.#setText(localStorage["output"]);
            this.#loader.style.visibility = "hidden";
        } else if (localStorage["build_log"] !== "" && !this.#buildingResult["result_val_comp"]) {
            this.#setText("Running code");
            this.#loader.style.visibility = "visible";
        }
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

    #saveValueToLocalStorage() {
        localStorage.setItem('runArguments', this.#runArgumentsInput.value)
    }

    isVisible() {
        return this.#panel.style.visibility === "visible";
    }
}
