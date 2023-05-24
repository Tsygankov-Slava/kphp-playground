export default class ThemeManager {
    #changeThemeImg = document.getElementById("header__theme__img");
    #theme = localStorage['playground-theme'];
    #refreshBtn = document.getElementById("settings__btn-refresh__img");
    #downArrow = document.getElementById("settings__examples-select__down-arrow");
    #settingsBtn = document.getElementById("settings__btn-settings__img");
    #downArrowSettingsFont = document.getElementById("settings-panel__main__font-main__font-select-btn__img");
    #downArrowSettingsTheme = document.getElementById("settings-panel__main__editor-main__theme-select-btn__img");
    #closeSettingsBtn = document.getElementById("settings-panel__close-btn__img");
    #hideCompilePanelBtn = document.getElementById("compile_panel__header__img-hide");

    constructor() {
        if (this.#theme == "light") {
            this.#setLightTheme();
        } else {
            this.#setDarkTheme();
        }

        this.#changeThemeImg.addEventListener('click', () => {
            if (this.#theme === "dark") {
                this.#setLightTheme();
            } else {
                this.#setDarkTheme();
            }
        });
    }

    #setLightTheme() {
        this.#theme = "light";
        localStorage.setItem("playground-theme", "light");
        document.body.setAttribute('light', '');

        this.#changeThemeImg.src = "images/light/moon.png";
        this.#refreshBtn.src = "images/light/refresh.png";
        this.#downArrow.src = "images/light/down-arrow.png";
        this.#settingsBtn.src = "images/light/settings.png";
        this.#downArrowSettingsFont.src = "images/light/down-arrow.png";
        this.#downArrowSettingsTheme.src = "images/light/down-arrow.png";
        this.#closeSettingsBtn.src = "images/light/close.png";
        this.#hideCompilePanelBtn.src = "images/light/hide-compile_panel-btn.png";
    }

    #setDarkTheme() {
        this.#theme = "dark";
        localStorage.setItem("playground-theme", "dark");
        document.body.removeAttribute('light');

        this.#changeThemeImg.src = "images/dark/sun.png";
        this.#refreshBtn.src = "images/dark/refresh.png";
        this.#downArrow.src = "images/dark/down-arrow.png";
        this.#settingsBtn.src = "images/dark/settings.png";
        this.#downArrowSettingsFont.src = "images/dark/down-arrow.png";
        this.#downArrowSettingsTheme.src = "images/dark/down-arrow.png";
        this.#closeSettingsBtn.src = "images/dark/close.png";
        this.#hideCompilePanelBtn.src = "images/dark/hide-compile_panel-btn.png";
    }
}