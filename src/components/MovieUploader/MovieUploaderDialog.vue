<template>
  <v-dialog
    v-model="show"
    persistent
    dark
    transition="dialog-bottom-transition"
    max-width="730"
    content-class="movie-uploader-dialog"
  >
    <v-card>
      <v-card-title class="justify-end">
        <v-btn
          text
          color="white"
          width="27"
          height="27"
          min-width="27"
          max-width="27"
          @click="closeDialogHandler"
        >
          <img width="16px" :src="require('@/assets/x-icon.svg')" />
        </v-btn>
      </v-card-title>

      <h2 class="text-center">Agregar Película</h2>
      <uploader-drop-zone class="ma-5 pa-10 text-center">
        <img width="16px" :src="require('@/assets/paper-clip-icon.svg')" />
        <span class="ml-2 font-weight-regular">
          Agregá un archivo
          <span class="font-weight-thin"> o arrastralo y soltalo aquí</span>
        </span>
      </uploader-drop-zone>

      <v-text-field
        placeholder="Título"
        class="movie-uploader-dialog__title mx-5"
      />

      <v-card-actions class="justify-center">
        <v-btn
          tile
          text
          :block="$vuetify.breakpoint.xsOnly"
          height="56"
          width="248"
          @click="closeDialogHandler"
          class="movie-uploader-dialog__button mb-4"
        >
          <span>Subir Película</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MovieUploaderEventNames } from "@/components/MovieUploader/MovieUploaderDialogEnums";
import UploaderDropZone from "@/components/MovieUploader/UploaderDropZone";

export default {
  name: "MovieUploaderDialog",
  components: { UploaderDropZone },
  data: () => ({
    show: false,
  }),
  methods: {
    openDialogHandler() {
      this.show = true;
    },
    closeDialogHandler() {
      this.show = false;
    },
  },
  created() {
    this.$root.$on(
      MovieUploaderEventNames.OPEN_MOVIE_UPLOADER_DIALOG_EVENT,
      this.openDialogHandler
    );
    this.$root.$on(
      MovieUploaderEventNames.CLOSE_MOVIE_UPLOADER_DIALOG_EVENT,
      this.closeDialogHandler
    );
  },
  destroyed() {
    this.$root.$off(
      MovieUploaderEventNames.OPEN_MOVIE_UPLOADER_DIALOG_EVENT,
      this.openDialogHandler
    );
    this.$root.$off(
      MovieUploaderEventNames.CLOSE_MOVIE_UPLOADER_DIALOG_EVENT,
      this.closeDialogHandler
    );
  },
};
</script>

<style lang="scss">
.movie-uploader-dialog {
  h2 {
    color: $font-primary-color;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 4px;
  }
  &__title {
    input {
      font-weight: regular;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 4px;
      text-align: center;
    }

    &.v-text-field > .v-input__control > .v-input__slot {
      &:before,
      &:after {
        bottom: -1px;
        left: 33%;
        width: 33%;
      }
    }
  }

  &__button {
    &.v-btn {
      color: $featured-button-bg-color;
      background-color: $featured-button-secondary-bg-color;
    }
  }

  .uploader-drop-zone {
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 4px;

    border: 1px dashed white;

    &.is-dragover {
      border-color: green;

      &.with-rejected-files {
        border-color: red;
      }
    }
  }
}
</style>
