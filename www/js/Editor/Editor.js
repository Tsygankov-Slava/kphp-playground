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
    }

    setCode(code) {
        this.editor.setValue(code);
    }

    getCode() {
         return this.editor.getValue();
    }
}
