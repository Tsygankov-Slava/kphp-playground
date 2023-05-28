import {fonts} from "./Fonts/fonts.js";
import {editor} from "../main.js";

export default class Settings {
    #panel = document.getElementById("settings-panel");
    #settingsBtn = document.getElementById("settings__btn-settings");
    #closeSettingsBtn = document.getElementById("settings-panel__close-btn");
    #fontSizeInput = document.getElementById("settings-panel__main__font-main__size-input");
    #lineHeightInput = document.getElementById("settings-panel__main__font-main__line-height-input");
    #fontSelectBtn = document.getElementById("settings-panel__main__font-main__font-select-btn");
    #fontSelectContent = document.getElementById("settings-panel__main__font-main-select-content");
    #fontSelectBtnText = document.getElementById("settings-panel__main__font-main__font-select-btn-text");
    #fontsList = document.getElementsByClassName("settings-panel__main__font-main-select-content-text");
    #themeSelectBtn = document.getElementById("settings-panel__main__editor-main__theme-select-btn");
    #themeSelectBtnText = document.getElementById("settings-panel__main__editor-main__theme-select-btn-text");
    #themeSelectContent = document.getElementById("settings-panel__main__editor-main__theme-select-content");
    #themeList = document.getElementsByClassName("settings-panel__main__editor-main__theme-select-content-text");
    #lineNumbersCheckbox = document.getElementById("settings-panel__main__editor-main__line-numbers__checkbox");
    #editor = document.getElementsByClassName("CodeMirror")[0];

    #font = (localStorage["font"]) ? localStorage["font"] : "JetBrains Mono";
    #fontSize = (localStorage["font-size"]) ? localStorage["font-size"] : "12";
    #lineHeight = (localStorage["line-height"]) ? localStorage["line-height"] : "1.5";
    #theme = (localStorage["theme"]) ? localStorage["theme"] : "friendship-bracelet";
    #lineNumbers;


    constructor() {
        this.#settingsBtn.addEventListener('click', this.#showPanel.bind(this));
        this.#closeSettingsBtn.addEventListener('click', this.#closePanel.bind(this));

        window.addEventListener('click', this.#displayAllFonts.bind(this));
        window.addEventListener('click', this.#displayAllThemes.bind(this));

        for (let i = 0; i < this.#fontsList.length; i++) {
            let elementOfFonts = this.#fontsList[i];
            elementOfFonts.addEventListener('click', () => {
                const fontName = elementOfFonts.childNodes[1].innerHTML;
                this.#changeFont(fontName);
            });
        }

        for (let i = 0; i < this.#themeList.length; i++) {
            let elementOfThemes = this.#themeList[i];
            elementOfThemes.addEventListener('click', () => {
                const themeName = elementOfThemes.childNodes[1].innerHTML;
                this.#changeTheme(themeName);
            });
        }

        const font = fonts.find(el => el.name === this.#font)
        this.#editor.style.fontFamily = font.declaration;
        this.#editor.style.fontSize = this.#fontSize + "px";
        this.#editor.style.lineHeight = this.#lineHeight;
        editor.editor.setOption("theme", this.#theme);

        if (localStorage["line-numbers"] === "false") {
            this.#lineNumbers = false;
        } else {
            this.#lineNumbers = true;
        }
        editor.editor.setOption("lineNumbers", this.#lineNumbers);

        this.#fontSizeInput.addEventListener("input", this.#changeFontSize.bind(this));
        this.#lineHeightInput.addEventListener("input", this.#changeLineHeight.bind(this));
        this.#lineNumbersCheckbox.addEventListener("change", this.#changeLineNumbersState.bind(this));
    }

    #showPanel() {
        this.#panel.style.display = "flex";
        this.#editor.style.filter = "blur(1px)";

        this.#fontSizeInput.value = (localStorage["font-size"]) ? localStorage["font-size"] : "12";
        this.#lineHeightInput.value = (localStorage["line-height"]) ? localStorage["line-height"] : "1.5";

        this.#fontSelectBtnText.innerHTML = (localStorage["font"]) ? localStorage["font"] : "JetBrains Mono";
        this.#themeSelectBtnText.innerHTML = (localStorage["theme"]) ? localStorage["theme"] : "friendship-bracelet";

        if (localStorage["line-numbers"] === "false") {
            this.#lineNumbersCheckbox.checked = false;
        } else {
            this.#lineNumbersCheckbox.checked = true;
        }
    }

    #closePanel() {
        this.#panel.style.display = "none";
        this.#editor.style.filter = "blur(0)";
    }

    #changeFontSize() {
        this.#editor.style.fontSize = this.#fontSizeInput.value + "px";
        localStorage.setItem("font-size", this.#fontSizeInput.value);
    }

    #changeLineHeight() {
        this.#editor.style.lineHeight = this.#lineHeightInput.value;
        localStorage.setItem("line-height", this.#lineHeightInput.value);
    }

    #changeLineNumbersState() {
        editor.editor.setOption("lineNumbers", this.#lineNumbersCheckbox.checked);
        localStorage.setItem("line-numbers", this.#lineNumbersCheckbox.checked);
    }

    #displayAllFonts(e) {
        if (this.#fontSelectBtn.contains(e.target) && this.#fontSelectContent.style.display === "none") {
            this.#fontSelectContent.style.display="inline-block";
        } else {
            this.#fontSelectContent.style.display="none";
        }
    }

    #displayAllThemes(e) {
        if (this.#themeSelectBtn.contains(e.target) && this.#themeSelectContent.style.display === "none") {
            this.#themeSelectContent.style.display="inline-block";
        } else {
            this.#themeSelectContent.style.display="none";
        }
    }

    #changeFont(fontName) {
        this.#fontSelectBtnText.innerHTML = fontName;
        localStorage.setItem("font", fontName);

        const font = fonts.find(el => el.name === fontName)
        this.#editor.style.fontFamily = font.declaration;
    }

    #changeTheme(themeName) {
        this.#themeSelectBtnText.innerHTML = themeName;
        localStorage.setItem("theme", themeName);

        editor.editor.setOption("theme", themeName);
    }
}