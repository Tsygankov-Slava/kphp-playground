import {compilePanel, formatter, settings} from "../main.js";

export default class KeyboardsShortcutsManager {

    #helpBtn = document.getElementById("keyboards-shortcuts_help_btn");
    #closeBtn = document.getElementById("keyboards-shortcuts_help_content__header_close-btn");
    #helpContent = document.getElementById("keyboards-shortcuts_help_content");
    constructor() {
        document.addEventListener('keydown', this.#determineKeyboardsShortcuts.bind(this));

        this.#helpBtn.addEventListener('click', this.#displayInformation.bind(this));

        this.#closeBtn.addEventListener('click', () => {
            this.#helpContent.style.display = "none";
        })

        const platform = (navigator.userAgentData?.platform || navigator.platform)?.toLowerCase();
        if (platform.startsWith("windows")) {
            let CtrlButtons = document.getElementsByClassName("keyboards-shortcuts_help_content__main_keyboard-combination-ctrl-btn");
            for (let i = 0; i < CtrlButtons.length; ++i) {
                CtrlButtons[i].innerHTML = "Ctrl";
            }
        }
    }

    #determineKeyboardsShortcuts(event) {
        const isCtrlR = event.ctrlKey && (event.key === "r" || event.key === "R");
        const isCtrlF = event.ctrlKey && (event.key === "f" || event.key === "F");
        const isCtrlT = event.ctrlKey && (event.key === "t" || event.key === "T");
        const isCtrlI = event.ctrlKey && (event.key === "i" || event.key === "I");
        const isCtrlS = event.ctrlKey && (event.key === "s" || event.key === "S");
        const isCtrlPlus = event.ctrlKey && (event.key === "+" || event.key === "=");
        const isCtrlMinus = event.ctrlKey && (event.key === "-" || event.key === "_");
        if (isCtrlR) {
            compilePanel.runCompile();
        } else if (isCtrlF) {
            formatter.format();
        } else if (isCtrlT) {
            if (!compilePanel.isVisible()){
                compilePanel.show();
            } else {
                compilePanel.hidden();
            }
        } else if (isCtrlI) {
            this.#displayInformation();
        } else if (isCtrlS) {
            settings.displayPanel();
        } else if (isCtrlPlus) {
            settings.setFontSize(parseInt(settings.getFontSize()) + 1);
        } else if (isCtrlMinus) {
            settings.setFontSize(parseInt(settings.getFontSize()) - 1);
        }
    }

    #displayInformation() {
        if (this.#helpContent.style.display === "none" || this.#helpContent.style.display === '') {
            this.#helpContent.style.display = "block";
        } else {
            this.#helpContent.style.display = "none";
        }
    }
}