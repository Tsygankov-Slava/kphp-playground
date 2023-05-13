<?php

require_once '../vendor/autoload.php';

if (isset($_POST)) {
    function getCode(): string {
        $json = file_get_contents('php://input');
        $obj = json_decode($json);

        return !empty($obj->code) ? $obj->code : "";
    }

    function createFileWithCode(string $code) {
        $file = fopen("code.php", "w");
        fwrite($file, $code);
        fclose($file);
    }

    /**
     * @param ?string[] $output
     */
    function compile(&$output, ?int &$result_val) {
        $command = "/Users/tv/KPHP/kphp/objs/bin/kphp2cpp -M cli ./code.php";
        exec($command, $output, $result_val);
    }

    /**
     * @param ?string[] $output
     */
    function run(&$output, ?int &$result_val) {
        exec("./kphp_out/cli", $output, $result_val);
    }

    $code = getCode();

    /* @var ?string[] $output */
    $output = [];

    /* @var ?int $result_val_comp */
    $result_val_comp = null;

    /* @var ?int $result_val_exec */
    $result_val_exec = null;

    if (!empty($code)) {
        createFileWithCode($code);
        compile($output, $result_val_comp);
        run($output, $result_val_exec);
    }

    $result = array(
        "output" => $output,
        "result_val_comp" => $result_val_comp,
        "result_val_exec" => $result_val_exec
    );
    echo json_encode($result);
}
