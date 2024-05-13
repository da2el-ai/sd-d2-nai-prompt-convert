import { D2NPCPromptConvert } from './D2NPCPromptConvert';

class D2NPCModalElementBuilder {
    static promptAreaElement(placeholder: string) {
        const textArea = document.createElement('textarea');
        textArea.classList.add('d2-npc-prompt-area');
        textArea.placeholder = placeholder;
        return textArea;
    }

    static buttonElement(text: string, onClick: () => void) {
        const btn = document.createElement('button');
        btn.classList.add('d2-npc-btn');
        btn.textContent = text;
        btn.addEventListener('click', () => {
            onClick();
        });
        return btn;
    }
}

///////////////////////////////
///////////////////////////////
///////////////////////////////

class D2NPCModal {
    modalContainer: HTMLDialogElement;
    sdPrompt: HTMLTextAreaElement;
    naiPrompt: HTMLTextAreaElement;

    constructor() {
        this.modalContainer = document.createElement('dialog');
        this.modalContainer.classList.add('d2-npc-modal');
        document.querySelector('body')?.appendChild(this.modalContainer);

        this.sdPrompt = D2NPCModalElementBuilder.promptAreaElement('SDプロンプトを入力');
        this.modalContainer.appendChild(this.sdPrompt);

        this.naiPrompt = D2NPCModalElementBuilder.promptAreaElement('NAIプロンプトを入力');
        this.modalContainer.appendChild(this.naiPrompt);

        // SD > NAI 変換ボタン
        const sdToNaiBtn = D2NPCModalElementBuilder.buttonElement('SD to NAI', () => {
            const prompt = this.sdPrompt.value;
            const newPrompt = D2NPCPromptConvert.convertToNai(prompt);
            this.naiPrompt.value = newPrompt;
        });
        this.modalContainer.appendChild(sdToNaiBtn);

        // NAI > SD 変換ボタン
        const naiToSdBtn = D2NPCModalElementBuilder.buttonElement('NAI to SD', () => {
            const prompt = this.naiPrompt.value;
            const newPrompt = D2NPCPromptConvert.convertToSd(prompt);
            this.sdPrompt.value = newPrompt;
        });
        this.modalContainer.appendChild(naiToSdBtn);

        // SDクリップボード
        const copySdBtn = D2NPCModalElementBuilder.buttonElement('Send SD to Clipboard', () => {
            this.sdPrompt.select();
            document.execCommand('copy');
        });
        this.modalContainer.appendChild(copySdBtn);

        // NAIクリップボード
        const copyNaiBtn = D2NPCModalElementBuilder.buttonElement('Send NAI to Clipboard', () => {
            this.naiPrompt.select();
            document.execCommand('copy');
        });
        this.modalContainer.appendChild(copyNaiBtn);

        // 閉じるボタン
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('d2-npc-close-btn');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', () => {
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

export { D2NPCModal };
