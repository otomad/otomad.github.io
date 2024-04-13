"use strict";
(function () {
    //#region 准备工作
    /**
     * 获取当前脚本所在的路径。
     * @returns 当前脚本所在的路径。
     */
    function getThisScriptPath() {
        const scripts = document.getElementsByTagName("script");
        const src = scripts[scripts.length - 1].getAttribute("src") ?? "";
        if (src === "")
            throw new Error("This script may be imported as a module, please including by script tag with \"text/javascript\" type in this version.");
        let thisPath = src.slice(0, src.lastIndexOf("/") + 1);
        return thisPath;
    }
    const thisPath = getThisScriptPath();
    /**
     * 提供一个相对于当前脚本文件的文件路径，返回指定文件的绝对路径。
     * @param {string} href - 相对于当前脚本文件的文件路径。
     * @returns 指定文件的绝对路径。
     */
    const path = (href = "") => thisPath + href;
    /**
     * 返回指定对象的类型。对于非原生对象依然有效。
     * @param {object} obj - 对象。
     * @returns 指定对象的类型。
     */
    const type = (obj) => (obj ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1));
    let profile = {};
    if (type(globalThis.NightTime) === "Object")
        Object.assign(profile, globalThis.NightTime);
    //#region 扩展方法
    /**
     * 对字符串的某个字符进行替换。
     * @param {string} string - 源字符串。
     * @param {number} index - 待替换字符的索引。
     * @param {string} character - 替换的字符。
     * @returns 输出的新字符串。
     */
    const replaceChar = (string, index, character = "") => string.slice(0, index) + character + string.slice(index + 1);
    /**
     * 将小驼峰型名称转换为连字符型名称。
     * @param {string} camelCase - 小驼峰型名称。
     * @returns 连字符型名称。
     */
    function camelToHyphenCase(camelCase) {
        var hyphenCase = "";
        for (let i = 0; i < camelCase.length; i++) {
            if (camelCase[i].toLowerCase() !== camelCase[i])
                hyphenCase += "-" + camelCase[i].toLowerCase();
            else
                hyphenCase += camelCase[i];
        }
        return hyphenCase;
    }
    //#endregion
    //#endregion
    class NightTime {
        static instance;
        #isDark = false;
        #isDarkFact = false;
        #isLocked = false;
        #profile;
        #lightBackgroundColor = "white";
        #darkBackgroundColor = "#222";
        #lightCSS;
        #darkCSS;
        #defineCustomBackgroundColor = false;
        // #darkDo: () => void = nothingToDo;
        // #lightDo: () => void = nothingToDo;
        #darkActions = [];
        #lightActions = [];
        #themeChangeActions = [];
        set darkDo(func) {
            if (!this.#darkActions.includes(func))
                this.#darkActions.push(func);
        }
        set lightDo(func) {
            if (!this.#lightActions.includes(func))
                this.#lightActions.push(func);
        }
        set onThemeChange(func) {
            if (!this.#themeChangeActions.includes(func))
                this.#themeChangeActions.push(func);
        }
        removeDarkDo(...funcs) {
            funcs.forEach((func, index) => {
                if ((index = this.#darkActions.indexOf(func)) !== -1)
                    this.#darkActions.splice(index, 1);
            });
        }
        removeLightDo(...funcs) {
            funcs.forEach((func, index) => {
                if ((index = this.#lightActions.indexOf(func)) !== -1)
                    this.#lightActions.splice(index, 1);
            });
        }
        removeThemeChange(...funcs) {
            funcs.forEach((func, index) => {
                if ((index = this.#themeChangeActions.indexOf(func)) !== -1)
                    this.#themeChangeActions.splice(index, 1);
            });
        }
        constructor(profile = {}) {
            if (new.target.instance != undefined)
                return new.target.instance; // throw new Error("NightTime is a singleton, please use NightTime.instance instead.");
            new.target.instance = this;
            const hour = new Date().getHours();
            if (hour < 7 || hour >= 19 || // 晚上 7 点到次日早上 7 点启动深色主题。
                window.matchMedia("(prefers-color-scheme: dark)").matches // 若浏览器开启了深色主题，也会启动深色主题。
            )
                this.#isDark = this.#isDarkFact = true;
            Object.freeze(profile);
            this.#profile = profile;
            if (typeof profile.darkMode === "boolean") {
                this.#isDark = !!profile.darkMode;
                this.#isLocked = true;
            }
            if (typeof profile.nightDo === "function")
                this.darkDo = profile.nightDo;
            if (typeof profile.darkDo === "function")
                this.darkDo = profile.darkDo;
            if (typeof profile.lightDo === "function")
                this.lightDo = profile.lightDo;
            if (profile.lightBackgroundColor || profile.darkBackgroundColor) {
                if (profile.lightBackgroundColor)
                    this.#lightBackgroundColor = profile.lightBackgroundColor;
                if (profile.darkBackgroundColor)
                    this.#darkBackgroundColor = profile.darkBackgroundColor;
                this.#defineCustomBackgroundColor = true;
            }
            if (profile.lightCSS)
                this.#lightCSS = profile.lightCSS;
            if (profile.darkCSS)
                this.#darkCSS = profile.darkCSS;
            if (!this.#isLocked)
                window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", mediaQueryList => (this.isDark = !mediaQueryList.matches));
            this.current();
        }
        get isDarkFact() { return this.#isDarkFact; }
        get theme() {
            const css = document.getElementById("css");
            if (!(css instanceof HTMLLinkElement))
                return null;
            const dataTheme = css.getAttribute("data-theme");
            if (dataTheme === null)
                return null;
            return dataTheme.toLowerCase();
        }
        get profile() { return this.#profile ?? {}; }
        get isDark() { return this.#isDark; }
        set isDark(isDark) {
            if (this.#isLocked)
                return;
            this.#isDark = isDark;
            this.#apply();
        }
        /**
         * 根据是否为深色来应用并切换主题。
         */
        #apply() {
            if (this.#isDark)
                this.#darkModeStyle();
            else
                this.#lightModeStyle();
        }
        /**
         * 切换到当前主题。
         * 切换到正常情况下配置而应该呈现的主题。
         */
        current() {
            this.#isLocked = false;
            this.#isDark = this.#isDarkFact;
            this.#apply();
        }
        /**
         * 切换到对立主题。
         * 切换到不是当前状态下的主题，即浅色深色模式互相切换。
         */
        toggle() {
            this.#isLocked = false;
            this.isDark = !this.isDark;
        }
        #scrollbar() {
            this.appendStyleByAjax(`css/scrollbar.css`, "scrollbar", new Map([
                ["var(--text-color-parts)", this.isDark ? "255, 255, 255" : "0, 0, 0"],
            ]));
        }
        //#region CSS 辅助操作方法
        /**
         * 输入 CSS 文本并添加到 style 标签。
         * @param {string | object} style - 必选，可以是模板字符串或对象，将会添加到 style 标签中。
         * @param {string?} id - 可选，添加到的 style 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期。
         * @param {boolean} useNode - 可选，是否使用“style”节点的方式添加。默认为否。
         * @returns {boolean} true - 添加成功；false - 添加失败，输入的 id 名称被占用且不为 style 标签。
         */
        appendStyle(style, id = "", useNode = true) {
            let css;
            if (type(style) === "Object") {
                css = JSON.stringify(style, undefined, "\t");
                css = css.replace(/\:\s*\{/g, " {").replace(/\}\s*\,/g, "}").replace(/\,\n/g, ";\n").replace(/\"/g, "").slice(1, -1);
            }
            else
                css = style;
            if (useNode) {
                let styleTag = document.getElementById(id);
                if (!styleTag) {
                    styleTag = document.createElement("style");
                    styleTag.id = id;
                    styleTag.type = "text/css";
                    document.head.appendChild(styleTag);
                }
                if (!(styleTag instanceof HTMLStyleElement)) {
                    console.error(resource().notAvailableLog);
                    return false;
                }
                styleTag.innerHTML = css;
            }
            else {
                // TODO
            }
            return true;
        }
        /**
         * 输入 CSS 文件链接并添加到 link 标签。
         * @param {string} href - 必选，CSS 文件的链接地址。
         * @param {string?} id - 可选，添加到的 link 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期。
         * @returns {boolean} true - 添加成功；false - 添加失败，输入的 id 名称被占用且不为 link 标签。
         */
        appendCSSLink(href, id = "") {
            let linkTag = document.getElementById(id);
            if (!linkTag) {
                linkTag = document.createElement("link");
                linkTag.id = id;
                linkTag.rel = "stylesheet";
                linkTag.type = "text/css";
                document.head.appendChild(linkTag);
            }
            if (!(linkTag instanceof HTMLLinkElement)) {
                console.error(resource().notAvailableLog);
                return false;
            }
            linkTag.href = href;
            return true;
        }
        /**
         * 输入 CSS 文件链接并添加到 style 标签，通过异步实现。
         * @param {string} href - 必选，CSS 文件的链接地址。
         * @param {string?} id - 可选，添加到的 link 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期。
         * @param {Map<string, string>?} variable - 可选，变量名称，规定 CSS 文件的某些变量的替换值。
         * @returns {boolean} true - 添加成功；false - 添加失败，输入的 id 名称被占用且不为 link 标签。
         */
        appendStyleByAjax(href, id = "", variable) {
            const css = new XMLHttpRequest();
            css.onreadystatechange = () => {
                if (css.readyState == 4 && css.status == 200) {
                    let cssText = css.responseText;
                    if (type(variable) === "Object")
                        for (let key in variable)
                            // cssText = cssText.replace(new RegExp(`${key}(?![a-zA-Z0-9])`, 'g'), variable[key]);
                            cssText = cssText.replaceAll(key, variable[key]);
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement("style");
                        styleTag.id = id;
                        styleTag.type = "text/css";
                        document.head.appendChild(styleTag);
                    }
                    if (!(styleTag instanceof HTMLStyleElement)) {
                        console.error(resource().notAvailableLog);
                        return false;
                    }
                    styleTag.innerHTML = cssText;
                    return true;
                }
            };
            css.open("GET", path(href), true);
            css.send();
            return true;
        }
        /**
         * 移除样式或 CSS 链接标签。
         * removeStyle 和 removeCSSLink 效果是一样的。
         * @param {string} id - 必选，要移除的 CSS 样式的 id 名称。
         * @returns {boolean} true - 移除成功；false - 移除失败，移除的不是 style 或 link 标签。
         */
        removeStyle(id) {
            let el = document.getElementById(id);
            if (!el)
                return false;
            if (!(el instanceof HTMLStyleElement || el instanceof HTMLLinkElement))
                return false;
            el.remove();
            return true;
        }
        removeCSSLink = this.removeStyle;
        addAdoptedStyleSheet(...styles) {
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
        }
        removeAdoptedStyleSheet(style) {
            const index = document.adoptedStyleSheets.indexOf(style);
            if (index === -1) {
                console.error(new Error("Cannot find the style specified."));
                return;
            }
            const sheets = document.adoptedStyleSheets.slice();
            sheets.splice(index, 1);
            document.adoptedStyleSheets = sheets;
        }
        //#endregion
        /**
         * 强制切换到深色主题
         */
        #darkModeStyle() {
            this.#isDark = true;
            if (this.theme?.includes("bootstrap")) {
                this.appendCSSLink(resource().bootstrap5DarkLink, "css");
                for (let navBar of document.getElementsByClassName("navbar")) {
                    navBar.classList.remove("navbar-light");
                    navBar.classList.remove("bg-light");
                    navBar.classList.add("navbar-dark");
                    navBar.classList.add("bg-dark");
                }
                const bbolsf = "bootstrap-btn-outline-light-style-fix";
                this.appendStyleByAjax(`css/${bbolsf}.css`, bbolsf);
            }
            this.#scrollbar();
            this.removeStyle("light-root");
            this.appendStyle({
                ":root": {
                    "--text-color": "white",
                    "--background-color": this.#darkBackgroundColor
                }
            }, "dark-root");
            document.documentElement.dataset.theme = "dark";
            this.#darkActions.forEach(action => action());
            this.#forEachThemeChangeActions();
            if (this.#defineCustomBackgroundColor)
                document.body.style.backgroundColor = this.#darkBackgroundColor;
            if (this.#darkCSS)
                this.appendCSSLink(this.#darkCSS, "css");
        }
        /**
         * 强制切换到浅色主题
         */
        #lightModeStyle() {
            this.#isDark = false;
            if (this.theme?.includes("bootstrap")) {
                this.appendCSSLink(resource().bootstrap5LightLink, "css");
                for (let navBar of document.getElementsByClassName("navbar")) {
                    navBar.classList.remove("navbar-dark");
                    navBar.classList.remove("bg-dark");
                    navBar.classList.add("navbar-light");
                    navBar.classList.add("bg-light");
                }
            }
            this.#scrollbar();
            this.removeStyle("bootstrap-btn-outline-light-style-fix");
            this.removeStyle("dark-root");
            this.appendStyle({
                ":root": {
                    "--text-color": "black",
                    "--background-color": this.#lightBackgroundColor
                }
            }, "light-root");
            document.documentElement.dataset.theme = "light";
            this.#lightActions.forEach(action => action());
            this.#forEachThemeChangeActions();
            if (this.#defineCustomBackgroundColor)
                document.body.style.backgroundColor = this.#lightBackgroundColor;
            if (this.#lightCSS)
                this.appendCSSLink(this.#lightCSS, "css");
        }
        #forEachThemeChangeActions() {
            this.#themeChangeActions.forEach(action => action({
                isDark: this.#isDark,
                isLight: !this.#isDark
            }));
        }
    }
	globalThis.NightTime = new NightTime(profile);
    /**
     * 底部的资源文件。
     * 利用函数提升特性。
     */
    function resource() {
        return {
            notAvailableLog: new Error("The ID you specified has been occupied by the other element, please try to use other ID!"),
            bootstrap5LightLink: "https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css",
            bootstrap5DarkLink: "https://bootswatch.com/5/darkly/bootstrap.min.css",
        };
    }
}());
//# sourceMappingURL=NightTime.js.map
