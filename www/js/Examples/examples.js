import Example from '../Examples/Example.js'

export var examples = [
    new Example(
        "Hello KPHP!",
        "<?php\n" +
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
        "  echo htmlHeader(), htmlNumberSquared($input->getNumberEntered());"
    ),
    new Example(
        "Example 1",
        "<?php\n" +
        "   echo 'Example 1';"
    ),
    new Example(
        "Example 2",
        "<?php\n" +
        "   echo 'Exampl"
    )];

export let exampleName = "Hello KPHP!";
