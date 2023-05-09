export default class Editor {
    constructor(mode, matchBrackets, lineNumbers, theme) {
        const config = {
            mode: mode,
            matchBrackets: matchBrackets,
            lineNumbers: lineNumbers,
            theme: theme
        };

        this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), config);
    }

    setCode(code) {
        this.editor.setValue(code);
    }

    getCode() {
         return this.editor.getValue();
    }
}
