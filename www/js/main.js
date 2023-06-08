import Editor from "./Editor/Editor.js";
import ExamplesPanel from "./Examples/ExamplesPanel.js";
import CompilePanel from "./CompilePanel/CompilePanel.js";
import Settings from "./Settings/Settings.js"
import ThemeManager from "./ThemeManager/ThemeManager.js";
import Formatter from "./Formatter/Formatter.js";
import KeyboardsShortcutsManager from "./KeyboardsShortcutsManager/KeyboardsShortcutsManager.js";


export var editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
export let examplesPanel = new ExamplesPanel();
export let compilePanel = new CompilePanel();
export let settings = new Settings();
new ThemeManager();
export let formatter = new Formatter();
new KeyboardsShortcutsManager();

const code = localStorage[localStorage['exampleName'] + '_code'];
if (code) {
    editor.setCode(code);
    examplesPanel.setExampleName(localStorage['exampleName']);
} else {
    editor.setCode(examplesPanel.getExamples().find(examplesPanel.findExampleName).code);
}
