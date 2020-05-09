FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageResize
);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 100,
});

FilePond.parse(document.body);
