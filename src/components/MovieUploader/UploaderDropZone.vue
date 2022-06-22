<template>
  <div
    ref="uploaderDropZone"
    class="uploader-drop-zone"
    @click="handleClick"
    @dragover.prevent.stop="handleDragOver"
    @drop.prevent.stop="addFile"
    @dragleave.prevent.stop="handleDragEnd"
  >
    <slot>
      <!--
				Don't put anything here.
				This will hold the content.
				-->
    </slot>

    <input
      ref="uploaderDropZoneInput"
      style="display: none; visibility: hidden"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="addFile"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    fileSizeLimit: {
      type: Number,
      default: 10000000,
    },
    accept: {
      type: Array,
      default: () => {
        return [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/tiff",
        ];
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  name: "uploader-drop-zone",
  methods: {
    /**
     * Opens the input file dialog.
     * @param event
     */
    // eslint-disable-next-line no-unused-vars
    handleClick(event) {
      if (this.disabled) return;

      this.$refs.uploaderDropZoneInput.click();
      this.$refs.uploaderDropZoneInput.value = "";
    },
    /**
     * Add some classes while de drag is on progress.
     * @param event
     */
    handleDragOver(event) {
      if (this.disabled) return;

      let classes = ["is-dragover"];
      let { rejectedFiles } = this.filterAcceptedFileTypes({
        files: event.dataTransfer.items,
        mode: "protected",
      });

      if (rejectedFiles.length) {
        classes.push("with-rejected-files");
      }

      this.$refs.uploaderDropZone.classList.add(...classes);
    },

    /**
     * Just reset classes when drag ends.
     * @param event
     */
    // eslint-disable-next-line no-unused-vars
    handleDragEnd(event) {
      if (this.disabled) return;

      let classes = ["is-dragover", "with-rejected-files"];
      this.$refs.uploaderDropZone.classList.remove(...classes);
    },

    /**
     * Handles adding files through drag or input change.
     * @param event
     */
    addFile(event) {
      if (this.disabled) return;

      this.handleDragEnd(event);

      // [ED] Handles files from drag event or trough input change.
      let files = event?.dataTransfer?.files || event?.target?.files || [];

      // [ED] Early exit if there arent any files.
      if (!files) return;

      // [ED] Initialize counters and others.
      let loadedFiles = 0;
      let totalFiles = files.length;
      let loadedBytes = 0;
      let totalBytes = Array.from(files).reduce(
        (n, file) => (n += file?.size || 0),
        0
      );

      // [ED] We separate oil from water.
      let { allowedFiles, rejectedFiles } = this.filterAcceptedFileTypes({
        files,
      });

      // [ED] This will hold all the promises.
      let readers = [];

      // [ED] Read only allowed files. We dont care about rejected.

      allowedFiles.forEach((file) => {
        let reader = new FileReader();

        // [ED] Push the promise to the collection.
        readers.push(
          new Promise((resolve, reject) => {
            /**
             * [ED] Emit Progress to parent
             * @param readerEvent
             */
            reader.onprogress = (readerEvent) => {
              this.$emit("progress", {
                totalBytes,
                loadedBytes: loadedBytes + readerEvent.loaded,
                totalFiles,
                loadedFiles,
              });
            };

            /**
             * [ED] Resolve the promise and update counters.
             * @param readerEvent
             */
            reader.onload = (readerEvent) => {
              loadedBytes = readerEvent.total;
              loadedFiles++;

              // [ED] Once file reading is done resolve the promise.
              return resolve(readerEvent.result);
            };

            /**
             * [ED] Handle if something goes wrong.
             * @param error
             */
            reader.onerror = (error) => reject(error);

            // [ED] Start reading.
            reader.readAsArrayBuffer(file);
          })
        );
      });

      Promise.all(readers)
        // [ED] Emit collections once done.
        .then(() => {
          this.$emit("input", { allowedFiles, rejectedFiles });
        })
        // [ED] Or Emit an error.
        .catch((error) => {
          console.error("Error reading files.", error);
          this.$emit("error", error);
        });
    },

    /**
     * This allows us to return two collections with allowed and rejected files based on the file type.
     * @param files
     * @returns {{rejectedFiles: [], allowedFiles: []}}
     */
    filterAcceptedFileTypes({ files = [], mode = "read" } = {}) {
      let allowedFiles = [];
      let rejectedFiles = [];

      Array.from(files).forEach((file) => {
        let fileType = file.type;
        fileType = fileType.replace("+", "\\+");
        const regularExpression = new RegExp(fileType);
        const acceptType = this.accept.join(",");
        const fileIsAllowed = acceptType.match(regularExpression);

        // [ED] Handles protected mode and bypass file size checks until drop ends. See: https://html.spec.whatwg.org/multipage/dnd.html#the-drag-data-store
        const fileSize = mode === "protected" ? 1 : file.size;

        if (fileIsAllowed && fileSize < this.fileSizeLimit) {
          allowedFiles.push(file);
        } else {
          rejectedFiles.push(file);
        }
      });

      return { allowedFiles, rejectedFiles };
    },
  },
};
</script>
