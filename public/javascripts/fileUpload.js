FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageResize
);

FilePond.setOptions({
  stylePanelAspectRat0io: 150 / 100,
  imageResizeTargetWidth: 100,
  imageResizeTargetHeight: 150
});

FilePond.parse(document.body);
