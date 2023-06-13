export default class CodeRunner {
    //#url = "https://kphp-playground.ru/server/kphp_out/server";

    // for debug
    #url = "http://localhost:8000/server/index.php";

    #options;
    #result;

    async build(code, filename) {
        const data = { state: "build", filename: filename, code: code };
        this.#options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        await this.#request();
    }

    async run(filename, runArguments) {
        const data = { state: "run", filename: filename, runArguments: runArguments };
        this.#options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        await this.#request();
    }

    async #request() {
        const response = await fetch(this.#url, this.#options);
        this.#result = await response.json();
    }

    getResult() {
        return this.#result;
    }
}
