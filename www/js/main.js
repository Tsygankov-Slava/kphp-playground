import Editor from "./Editor/Editor.js";
import ExamplesPanel from "./Examples/ExamplesPanel.js";
import CompilePanel from "./CompilePanel/CompilePanel.js";
import Settings from "./Settings/Settings.js"
import ThemeManager from "./ThemeManager/ThemeManager.js";
import Formatter from "./Formatter/Formatter.js";


export var editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
export let examplesPanel = new ExamplesPanel();
new CompilePanel();
new Settings();
new ThemeManager();
new Formatter();

const code = localStorage[localStorage['exampleName'] + '_code'];
if (code) {
    editor.setCode(code);
    examplesPanel.setExampleName(localStorage['exampleName']);
} else {
    editor.setCode(examplesPanel.getExamples().find(examplesPanel.findExampleName).code);
}