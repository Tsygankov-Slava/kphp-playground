import Example from '../Examples/Example.js'

export var examples = [
    new Example(
        "Hello, KPHP!",
        "<?php\n" +
        "// Welcome to the KPHP Playground!\n" +
        "// Here you can edit and run KPHP code.\n" +
        "// Let's start with a simple \"Hello, KPHP!\" example:   \n" +
        "echo 'Hello, KPHP!';\n" +
        "\n" +
        "// To run the code, click the \"Run\" button.\n" +
        "// To format the code, click the \"Format\".\n" +
        "\n" +
        "// If you want to learn more about KPHP, visit https://vkcom.github.io/kphp/\n" +
        "// If you want to see the KPHP source code, visit https://github.com/VKCOM/kphp\n" +
        "// Join us on Telegram: https://t.me/kphp_chat\n" +
        "// Enjoy!\n"
    ),
    new Example(
        "Fibonacci",
        "<?php\n" +
        "// Strict typing increases performance -> If you want performance — write types everywhere.\n" +
        "\n" +
        "// KPHP urges you to think about types.\n" +
        "// Use type hints or @param / @return in function declaration to be sure of types.\n\n" +
        "function fib(int $indexNumber): int {\n" +
        "  $f = [0, 1];\n" +
        "\n" +
        "  for ($i = 2; $i <= $indexNumber; $i++) {\n" +
        "      $f[$i] = $f[$i - 1] + $f[$i - 2];\n" +
        "  }\t\n" +
        "  return $f[$indexNumber];\n" +
        "}\n" +
        "\n" +
        "for ($i = 0; $i < 50; $i++) {\n" +
        "\techo $i . \": \" . fib($i) . \"<br>\";\n" +
        "}\n" +
        "\n" +
        "// To learn more about KPHP types visit https://vkcom.github.io/kphp/kphp-language/static-type-system/kphp-type-system.html \n" +
        "// and https://vkcom.github.io/kphp/kphp-language/best-practices/strict-typing-performance.html \n"
    ),
    new Example(
        "Classes and Objects",
        "<?php\n" +
        "// Classes in KPHP are exactly the same as in PHP. \n" +
        "// But KPHP strongly recommends explicitly specifying types in class fields and methods using type hints or @param / @return.\n" +
        "\n" +
        "// Let's write an implementation of a binary search tree:\n" +
        "\n" +
        "class Node {\n" +
        "    public int $value;\n" +
        "    public ?Node $left = null;\n" +
        "    public ?Node $right = null;\n" +
        "\n" +
        "    public function __construct (int $value) {\n" +
        "        $this->value = $value;\n" +
        "    }\n" +
        "}\n" +
        "\n" +
        "class BinaryTree {\n" +
        "    public ?Node $root = null;\n" +
        "    public ?Node $head = null;\n" +
        "\n" +
        "    public function insert(int $value) {\n" +
        "        $node = new Node($value);\n" +
        "        $this->insertNode($node, $this->root);\n" +
        "    }\n" +
        "\n" +
        "    private function insertNode(Node $node, ?Node &$root) {\n" +
        "        if (is_null($root)) {\n" +
        "            $root = $node;\n" +
        "            if (is_null($this->head)) {\n" +
        "                $this->head= $node;\n" +
        "            }\n" +
        "        } else {\n" +
        "            if ($node->value < $root->value) {\n" +
        "                $this->insertNode($node, $root->left);\n" +
        "            } elseif ($node->value > $root->value) {\n" +
        "                $this->insertNode($node, $root->right);\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}\n" +
        "\n" +
        "$tree = new BinaryTree();\n" +
        "$tree->insert(2);\n" +
        "$tree->insert(5);\n" +
        "$tree->insert(3);\n" +
        "$tree->insert(1);\n" +
        "\n" +
        "echo $tree->head->value; // 2\n" +
        "echo $tree->head->right->value; // 5\n" +
        "echo $tree->head->right->left->value; // 3\n" +
        "echo $tree->head->left->value; // 1\n"
    ),
    new Example(
        "Generic functions",
        "<?php\n" +
        "// KPHP brings full support of generic functions, including primitives, auto-reification, guards, and special PHP instantiation syntax.\n" +
        "\n" +
        "// Let's write eq() function that takes any value and returns itself:\n" +
        "// Note, that regular @param/@return tags are used, not @kphp-param or similar — because having @kphp-generic written, T is parsed as generic T, not as class T.\n\n" +
        "/**\n" +
        " * @kphp-generic T\n" +
        " * @param T $value\n" +
        " * @return T\n" +
        " */\n" +
        "function eq($value) {\n" +
        "  return $value;\n" +
        "}\n" +
        "\n" +
        "class A {\n" +
        "\tpublic int $var;\n" +
        "  \tfunction __construct($var) {\n" +
        "    \t$this->var = $var;\n" +
        "    }\n" +
        "}\n" +
        "$a = new A(4);\n" +
        "\n" +
        "// When calling eq(), T could be any type (an instance, an array of something, a primitive, etc.):\n" +
        "echo eq(4) . \"\\n\";      // 4\n" +
        "echo eq(\"KPHP\") . \"\\n\"; // KPHP\n" +
        "var_dump(eq([\"KPHP\"])); // array(1) { [0]=> string(4) \"KPHP\" }\n" +
        "var_dump(eq($a));      // string(1) \"A\"\n" +
        "\n" +
        "\n" +
        "// To learn more about generic functions visit https://vkcom.github.io/kphp/kphp-language/static-type-system/generic-functions.html\n"
    ),
    new Example(
        "Generic classes",
        "<?php\n" +
        "// Generic classes are “work in progress”.\n" +
        "\n" +
        "// They will be similar to generic functions: with @kphp-generic over the class, T in @var over fields and @param/@return over methods. \n" +
        "// Inheritance will also be supported, as well as generic interfaces.\n" +
        "\n" +
        "// An example from the future:\n" +
        "\n" +
        "/**\n" +
        " * @kphp-generic T\n" +
        " */\n" +
        "class Container {\n" +
        "  /** @var T[] */\n" +
        "  private array $items = [];\n" +
        "\n" +
        "  /**\n" +
        "   * @param T $e\n" +
        "   */\n" +
        "  function append($e) { \n" +
        "    $this->items[] = $e; \n" +
        "  }\n" +
        "\n" +
        "  /**\n" +
        "   * @return T[]\n" +
        "   */\n" +
        "  function getAll() { \n" +
        "    return $this->items;\n" +
        "  }\n" +
        "\n" +
        "  /**\n" +
        "   * @kphp-generic T2\n" +
        "   * @param Container<T2> $rhs\n" +
        "   */\n" +
        "  function equalSizes($rhs) {\n" +
        "    return count($this->items) === count($rhs->items);\n" +
        "  }\n" +
        "\n" +
        "  /**\n" +
        "   * @return Container<mixed>\n" +
        "   */\n" +
        "  function toMixed() {\n" +
        "    $c_mixed = new self/*<mixed>*/();\n" +
        "    foreach ($this->items as $i)\n" +
        "      $c_mixed->append($i);\n" +
        "    return $c_mixed;\n" +
        "  }\n" +
        "\n" +
        "  /**\n" +
        "   * @kphp-generic T\n" +
        "   * @return Container<T>\n" +
        "   */  \n" +
        "  static function createEmpty() {\n" +
        "    return new Container/*<T>*/;\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "// To learn more about generic classes visit https://vkcom.github.io/kphp/kphp-language/static-type-system/generic-classes.html\n"
    ),
    new Example(
        "Coroutines (forks)",
        "<?php\n" +
        "// KPHP supports some kind of coroutines (green threads). \n" +
        "// It is not multithreading — it is switching execution context to perform computations while another function is waiting for data.\n" +
        "\n" +
        "function task(int $id, int $duration): string {\n" +
        "\techo \"task $id start <br>\";\n" +
        "  \tsleep($duration);\n" +
        "  \treturn \"task $id finish <br>\";\n" +
        "}\n" +
        "\n" +
        "// In PHP fork() does almost nothing, the code remains synchronous. But in KPHP it becomes parallel.\n" +
        "$task1_future = fork(task(1, 7));\n" +
        "$task2_future  = fork(task(2, 5));\n" +
        "$task3_future  = fork(task(3, 1));\n" +
        "\n" +
        "$task1 = wait($task1_future);\n" +
        "echo $task1;\n" +
        "$task2 = wait($task2_future);\n" +
        "echo $task2;\n" +
        "$task3 = wait($task3_future);\n" +
        "echo $task3;\n" +
        "       \n" +
        "// This can remind async/await from other languages. This is partially true, but forks syntax is focused to be used without changing PHP code.\n" +
        "// So, you can call f() to get T and you can call fork(f()) to get future<T>.\n" +
        "\n" +
        "// To learn more about coroutines in KPHP visit https://vkcom.github.io/kphp/kphp-language/best-practices/async-programming-forks.html\n"
    ),
    new Example(
        "JSON Encoding/Decoding",
        "<?php\n" +
        "$array = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);\n" +
        "print_r($array);\n" +
        "\n" +
        "// json_encode — returns the JSON representation of a value.\n" +
        "$json = json_encode($array);\n" +
        "echo $json . \"<br>\";\n" +
        "\n" +
        "// json_decode — decodes a JSON string.\n" +
        "$array = json_decode($json);\n" +
        "print_r($array);\n"
    )];

export let exampleName = "Hello, KPHP!";
