import {setExampleName, exampleName, examples, findExampleName} from "./Examples/examples.js";
import Editor from "./Editor/Editor.js";
import CompilePanel from "./CompilePanel/CompilePanel.js";

export let editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
editor.setCode(examples.find(findExampleName).code);

window.addEventListener('click', function (e) {
    if (document.getElementById("settings__examples-select").contains(e.target)) {
        document.getElementById("settings__examples-select-content").style.display="inline-block";
    } else {
        document.getElementById("settings__examples-select-content").style.display="none";
    }
})

let examplesList = document.getElementsByClassName("settings__examples-select-content-text");
for (let i = 0; i < examplesList.length; i++) {
    let elementOfExamples = examplesList[i];
    elementOfExamples.addEventListener('click', function () {
        setExampleName(elementOfExamples.childNodes[1].innerHTML);
        document.getElementById("settings__examples-select-text").innerHTML = exampleName;
        editor.setCode(examples.find(findExampleName).code);
    })
}

new CompilePanel();
