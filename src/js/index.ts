declare var gradioApp: any;
declare var onUiLoaded: any;

import { D2NPCModal } from './D2NPCModal';

onUiLoaded(async () => {
    const enableCheckbox = gradioApp().getElementById('d2_npc_enable');

    const txt2imgActionColumn = gradioApp().getElementById('txt2img_actions_column');
    const container = document.createElement('div');
    container.classList.add('d2_npc_container');
    container.appendChild(enableCheckbox);

    txt2imgActionColumn.appendChild(container);

    // プロンプト変換モーダル
    const convertModal = new D2NPCModal();

    // プロンプト変換モーダル表示ボタン
    const showBtn = document.createElement('button');
    showBtn.classList.add('d2-npc-show-modal-btn');
    showBtn.textContent = 'Show NAI converter';
    showBtn.addEventListener('click', () => {
        convertModal.showModal();
    });
    document.querySelector('body')?.appendChild(showBtn);
});
