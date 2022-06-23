<template>
  <v-container fluid class="twelve-layout">
    <v-row class="fill-height">
      <v-col cols="12" class="twelve-layout__twelve">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TwelveLayout",
};
</script>

<style scoped lang="scss">
.app {
  .twelve-layout {
    padding-left: 180px;
    padding-right: 180px;

    &__nine {
    }
    &__three {
    }
  }

  &.break-point-sm,
  &.break-point-xs {
    .twelve-layout {
      padding-left: 40px;
      padding-right: 40px;

      &__twelve {
      }
    }
  }
}
</style>
