import Editor from "./Editor/Editor.js";
import ExamplesPanel from "./Examples/ExamplesPanel.js";
import CompilePanel from "./CompilePanel/CompilePanel.js";

export let editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
export let examplesPanel = new ExamplesPanel();
new CompilePanel();

const code = localStorage[localStorage['exampleName'] + '_code'];
if (code) {
    editor.setCode(code);
    examplesPanel.setExampleName(localStorage['exampleName']);
} else {
    editor.setCode(examplesPanel.getExamples().find(examplesPanel.findExampleName).code);
}