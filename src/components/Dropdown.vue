<template functional>
  <v-menu dark offset-y tile bottom content-class="drop-down">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        text
        class="button--text"
        color="white"
        width="100%"
      >
        <span class="font-weight-thin">Ver: </span>{{ props.value.title }}
        <span class="ml-auto">
          <img
            width="12"
            height="12"
            :src="require('@/assets/chevron-down-icon.svg')"
          />
        </span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in props.items"
        :key="index"
        @click="$options.selectItem(item, listeners)"
        :input-value="props.value === item"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import Vue from "vue";
import {
  VBtn,
  VList,
  VListItem,
  VListItemTitle,
  VMenu,
} from "vuetify/lib/components";

Vue.component("v-menu", VMenu);
Vue.component("v-btn", VBtn);
Vue.component("v-list", VList);
Vue.component("v-list-item", VListItem);
Vue.component("v-list-item-title", VListItemTitle);

export default {
  name: "DropDown",
  props: {
    value: {
      default: () => [{ title: "" }],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  selectItem(item, { input }) {
    input(item);
  },
};
</script>

<style lang="scss">
.drop-down {
  margin-top: 12px;
  contain: initial;
  overflow: visible;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 13px;
    transform: translateY(-100%);
    width: 9px;
    height: 9px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid $featured-button-bg-color;
  }

  .v-list-item {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 4px;
  }

  h3 {
    color: white;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 4px;
    position: absolute;
    bottom: 14px;
  }

  .theme--dark.v-list {
    background: $featured-button-bg-color;
  }
}
</style>
