from modules import shared
from modules import script_callbacks

def on_ui_settings():
    section = "d2_nai_prompt_convert", "D2 NAI Prompt Convert"

    shared.opts.add_option(
        key = "d2_npc_enable_rounding",
        info = shared.OptionInfo(
            True,
            label = "NAIの{}をSDの数値に四捨五入して変換する",
            section = section
        ),
    )

# 設定画面登録
script_callbacks.on_ui_settings(on_ui_settings)
