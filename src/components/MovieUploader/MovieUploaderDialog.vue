<template>
  <v-dialog
    v-model="show"
    persistent
    dark
    transition="dialog-bottom-transition"
    max-width="730"
    content-class="movie-uploader-dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
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

      <v-card-text class="ma-0 px-5 pt-0">
        <template v-if="status < $options.statusEnum.uploading">
          <h2 class="movie-uploader-dialog__title text-center mb-10">
            Agregar Película
          </h2>
          <uploader-drop-zone
            @input="handleDropZoneInput"
            class="pa-10 text-center"
          >
            <template v-if="status === $options.statusEnum.empty">
              <img
                width="16px"
                :src="require('@/assets/paper-clip-icon.svg')"
              />
              <span class="ml-2 font-weight-regular">
                Agregá un archivo
                <span class="font-weight-thin">
                  o arrastralo y soltalo aquí</span
                >
              </span>
            </template>
            <template v-else-if="status === $options.statusEnum.selected">
              <span class="ml-2 font-weight-regular">
                {{ movie.file.name }}
                <span class="font-weight-thin"> listo para Subir</span>
              </span>
            </template>
          </uploader-drop-zone>
        </template>
        <template
          v-if="
            [$options.statusEnum.uploading, $options.statusEnum.error].includes(
              status
            )
          "
        >
          <template v-if="status === $options.statusEnum.uploading">
            <p class="mt-16">
              Cargando: <span class="font-weight-thin">{{ progress }}</span>
            </p>
          </template>
          <template v-if="status === $options.statusEnum.error">
            <p class="mt-16">
              ¡ERROR!
              <span class="font-weight-thin">
                NO SE PUDO CARGAR LA PELÍCULA
              </span>
            </p>
          </template>

          <v-progress-linear
            :value="progress"
            height="10"
            :color="status < $options.statusEnum.error ? '#64EEBC' : '#FF0000'"
            background-color="#929292"
            class="mb-2"
          />

          <p
            class="movie-uploader-dialog__action text-right mb-5"
            @click="handleActionTextClick"
          >
            {{ uploadActionText }}
          </p>
        </template>
        <template v-else-if="status === $options.statusEnum.success">
          <div class="header-bar__logo text-center mb-16">
            Lite
            <span class="header-bar__logo--light font-weight-thin">Flix</span>
          </div>

          <h2 class="mb-7 text-center">¡Felicitaciones!</h2>
          <p class="mb-16 text-center">
            Liteflix The Movie fue correctamente subida.
          </p>
        </template>
      </v-card-text>

      <template v-if="status !== $options.statusEnum.success">
        <v-text-field
          v-model="movie.title"
          :disabled="status > $options.statusEnum.selected"
          hide-details
          placeholder="Título"
          class="movie-uploader-dialog__title mx-5 mb-8 flex-grow-0"
        />
      </template>
      <v-card-actions class="justify-center justify-end flex-grow-0">
        <v-btn
          tile
          text
          :block="$vuetify.breakpoint.xsOnly"
          :disabled="
            !isValid ||
            (status >= $options.statusEnum.uploading &&
              status !== $options.statusEnum.success)
          "
          height="56"
          width="248"
          @click="handleUploadMovieClick"
          class="movie-uploader-dialog__button mb-4"
        >
          <template v-if="status !== $options.statusEnum.success">
            <span>Subir Película</span>
          </template>
          <template v-if="status === $options.statusEnum.success">
            <span>Ir al Home</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MovieUploaderEventNames } from "@/components/MovieUploader/MovieUploaderDialogEnums";
import UploaderDropZone from "@/components/MovieUploader/UploaderDropZone";
import { mapActions } from "vuex";
import {
  CALL_POST_FAVOURITES,
  FAVOURITE_CONTENT_STORE,
} from "@/components/FavouriteContent/FavouriteContentStore";

const statusEnum = Object.freeze({
  empty: 0,
  selected: 1,
  uploading: 2,
  success: 3,
  error: 4,
});

export default {
  name: "MovieUploaderDialog",
  components: { UploaderDropZone },
  data() {
    return {
      show: false,
      status: statusEnum.empty,
      progress: 0,
      movie: {
        title: "",
        file: null,
      },
      cancelToken: () => console.warn("cancelToken not set."),
    };
  },
  statusEnum,
  computed: {
    isValid() {
      return this.movie.title && !!this.movie.file;
    },
    uploadActionText() {
      if (this.status === statusEnum.uploading) {
        if (this.progress === 100) {
          return "Listo!";
        } else {
          return "Cancelar";
        }
      }

      if (this.status === statusEnum.error) {
        return "Reintentar";
      }
      return "";
    },
  },
  methods: {
    ...mapActions(FAVOURITE_CONTENT_STORE, {
      callPostFavourites: CALL_POST_FAVOURITES,
    }),
    openDialogHandler() {
      this.show = true;
    },
    closeDialogHandler() {
      if (typeof this.cancelToken === "function") {
        this.cancelToken();
      }
      this.show = false;
      setTimeout(() => this.resetState(), 300);
    },
    resetState() {
      this.status = statusEnum.empty;
      this.progress = 0;
      this.movie = {
        title: "",
        file: null,
      };
    },
    handleUploadMovieClick() {
      if (this.status === this.$options.statusEnum.success) {
        this.closeDialogHandler();
        return;
      }

      if (this.isValid) {
        this.status = this.$options.statusEnum.uploading;
        this.callPostFavourites({
          favourite: this.movie,
          progressCb: this.handleUploadProgress,
          cancelCb: this.handleUploadCancel,
        }).catch((e) => {
          console.error(e);
          this.status = this.$options.statusEnum.error;
        });
      }
    },
    handleUploadProgress(progress) {
      this.progress = progress;
    },
    handleUploadCancel({ cancel } = {}) {
      this.cancelToken = cancel;
    },
    handleActionTextClick() {
      if (this.status === this.$options.statusEnum.uploading) {
        if (this.progress === 100) {
          this.status = this.$options.statusEnum.success;
        } else {
          this.cancelToken();
        }
      } else if (this.status === this.$options.statusEnum.error) {
        this.status = this.$options.statusEnum.uploading;
        this.handleUploadMovieClick();
      }
    },
    handleDropZoneInput({ allowedFiles }) {
      this.movie.file = allowedFiles[0];
      this.status = this.movie.file ? this.$options.statusEnum.selected : null;
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
    &__title {
      color: $font-primary-color;
    }
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 4px;
  }
  &__title {
    input {
      font-weight: 300;
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
      background-color: white;

      &.v-btn--disabled {
        color: $featured-button-bg-color !important;
        background-color: $featured-button-secondary-bg-color;
      }
    }
  }

  &__action {
    cursor: pointer;
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

  .v-progress-linear__background {
    height: 5px;
    top: 2.5px;
  }

  .v-card {
    .v-card__text {
      color: white !important;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 4px;
    }
  }
}
</style>
