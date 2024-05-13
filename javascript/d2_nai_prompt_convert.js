var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _D2NPCPromptConvert = class _D2NPCPromptConvert {
  static convertToNai(srcPrompt) {
    const tempPrompt = srcPrompt.replace(/\n/g, "");
    const convertedPrompt = tempPrompt.replace(/\([^)]+:\s*[0-9.]+\s*\)/g, _D2NPCPromptConvert.$_convertToNai);
    return convertedPrompt;
  }
  static $_convertToNai(prompt) {
    const parts = prompt.substring(1, prompt.length - 1).split(":");
    const text = parts.slice(0, -1).join(":").trim();
    const weightStr = parts[parts.length - 1].trim();
    const weight = parseFloat(weightStr);
    const n = Math.round(Math.log(weight) / Math.log(_D2NPCPromptConvert.RATE));
    const count = Math.abs(n);
    let openBra, closeBra;
    if (weight < 1) {
      openBra = "[";
      closeBra = "]";
    } else {
      openBra = "{";
      closeBra = "}";
    }
    return openBra.repeat(count) + text + closeBra.repeat(count);
  }
  static convertToSd(srcPrompt) {
    let tempPrompt = srcPrompt.replace(/\n/g, "");
    let convertedPrompt = tempPrompt.replace(/[\[{]+[^\]}]+[\]}]+/g, _D2NPCPromptConvert.$_convertToSd);
    return convertedPrompt;
  }
  static $_convertToSd(prompt) {
    const braType = prompt.substring(0, 1);
    const braCount = (prompt.match(/[\[{]/g) || []).length;
    let weight = 0;
    if (braType === "{") {
      weight = 1 * Math.pow(_D2NPCPromptConvert.RATE, braCount);
    } else {
      weight = 1 * Math.pow(1 / _D2NPCPromptConvert.RATE, braCount);
    }
    const weightAdjust = Math.floor(weight * 100) / 100;
    const text = prompt.replace(/[\[\]{}]+/g, "");
    return `(${text}:${weightAdjust})`;
  }
};
__publicField(_D2NPCPromptConvert, "RATE", 1.05);
let D2NPCPromptConvert = _D2NPCPromptConvert;
class D2NPCModalElementBuilder {
  static promptAreaElement(placeholder) {
    const textArea = document.createElement("textarea");
    textArea.classList.add("d2-npc-prompt-area");
    textArea.placeholder = placeholder;
    return textArea;
  }
  static buttonElement(text, onClick) {
    const btn = document.createElement("button");
    btn.classList.add("d2-npc-btn");
    btn.textContent = text;
    btn.addEventListener("click", () => {
      onClick();
    });
    return btn;
  }
}
class D2NPCModal {
  constructor() {
    __publicField(this, "modalContainer");
    __publicField(this, "sdPrompt");
    __publicField(this, "naiPrompt");
    var _a;
    this.modalContainer = document.createElement("dialog");
    this.modalContainer.classList.add("d2-npc-modal");
    (_a = document.querySelector("body")) == null ? void 0 : _a.appendChild(this.modalContainer);
    this.sdPrompt = D2NPCModalElementBuilder.promptAreaElement("SDプロンプトを入力");
    this.modalContainer.appendChild(this.sdPrompt);
    this.naiPrompt = D2NPCModalElementBuilder.promptAreaElement("NAIプロンプトを入力");
    this.modalContainer.appendChild(this.naiPrompt);
    const sdToNaiBtn = D2NPCModalElementBuilder.buttonElement("SD to NAI", () => {
      const prompt = this.sdPrompt.value;
      const newPrompt = D2NPCPromptConvert.convertToNai(prompt);
      this.naiPrompt.value = newPrompt;
    });
    this.modalContainer.appendChild(sdToNaiBtn);
    const naiToSdBtn = D2NPCModalElementBuilder.buttonElement("NAI to SD", () => {
      const prompt = this.naiPrompt.value;
      const newPrompt = D2NPCPromptConvert.convertToSd(prompt);
      this.sdPrompt.value = newPrompt;
    });
    this.modalContainer.appendChild(naiToSdBtn);
    const copySdBtn = D2NPCModalElementBuilder.buttonElement("Send SD to Clipboard", () => {
      this.sdPrompt.select();
      document.execCommand("copy");
    });
    this.modalContainer.appendChild(copySdBtn);
    const copyNaiBtn = D2NPCModalElementBuilder.buttonElement("Send NAI to Clipboard", () => {
      this.naiPrompt.select();
      document.execCommand("copy");
    });
    this.modalContainer.appendChild(copyNaiBtn);
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("d2-npc-close-btn");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => {
      this.modalContainer.close();
    });
    this.modalContainer.appendChild(closeBtn);
  }
  /**
   * モーダルの表示
   */
  showModal() {
    this.modalContainer.showModal();
  }
}
onUiLoaded(async () => {
  var _a;
  const enableCheckbox = gradioApp().getElementById("d2_npc_enable");
  const txt2imgActionColumn = gradioApp().getElementById("txt2img_actions_column");
  const container = document.createElement("div");
  container.classList.add("d2_npc_container");
  container.appendChild(enableCheckbox);
  txt2imgActionColumn.appendChild(container);
  const convertModal = new D2NPCModal();
  const showBtn = document.createElement("button");
  showBtn.classList.add("d2-npc-show-modal-btn");
  showBtn.textContent = "Show NAI converter";
  showBtn.addEventListener("click", () => {
    convertModal.showModal();
  });
  (_a = document.querySelector("body")) == null ? void 0 : _a.appendChild(showBtn);
});
//# sourceMappingURL=d2_nai_prompt_convert.js.map
