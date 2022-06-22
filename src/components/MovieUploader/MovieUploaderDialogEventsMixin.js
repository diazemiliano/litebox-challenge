import { MovieUploaderEventNames } from "@/components/MovieUploader/MovieUploaderDialogEnums";

export default {
  methods: {
    emitOpenMovieUploaderDialog() {
      this.$root.$emit(
        MovieUploaderEventNames.OPEN_MOVIE_UPLOADER_DIALOG_EVENT
      );
    },
    emitCloseMovieUploaderDialog() {
      this.$root.$emit(
        MovieUploaderEventNames.CLOSE_MOVIE_UPLOADER_DIALOG_EVENT
      );
    },
  },
};
