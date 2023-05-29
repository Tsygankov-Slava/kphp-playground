import Example from '../Examples/Example.js'

export const examples = [
    new Example(
        "Hello, KPHP!",
        `<?php
// Welcome to the KPHP Playground!
// Here you can edit and run KPHP code.
// Let's start with a simple "Hello, KPHP!" example:
echo "Hello, KPHP!";

// To run the code, click the "Run" button.
// To format the code, click the "Format".

// If you want to learn more about KPHP, visit https://vkcom.github.io/kphp/
// If you want to see the KPHP source code, visit https://github.com/VKCOM/kphp
// Join us on Telegram: https://t.me/kphp_chat
// Enjoy!
`
    ),
    new Example(
        "Fibonacci",
        `<?php
// Strict typing increases performance -> If you want performance — write types everywhere.

// KPHP urges you to think about types.
// Use type hints or @param / @return in function declaration to be sure of types.

function fib(int $indexNumber): int {
    $f = [0, 1];

    for ($i = 2; $i <= $indexNumber; $i++) {
        $f[$i] = $f[$i - 1] + $f[$i - 2];
    }
    return $f[$indexNumber];
}

for ($i = 0; $i < 50; $i++) {
    echo $i . ": " . fib($i) . "<br>";
}

// To learn more about KPHP types visit https://vkcom.github.io/kphp/kphp-language/static-type-system/kphp-type-system.html
// and https://vkcom.github.io/kphp/kphp-language/best-practices/strict-typing-performance.html
`
    ),
    new Example(
        "Classes and Objects",
        `<?php
// Classes in KPHP are exactly the same as in PHP.
// But KPHP strongly recommends explicitly specifying types in class fields and methods using type hints or @param / @return.

// Let's write an implementation of a binary search tree:

class Node {
    public int $value;
    public ?Node $left = null;
    public ?Node $right = null;

    public function __construct(int $value) {
        $this->value = $value;
    }
}

class BinaryTree {
    public ?Node $root = null;
    public ?Node $head = null;

    public function insert(int $value) {
        $node = new Node($value);
        $this->insertNode($node, $this->root);
    }

    private function insertNode(Node $node, ?Node &$root) {
        if (is_null($root)) {
            $root = $node;
            if (is_null($this->head)) {
                $this->head = $node;
            }
        } else {
            if ($node->value < $root->value) {
                $this->insertNode($node, $root->left);
            } elseif ($node->value > $root->value) {
                $this->insertNode($node, $root->right);
            }
        }
    }
}

$tree = new BinaryTree();
$tree->insert(2);
$tree->insert(5);
$tree->insert(3);
$tree->insert(1);

echo $tree->head->value; // 2
echo $tree->head->right->value; // 5
echo $tree->head->right->left->value; // 3
echo $tree->head->left->value; // 1
`
    ),
    new Example(
        "Generic functions",
        `<?php
// KPHP brings full support of generic functions, including primitives, auto-reification, guards, and special PHP instantiation syntax.

// Let's write eq() function that takes any value and returns itself:
// Note, that regular @param/@return tags are used, not @kphp-param or similar — because having @kphp-generic written, T is parsed as generic T, not as class T.

/**
 * @kphp-generic T
 * @param T $value
 * @return T
 */
function eq($value) {
    return $value;
}

class A {
    public int $var;
    function __construct($var) {
        $this->var = $var;
    }
}
$a = new A(4);

// When calling eq(), T could be any type (an instance, an array of something, a primitive, etc.):
echo eq(4) . "\\n"; // 4
echo eq("KPHP") . "\\n"; // KPHP
var_dump(eq(["KPHP"])); // array(1) { [0]=> string(4) "KPHP" }
var_dump(eq($a)); // string(1) "A"

// To learn more about generic functions visit https://vkcom.github.io/kphp/kphp-language/static-type-system/generic-functions.html
`
    ),
    new Example(
        "Generic classes",
        `<?php
// Generic classes are “work in progress”.

// They will be similar to generic functions: with @kphp-generic over the class, T in @var over fields and @param/@return over methods.
// Inheritance will also be supported, as well as generic interfaces.

// An example from the future:

/**
 * @kphp-generic T
 */
class Container {
    /** @var T[] */
    private array $items = [];

    /**
     * @param T $e
     */
    function append($e) {
        $this->items[] = $e;
    }

    /**
     * @return T[]
     */
    function getAll() {
        return $this->items;
    }

    /**
     * @kphp-generic T2
     * @param Container<T2> $rhs
     */
    function equalSizes($rhs) {
        return count($this->items) === count($rhs->items);
    }

    /**
     * @return Container<mixed>
     */
    function toMixed() {
        $c_mixed = new self /*<mixed>*/();
        foreach ($this->items as $i) {
            $c_mixed->append($i);
        }
        return $c_mixed;
    }

    /**
     * @kphp-generic T
     * @return Container<T>
     */
    static function createEmpty() {
        return new Container() /*<T>*/;
    }
}

// To learn more about generic classes visit https://vkcom.github.io/kphp/kphp-language/static-type-system/generic-classes.html
`
    ),
    new Example(
        "Coroutines (forks)",
        `<?php
// KPHP supports some kind of coroutines (green threads).
// It is not multithreading — it is switching execution context to perform computations while another function is waiting for data.

function task(int $id, int $duration): string {
    echo "task $id start <br>";
    sleep($duration);
    return "task $id finish <br>";
}

// In PHP fork() does almost nothing, the code remains synchronous. But in KPHP it becomes parallel.
$task1_future = fork(task(1, 7));
$task2_future = fork(task(2, 5));
$task3_future = fork(task(3, 1));

$task1 = wait($task1_future);
echo $task1;
$task2 = wait($task2_future);
echo $task2;
$task3 = wait($task3_future);
echo $task3;

// This can remind async/await from other languages. This is partially true, but forks syntax is focused to be used without changing PHP code.
// So, you can call f() to get T and you can call fork(f()) to get future<T>.

// To learn more about coroutines in KPHP visit https://vkcom.github.io/kphp/kphp-language/best-practices/async-programming-forks.html
`
    ),
    new Example(
        "JSON Encoding/Decoding",
        `<?php
$array = ["a" => 1, "b" => 2, "c" => 3, "d" => 4, "e" => 5];
print_r($array);

// json_encode — returns the JSON representation of a value.
$json = json_encode($array);
echo $json . "<br>";

// json_decode — decodes a JSON string.
$array = json_decode($json);
print_r($array);
`
    )];
