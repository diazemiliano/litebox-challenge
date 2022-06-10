<template>
  <v-app :style="{ ...appStyles }" class="app">
    <v-app-bar app flat color="transparent" height="72" class="app__header-bar">
      <div class="app__header-bar__logo d-flex align-start">
        Lite <span class="app__header-bar__logo--light">Flix</span>
      </div>
      <div class="d-flex align-start">
        <v-btn text class="app__header-bar__text-button" color="white">
          <v-img
            :src="require('@/assets/plus-icon.svg')"
            height="14"
            width="14"
          />
          <span>Agregar Película</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
      >
        <v-img :src="require('@/assets/app-menu-icon.svg')" />
      </v-btn>
      <v-btn
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
      >
        <v-img :src="require('@/assets/app-bell-icon.svg')" />
      </v-btn>
      <v-btn
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
      >
        <v-avatar size="36px">
          <img
            alt="Avatar"
            src="https://avatars.githubusercontent.com/u/64487650?v=4"
          />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    appStyles: {
      background: `url("/Bkg.jpg")`,
      backgroundSize: `cover`,
    },
  }),
};
</script>

<style lang="scss">
.app {
  &__header-bar {
    .v-btn {
      margin-left: 30px;
    }

    .v-toolbar__content {
      padding-top: 35px;
      padding-left: 180px;
      padding-right: 180px;
    }

    &__logo {
      letter-spacing: 4px;
      font-size: 34px;
      line-height: 34px;
      font-weight: 700;
      color: #64eebc;
      &--light {
        font-weight: 300;
        line-height: 31px;
      }
    }

    &__text-button {
      &.v-btn.v-size--default {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 4px;

        & .v-image {
          top: -1px;
        }

        & span {
          margin-left: 12px;
          position: relative;
        }
      }
    }
  }
}
</style>
