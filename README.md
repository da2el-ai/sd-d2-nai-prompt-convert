# D2 NAI Prompt Convert

プロンプトに入力した重み指定をNAI方式に変換します。



```
(kawaii:1.2)
👇
{{{{kawaii}}}}
```

## Note
- DynamicPrompts を併用するには A1111 webui 1.7.0 以上が必要です
- DynamicPrompts を使わないなら古いバージョンでも（たぶん）問題ないです

## Update

- 2024.05.19
  - `settings > D2 NAI Prompt Convert` に `NAIの{}をSDの数値に四捨五入して変換する` を追加
  - 上記をONにすると `{{{{smile}}}}` が `(smile:1.2)` になる
  - OFFだと `(smile:1.21)` になる


## Installation

1. "Extensions" タブを開く
2. "Install from URL" を開く
3. `https://github.com/da2el-ai/sd-d2-nai-prompt-convert` を "URL of the extension repository" に入力
4. "Install" をクリックしてインストールが完了するのを待つ
5. "Installed" を開き、"Apply and restart the UI" をクリック

## Usage

### プロンプト自動変換

生成ボタンの下に "Convert to NAI prompt" というチェックボックスがあるので、チェックした状態で生成してください。

<img src="img/usage.png">

### 手動変換ダイアログ

画面右上の `Show NAI converter` をクリックするとダイアログが表示します。

<img src="img/dialog_btn.png">
<img src="img/dialog.png">

- SD to NAI
  - SD用のプロンプトをNovelAI用に変換
- Send SD to Clipboard
  - SD用のプロンプトをクリップボードにコピー
- NAI to SD
  - NovelAI用のプロンプトをSD用に変換
- Send NAI to Clipboard
  - NovelAI用のプロンプトをクリップボードにコピー
