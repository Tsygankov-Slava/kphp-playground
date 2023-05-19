import {examplesPanel} from "../main.js";

export default class Editor {
    #editorScroll;

    constructor(mode, matchBrackets, lineNumbers, theme) {
        const config = {
            mode: mode,
            matchBrackets: matchBrackets,
            lineNumbers: lineNumbers,
            theme: theme
        };

        this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), config);

        this.#editorScroll = document.getElementsByClassName("CodeMirror-scroll")[0]
        const editorScrollHeight = document.documentElement.clientHeight - this.#editorScroll.getBoundingClientRect().y;
        this.#editorScroll.style.height = editorScrollHeight + "px";

        document.addEventListener('keydown', this.#saveCodeToLocalStorage.bind(this));

    }

    setCode(code) {
        this.editor.setValue(code);
    }

    getCode() {
         return this.editor.getValue();
    }

    #saveCodeToLocalStorage() {
        const codeName = examplesPanel.getExampleName() + '_code';
        localStorage.setItem(codeName, this.getCode());
        localStorage.setItem("exampleName", examplesPanel.getExampleName());
    }
}
