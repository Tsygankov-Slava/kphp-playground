<?php

require_once '../vendor/autoload.php';

if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $obj = json_decode($json);
    /**
     * @param mixed $obj
     */
    function getCode(&$obj): string {
        return !empty($obj->code) ? $obj->code : "";
    }

    /**
     * @param mixed $obj
     */
    function getRunArguments(&$obj): string {
        return !empty($obj->runArguments) ? $obj->runArguments : "";
    }

    function createFileWithCode(string $code) {
        $file = fopen("code.php", "w");
        fwrite($file, $code);
        fclose($file);
    }

    /**
     * @param ?string[] $output_comp_stdout
     * * @param ?string[] $output_comp_stderr
     */
    function compile(&$output_comp_stdout, &$output_comp_stderr, ?int &$result_val) {
        $command = "time /Users/tv/KPHP/kphp/objs/bin/kphp2cpp -M cli ./code.php";
        $proc = proc_open($command, [1 => ['pipe', 'w'], 2 => ['pipe','w']], $pipes);
        $stdout = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        proc_close($proc);

        $output_comp_stdout = $stdout;
        $output_comp_stderr = $stderr;

        $result_val = empty($output_comp_stdout) ? 0 : 1;
    }

    /**
     * @param ?string[] $output_run
     */
    function run(&$output_run, ?int &$result_val, string $runArguments) {
        $command = "./kphp_out/cli " . $runArguments;
        exec($command, $output_run, $result_val);
    }

    $code = getCode($obj);
    $runArguments = getRunArguments($obj);

    /* @var ?string[] $output_comp_stdout */
    $output_comp_stdout = [];

    /* @var ?string[] $output_comp_stderr */
    $output_comp_stderr = [];

    /* @var ?string[] $output_run */
    $output_run = [];

    /* @var ?int $result_val_comp */
    $result_val_comp = null;

    /* @var ?int $result_val_exec */
    $result_val_exec = null;

    if (!empty($code)) {
        createFileWithCode($code);
        compile($output_comp_stdout, $output_comp_stderr, $result_val_comp);
        if (!$result_val_comp) {
            run($output_run, $result_val_exec, $runArguments);
        }
    }

    $result = array(
        "build_log_stdout" => $output_comp_stdout,
        "build_log_stderr" => $output_comp_stderr,
        "output" => $output_run,
        "result_val_comp" => $result_val_comp,
        "result_val_exec" => $result_val_exec
    );
    echo json_encode($result);
}
