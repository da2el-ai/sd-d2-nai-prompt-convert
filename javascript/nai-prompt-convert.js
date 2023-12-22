onUiLoaded(async () => {
  const enableCheckbox = gradioApp().getElementById("d2_npc_enable");

  const txt2imgActionColumn = gradioApp().getElementById(
    "txt2img_actions_column"
  );
  const container = document.createElement("div");
  container.classList.add("d2_npc_container");
  container.appendChild(enableCheckbox);

  txt2imgActionColumn.appendChild(container);
});
