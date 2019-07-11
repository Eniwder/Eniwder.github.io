<template>
  <div class="loading">
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../node_modules/bulma/bulma.sass';
div.loading div {
  position: relative;
  pointer-events: none;
  opacity: 1;
  &:after {
    @include loader;
    position: absolute;
    top: calc(50% - 2.5em) + 2em;
    left: calc(50% - 2.5em);
    width: 5em;
    height: 5em;
    border-width: 0.25em;
  }
}
</style>
