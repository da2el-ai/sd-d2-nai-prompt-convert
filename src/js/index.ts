declare var gradioApp: any;
declare var onUiLoaded: any;

import { D2NPCModal } from './D2NPCModal';


/**
 * txt2img, img2imgのアクションカラムにUIを追加する
 * @param mode 
 */
const setUi = (mode: 'txt2img' | 'img2img') => {
    const enableCheckbox = gradioApp().getElementById(`d2_npc_enable_${mode}`);


    const actionColumn = gradioApp().getElementById(`${mode}_actions_column`);
    console.log("actionColumn", actionColumn);
    const container = document.createElement('div');
    container.classList.add('d2_npc_container');
    container.appendChild(enableCheckbox);

    actionColumn.appendChild(container);
};


onUiLoaded(async () => {
    setUi('txt2img');
    setUi('img2img');

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
