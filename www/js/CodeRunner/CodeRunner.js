export default class CodeRunner {
    //#url = "https://kphp-playground.ru/server/kphp_out/server";

    // for debug
    #url = "http://localhost:8000/server/index.php";

    #options;
    #result;

    async build(code) {
        const data = { state: "build", code: code };
        this.#options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        await this.#request();
    }

    async run(runArguments) {
        const data = { state: "run", runArguments: runArguments };
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
