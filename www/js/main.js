import Editor from "./Editor/Editor.js";
import ExamplesPanel from "./Examples/ExamplesPanel.js";
import CompilePanel from "./CompilePanel/CompilePanel.js";

export let editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
new ExamplesPanel();
new CompilePanel();

editor.setCode(this.getExamples().find(this.findExampleName).code);
