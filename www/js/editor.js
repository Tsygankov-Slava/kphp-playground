window.addEventListener('click', function (e) {
    if (document.getElementById("settings__examples-select").contains(e.target)) {
        document.getElementById("settings__examples-select-content").style.display="inline-block";
    } else {
        document.getElementById("settings__examples-select-content").style.display="none";
    }
})

let examples = {
    "Hello KPHP!" : "<?php\n" +
        "// when launched, shows a form with <input> for entering a number\n" +
        "// when a number is submitted, prints this number squared and a clear button\n" +
        "\n" +
        "class InputArgs {\n" +
        "  private $number = null;\n" +
        "\n" +
        "  public function isNumberEntered() {\n" +
        "    return $this->number !== null;\n" +
        "  }      \n" +
        "\n" +
        "  public function getNumberEntered() {\n" +
        "    return $this->number;\n" +
        "  }\n" +
        "\n" +
        "  static function createFromUrl(): self {\n" +
        "    $input = new self;\n" +
        "    if (is_numeric($_GET['number']))\n" +
        "      $input->number = (int)$_GET['number'];\n" +
        "    return $input;\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "function htmlHeader() {\n" +
        "  return \"<h1>Hello from KPHP</h1>\";\n" +
        "}\n" +
        "\n" +
        "function htmlFormWithInput() {\n" +
        "  return \"<form method=get>Enter a number: <input type=text value=123 name=number> <input type=submit value=Square></form>\";  \n" +
        "}\n" +
        "\n" +
        "function htmlNumberSquared($number) {\n" +
        "  $squared = $number ** 2;\n" +
        "  return \"$number<sup>2</sup> = $squared<br><a href='/'>Clear</a>\";\n" +
        "}\n" +
        "\n" +
        "$input = InputArgs::createFromUrl();\n" +
        "if (!$input->isNumberEntered())\n" +
        "  echo htmlHeader(), htmlFormWithInput();\n" +
        "else\n" +
        "  echo htmlHeader(), htmlNumberSquared($input->getNumberEntered());",
    "Example 1" : "<?php\n" +
        "   echo 'Example 1';",
    "Example 2" : "<?php\n" +
        "   echo 'Example 2';",
};

let exampleName = "Hello KPHP!";
document.getElementById('editor').innerHTML = examples[exampleName];

let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "application/x-httpd-php",
    matchBrackets: true,
    lineNumbers: true,
    theme: "friendship-bracelet"
});
editor.save();

function selectExamplesCode(el) {
    exampleName = el.childNodes[1].innerHTML;
    document.getElementById("settings__examples-select-text").innerHTML = exampleName;
    document.getElementById('editor').innerHTML = examples[exampleName];
    editor.setValue(examples[exampleName]);
}