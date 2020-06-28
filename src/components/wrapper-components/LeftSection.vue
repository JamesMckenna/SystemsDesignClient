<template>
  <section>
    <div class="left-child">
      <slot name="left-child"></slot>
    </div>
    <div class="right-child">
      <slot name="right-child"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "LeftSection"
};
</script>

<style scoped>
.left-child {
  padding-left: 0.1875rem;
  padding-right: 0.1875rem;
}

.left-bottom {
  margin-top: 5rem;
  text-align: center;
}

.right-child {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  section {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -656px- login links moved with js-------------------*/
@media (min-width: 41rem) {
  section {
    display: grid;
    grid-template-columns: 2fr;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  section {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
