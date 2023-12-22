import math
import re
# from pathlib import Path
# import random
# import yaml

import gradio as gr

import modules.scripts as scripts
from modules.scripts import AlwaysVisible
# from modules import shared
# from scripts.setup import write_filename_list
from modules.processing import StableDiffusionProcessingTxt2Img

RATE = 1.05


def convert_bracket(src_prompt):

    temp_prompt = src_prompt.replace("\n", "")

    def replace_function(match):
        text, weight_str = match.group()[1:-1].rsplit(":", 1)

        weight = float(weight_str)
        # n = round(math.log(weight) / math.log(RATE))
        n = round(math.log(weight, RATE))
        count = abs(n)

        if weight < 1:
            open_bra, close_bra = "[", "]"
        else:
            open_bra, close_bra = "{", "}"

        return open_bra * count + text + close_bra * count

    # Replace all occurrences using the regular expression
    converted_prompt = re.sub(r'\([^)]+:[0-9.]+\)', replace_function, temp_prompt)
    return converted_prompt


# ///////////////////////////////////////
# ///////////////////////////////////////
class NAIPromptConvert(scripts.Script):

    def __init__(self):
        super().__init__()

    def title(self):
        return "NAI Prompt Convert"

    def show(self, is_img2img):
        return AlwaysVisible

    def ui(self, is_img2img):
        if (is_img2img):
            return None

        enable_chheckbox = gr.Checkbox(value=False, label='Convert to NAI prompt',elem_id='d2_npc_enable')
        return [enable_chheckbox]


    def convert_to_nai_prompt(self, p:StableDiffusionProcessingTxt2Img):
        for i in range(len(p.all_prompts)):
          p.all_prompts[i] = convert_bracket(p.all_prompts[i])

        for i in range(len(p.all_negative_prompts)):
          p.all_negative_prompts[i] = convert_bracket(p.all_negative_prompts[i])


    def process(self, p, is_enable, *args):
        if(is_enable):
          self.convert_to_nai_prompt(p)
