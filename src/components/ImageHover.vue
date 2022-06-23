<template functional>
  <img
    ref="image"
    :width="props.width || null"
    :height="props.height || null"
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
    width: {},
    height: {},
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
