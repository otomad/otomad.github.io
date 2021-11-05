"use strict";

// const rootStyles = document.head.querySelectorAll("link[rel=stylesheet], style, script");
class ContentInfoElement extends HTMLElement {
	constructor() {
		super();
		// 在此定义自定义标签
		// 绑定监听事件
		this.onMutation = this.onMutation.bind(this);
	}
	#component = null;
	#targetId = "";
	#resources = {
		arrow: {
			up: "bi bi-chevron-up",
			down: "bi bi-chevron-down"
		},
		caption: {
			hide: "收起简介",
			show: "展开简介"
		},
		style: "",
	};
	get cardLike() {
		return this.hasAttribute("card");
	}
	get accordionLike() {
		return this.hasAttribute("accordion");
	}
	connectedCallback() {
		// 获取标签里面传递的值
		this.#resources.caption.show = this.getAttribute("show-details-text") ?? this.#resources.caption.show;
		this.#resources.caption.hide = this.getAttribute("hide-details-text") ?? this.#resources.caption.hide;
		this.#resources.style = this.getAttribute("style") ?? this.#resources.style;

		if (this.accordionLike) {
			// 创建我们需要的标签
			this.#component = {
				wrapper: document.createElement("div"),
				accordionItem: document.createElement("div"),
				accordionHeader: document.createElement("h2"),
				toggler: document.createElement("button"),
				accordionCollapse: document.createElement("div"),
				allContent: document.createElement("div"),
				style: document.createElement("style"),
			};

			this.#targetId = "content-info-accordion-collapse";

			// 为标签添加样式
			this.#component.wrapper.className = "accordion mb-3";
			this.#component.accordionItem.className = "accordion-item";
			this.#component.accordionHeader.className = "accordion-header";
			this.#component.toggler.className = "accordion-button collapsed";
			this.#component.toggler.type = "button";
			this.#component.toggler.dataset.bsToggle = "collapse";
			this.#component.toggler.dataset.bsTarget = '#' + this.#targetId;
			this.#component.toggler.innerText = this.#resources.caption.show;
			this.#component.accordionCollapse.className = "accordion-collapse collapse";
			this.#component.accordionCollapse.id = this.#targetId;
			if (this.#resources.style) this.#component.allContent.style = this.#resources.style;
			this.#component.allContent.className = "accordion-body";
			this.#component.style.setAttribute("scoped", "");

			// 将样式和 DOM 元素挂载到页面
			this.#component.accordionHeader.appendChild(this.#component.toggler);
			this.#component.accordionCollapse.appendChild(this.#component.allContent);
			this.#component.accordionItem.appendChild(this.#component.accordionHeader);
			this.#component.accordionItem.appendChild(this.#component.accordionCollapse);
			this.#component.wrapper.appendChild(this.#component.accordionItem);
		} else if (this.cardLike) {
			// 创建我们需要的标签
			this.#component = {
				wrapper: document.createElement("div"),
				cardBody: document.createElement("div"),
				toggler: document.createElement("h5"),
				icon: document.createElement("i"),
				caption: document.createTextNode(""),
				allContent: document.createElement("div"),
				style: document.createElement("style"),
			};

			// 为标签添加样式
			this.#component.wrapper.className = "card mb-3";
			this.#component.cardBody.className = "card-body";
			this.#component.cardBody.style.padding = "0";
			this.#component.toggler.className = "card-title";
			this.#component.toggler.style.border = "1rem solid transparent";
			this.#component.toggler.style.marginBottom = "0";
			this.#component.toggler.style.cursor = "pointer";
			this.#component.icon.className = this.#resources.arrow.down;
			this.#component.icon.style.marginRight = "0.5rem";
			this.#component.caption.textContent = this.#resources.caption.show;
			if (this.#resources.style) this.#component.allContent.style = this.#resources.style;
			this.#component.allContent.style.display = "none";
			this.#component.allContent.style.margin = "0 1rem 1rem 1rem";
			this.#component.style.setAttribute("scoped", "");

			// 将样式和 DOM 元素挂载到页面
			this.#component.toggler.appendChild(this.#component.icon);
			this.#component.toggler.appendChild(this.#component.caption);
			this.#component.cardBody.appendChild(this.#component.toggler);
			this.#component.cardBody.appendChild(this.#component.allContent);
			this.#component.wrapper.appendChild(this.#component.cardBody);
			this.#component.wrapper.appendChild(this.#component.style);

			// 点击事件
			this.#component.toggler.addEventListener("click", this.onClick.bind(this));
		} else {
			// 创建我们需要的标签
			this.#component = {
				wrapper: document.createElement("div"),
				listGroup: document.createElement("div"),
				toggler: document.createElement("button"),
				icon: document.createElement("i"),
				caption: document.createTextNode(""),
				allContent: document.createElement("div"),
				style: document.createElement("style"),
			};

			// 为标签添加样式
			this.#component.wrapper.className = "mb-3";
			this.#component.listGroup.className = "list-group";
			this.#component.toggler.className = "list-group-item list-group-item-action list-group-item-primary";
			this.#component.toggler.style.padding = "0.5rem";
			this.#component.icon.className = this.#resources.arrow.down;
			this.#component.icon.style.marginRight = "0.5rem";
			this.#component.caption.textContent = this.#resources.caption.show;
			this.#component.toggler.type = "button";
			if (this.#resources.style) this.#component.allContent.style = this.#resources.style;
			this.#component.allContent.style.display = "none";
			this.#component.allContent.style.paddingTop = "0.5rem";
			this.#component.style.setAttribute("scoped", "");

			// 将样式和 DOM 元素挂载到页面
			this.#component.toggler.appendChild(this.#component.icon);
			this.#component.toggler.appendChild(this.#component.caption);
			this.#component.listGroup.appendChild(this.#component.toggler);
			this.#component.wrapper.appendChild(this.#component.listGroup);
			this.#component.wrapper.appendChild(this.#component.allContent);
			this.#component.wrapper.appendChild(this.#component.style);

			// 点击事件
			this.#component.toggler.addEventListener("click", this.onClick.bind(this));
		}
		
		// 监听子节点事件
		this.observer = new MutationObserver(this.onMutation);
		this.observer.observe(this, { childList: true });
		this.appendChild(this.#component.wrapper);
	}
	disconnectedCallback() {
		this.observer.disconnect();
	}
	onMutation(mutations) {
		const added = [];
		for (const mutation of mutations) added.push(...mutation.addedNodes);
		added.filter(el => (el.nodeType === Node.ELEMENT_NODE || el.nodeType === Node.TEXT_NODE) && el !== this.#component.wrapper).forEach(el => this.#component.allContent.appendChild(el));
	}
	static TAG_NAME = "content-info";
	#isShowDetails = false;
	onClick() {
		const show = this.#isShowDetails = !this.#isShowDetails;
		this.#component.caption.textContent = this.#resources.caption[show ? "hide" : "show"];
		// this.#component.icon.className = this.#resources.arrow[show ? "up" : "down"];
		this.#component.toggler.classList[show ? "add" : "remove"]("active");
		$(this.#component.allContent)["slide" + (show ? "Down" : "Up")]();
		this.#component.style.innerText = `${this.#resources.arrow.down.trim().replace(/^|\s+/g, '.')}::before { transform: rotate(${show ? -180 : 0}deg); transition: all 500ms ease-out; }`;
	}
}

customElements.define(ContentInfoElement.TAG_NAME, ContentInfoElement);
