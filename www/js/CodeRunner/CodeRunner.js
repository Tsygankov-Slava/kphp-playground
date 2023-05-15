export default class CodeRunner {
    #url = "http://localhost:8001/server/index.php";
    #options;

    async run(code) {
        const data = { code: code };
        this.#options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        return await this.#request();
    }

    async #request() {
        const response = await fetch(this.#url, this.#options);
        const result = await response.json();
        return result;
    }
}
