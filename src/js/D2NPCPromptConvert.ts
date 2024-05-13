class D2NPCPromptConvert {
    static RATE = 1.05;

    static convertToNai(srcPrompt: string) {
        const tempPrompt = srcPrompt.replace(/\n/g, '');
        const convertedPrompt = tempPrompt.replace(/\([^)]+:\s*[0-9.]+\s*\)/g, D2NPCPromptConvert.$_convertToNai);
        return convertedPrompt;
    }

    static $_convertToNai(prompt: string) {
        const parts = prompt.substring(1, prompt.length - 1).split(':');
        const text = parts.slice(0, -1).join(':').trim();
        const weightStr = parts[parts.length - 1].trim();
        const weight = parseFloat(weightStr);
        const n = Math.round(Math.log(weight) / Math.log(D2NPCPromptConvert.RATE));
        const count = Math.abs(n);

        let openBra, closeBra;
        if (weight < 1) {
            openBra = '[';
            closeBra = ']';
        } else {
            openBra = '{';
            closeBra = '}';
        }

        return openBra.repeat(count) + text + closeBra.repeat(count);
    }

    static convertToSd(srcPrompt: string) {
        let tempPrompt = srcPrompt.replace(/\n/g, '');
        let convertedPrompt = tempPrompt.replace(/[\[{]+[^\]}]+[\]}]+/g, D2NPCPromptConvert.$_convertToSd);
        return convertedPrompt;
    }

    static $_convertToSd(prompt: string) {
        const braType = prompt.substring(0, 1);
        const braCount = (prompt.match(/[\[{]/g) || []).length;
        let weight = 0;

        if (braType === '{') {
            weight = 1 * Math.pow(D2NPCPromptConvert.RATE, braCount);
        } else {
            weight = 1 * Math.pow(1 / D2NPCPromptConvert.RATE, braCount);
        }

        const weightAdjust = Math.floor(weight * 100) / 100;
        const text = prompt.replace(/[\[\]{}]+/g, '');
        return `(${text}:${weightAdjust})`;
    }
}

export { D2NPCPromptConvert };
