<?php

if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    /**
     * @param mixed $obj
     * @return string|mixed
     */
    function getCode($obj) {
        return !empty($obj["code"]) ? $obj["code"] : "";
    }

    /**
     * @param mixed $obj
     * @return string|mixed
     */
    function getRunArguments($obj) {
        return !empty($obj["runArguments"]) ? $obj["runArguments"] : "";
    }

    /**
     * @param mixed $code
     */
    function createFileWithCode($code) {
        $file = fopen("code.php", "w");
        fwrite($file, $code);
        fclose($file);
    }

    /**
     * @param mixed $output_comp
     */
    function compile(&$output_comp, int &$result_val_comp) {
        $command = "/Users/tv/KPHP/kphp/objs/bin/kphp2cpp -M cli ./code.php 2>&1";

        // for debug
        // $command = "kphp -M cli ./code.php 2>&1";

        exec($command, $output_comp, $result_val_comp);
    }

    /**
     * @param mixed $output_run
     * @param mixed $runArguments
     */
    function run(&$output_run, int &$result_val, $runArguments) {
        $command = "./kphp_out/cli " . $runArguments . " 2>&1 --Xkphp-options -u root";

        // for debug
        //$command = "./kphp_out/cli " . $runArguments . " 2>&1";

        exec($command, $output_run, $result_val);
    }

    $code = getCode($obj);
    $runArguments = getRunArguments($obj);

    /* @var mixed $output_comp */
    $output_comp = [];

    /* @var mixed[] $output_run */
    $output_run = [];

    $result_val_comp = 1;
    $result_val_exec = 1;

    if (!empty($code)) {
        createFileWithCode($code);
        compile($output_comp, $result_val_comp);
        if (!$result_val_comp) {
            run($output_run, $result_val_exec, $runArguments);
        }
    }

    $output_comp_str = "";
    foreach ($output_comp as $str) {
            $output_comp_str .= $str . "\n";
    }

    $result = array(
        "build_log" => $output_comp_str,
        "output" => $output_run,
        "result_val_comp" => $result_val_comp,
        "result_val_exec" => $result_val_exec
    );
    echo json_encode($result);
}
