export default class CodeRunner {
    #url = "http://localhost:8001/server/index.php";
    #options;
    #result;

    async run(code, runArguments) {
        const data = { code: code, runArguments: runArguments };
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
