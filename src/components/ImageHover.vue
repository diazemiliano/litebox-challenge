<template functional>
  <img
    v-bind="data.attrs"
    ref="image"
    width="24"
    height="24"
    :src="props.src"
    class="d-inline-flex"
    @mouseenter="$options.handleMouseEnter($event, props)"
    @mouseleave="$options.handleMouseLeave($event, props)"
  />
</template>
<script>
export default {
  name: "image-hover",
  functional: true,
  props: {
    src: {
      required: true,
    },
    srcHover: {
      required: true,
    },
  },

  handleMouseEnter($e, props) {
    $e.target.src = props.srcHover || $e.target.src;
  },
  handleMouseLeave($e, props) {
    $e.target.src = props.src;
  },
};
</script>
<style scoped lang="scss">
h3 {
  color: white;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 4px;
}
</style>
