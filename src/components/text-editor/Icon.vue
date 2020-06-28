<template>
  <svg
    class="icon-svg"
    :class="[`icon-${name}`, `icon-${size}`, { 'has-align-fix': fixAlign }]"
  >
    <use
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :xlink:href="'#icon-' + name"
    ></use>
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {},
    size: {
      default: "normal"
    },
    modifier: {
      default: null
    },
    fixAlign: {
      default: true
    }
  }
};
</script>

<style scoped>

.icon-svg.has-align-fix {
  top: -0.1rem;
}
.icon-svg {
  display: inline-block;
  vertical-align: top;
  width: 1rem;
  height: 1rem;
}

.icon-svg:first-child {
  margin-left: 0;
}

.icon-svg:last-child {
  margin-right: 0;
}

body > svg,
.icon svg use,
symbol {
  fill: var(--h-tag-colour);
  stroke: none;
  border-radius: var(--borderradius);
  border-style: var(--borderstyle);
  border-width: var(--borderwidth);
}

body > svg:hover,
.icon svg use:hover,
symbol:hover {
  fill: white;
}



path,
rect,
circle,
g {
  fill: var(--h-tag-colour);
  stroke: none;
}

/* *[d="M0 0h24v24H0z"] {
    display: none;
  } */
</style>
