<template>
  <v-container fluid class="nine-three-layout">
    <v-row class="fill-height">
      <v-col sm="12" md="12" lg="9" class="nine-three-layout__nine">
        <slot name="nine"></slot>
      </v-col>
      <v-col sm="12" md="12" lg="3" class="nine-three-layout__three">
        <slot name="three"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NineThree",
};
</script>

<style scoped lang="scss">
.app {
  .nine-three-layout {
    padding-left: 180px;
    padding-right: 180px;

    &__nine {
    }
    &__three {
    }
  }

  &.break-point-sm,
  &.break-point-xs {
    .nine-three-layout {
      padding-left: 40px;
      padding-right: 40px;

      &__nine {
      }
      &__three {
      }
    }
  }
}
</style>
