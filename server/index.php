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

    function generateFilename(): string {
        return md5(rand());
    }

    /**
     * @param mixed $code
     * @param mixed $filename
     */
    function createFileWithCode($code, &$filename) {
        if (empty($filename)) {
            $filename = generateFilename();
	}
        $file = fopen("cli_files/" . $filename . ".php", "w");
        fwrite($file, $code);
        fclose($file);
    }

    /**
     * @param mixed $output_comp
     * @param mixed $filename
     */
    function compile(&$output_comp, int &$result_val_comp, $filename) {
        $command = "cd cli_files/; kphp -M cli -o " . $filename . " " . $filename . ".php 2>&1";

        // for debug
        //$command = "cd cli_files/; /Users/tv/KPHP/kphp/objs/bin/kphp2cpp -M cli -o" . $filename . " " . $filename . ".php 2>&1";

        exec($command, $output_comp, $result_val_comp);
    }

    /**
     * @param mixed $output_run
     * @param mixed $filename
     * @param mixed $runArguments
     */
    function run(&$output_run, int &$result_val, $filename, $runArguments) {
        $command = "cd cli_files/; ./" . $filename . " " . $runArguments . " 2>&1 --Xkphp-options -u root";

        // for debug
        // $command = "cd cli_files/; ./" . $filename . " " . $runArguments . " 2>&1 --Xkphp-options";

        exec($command, $output_run, $result_val);
    }

    if ($obj["state"] == "build") {
        /* @var mixed $output_comp */
        $output_comp = [];
        $result_val_comp = 1;

        $code = getCode($obj);
        $filename = $obj["filename"];
        if (!empty($code)) {
            createFileWithCode($code, $filename);
            compile($output_comp, $result_val_comp, $filename);
        }

        $output_comp_str = "";
        foreach ($output_comp as $str) {
            $output_comp_str .= $str . "\n";
        }

        $result = array(
            "filename" => $filename,
            "build_log" => $output_comp_str,
            "result_val_comp" => $result_val_comp,
        );

    } else {
        /* @var mixed[] $output_run */
        $output_run = [];
        $result_val_exec = 1;

	$filename = $obj["filename"];
        $runArguments = getRunArguments($obj);
        run($output_run, $result_val_exec, $filename, $runArguments);

        $result = array(
            "output" => $output_run,
            "result_val_exec" => $result_val_exec
        );
    }

    echo json_encode($result);
}
