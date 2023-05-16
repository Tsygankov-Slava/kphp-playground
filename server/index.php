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
     * @param ?string[] $output_comp
     */
    function compile(&$output_comp, ?int &$result_val) {
        $command = "time /Users/tv/KPHP/kphp/objs/bin/kphp2cpp -M cli ./code.php";

        $proc = proc_open($command, [2 => ['pipe','w']], $pipes);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        proc_close($proc);

        $output_comp = $stderr;
    }

    /**
     * @param ?string[] $output_run
     */
    function run(&$output_run, ?int &$result_val) {
        $command = "./kphp_out/cli";
        exec($command, $output_run, $result_val);
    }

    $code = getCode();

    /* @var ?string[] $output_comp */
    $output_comp = [];

    /* @var ?string[] $output_run */
    $output_run = [];

    /* @var ?int $result_val_comp */
    $result_val_comp = null;

    /* @var ?int $result_val_exec */
    $result_val_exec = null;

    if (!empty($code)) {
        createFileWithCode($code);
        compile($output_comp, $result_val_comp);
        if (!$result_val_comp) {
            run($output_run, $result_val_exec);
        }
    }

    $result = array(
        "build_log" => $output_comp,
        "output" => $output_run,
        "result_val_comp" => $result_val_comp,
        "result_val_exec" => $result_val_exec
    );
    echo json_encode($result);
}
