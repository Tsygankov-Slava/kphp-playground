import {setExampleName, exampleName, examples, findExampleName} from "./Examples/examples.js";
import Editor from "./Editor/Editor.js";

let editor = new Editor("application/x-httpd-php", true, true, "friendship-bracelet");
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

let compilePanel = document.getElementById("compile_panel");
let runBtn = document.getElementById("settings__btn-run");
runBtn.addEventListener('click', async function () {
    let console_ = document.getElementById("compile_panel__console");
    console_.textContent = "Running code...";
    console_.style.color = "#B8B8B8";

    compilePanel.style.visibility = "visible";

    const url = "http://localhost:8001/server/index.php";
    const code = editor.getCode();
    const data = {
        code: code
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    };

    let response = await fetch(url, options);
    let result = await response.json();
    console.log(result);

    if (result["result_val_comp"]) {
        console_.style.color = "red";
    }

    const output = result["output"];
    let outputToConsole = ``;
    for (let i = 0; i < output.length; i++) {
        outputToConsole += output[i] + '<br>';
    }
    console_.innerHTML = outputToConsole;
})

let hideConsolePanelBtn = document.getElementById("compile_panel__header__btn-hide");
hideConsolePanelBtn.addEventListener('click', function () {
    compilePanel.style.visibility = "hidden"
})


let compilePanelHeader = document.getElementById("compile_panel__header");
compilePanelHeader.ondragstart = function() {
    return false;
};
compilePanelHeader.onmousedown = function (event) {
    function moveAt(pageY) {
        compilePanel.style.height = innerHeight - pageY + (compilePanelHeader.clientHeight / 2) + 'px';
        console.log(pageY, innerHeight);
    }
    function onMouseMove(event) {
        moveAt(event.clientY);
    }

    moveAt(event.clientY);

    document.addEventListener('mousemove', onMouseMove);
    compilePanelHeader.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        compilePanelHeader.onmouseup = null;
    };
}

