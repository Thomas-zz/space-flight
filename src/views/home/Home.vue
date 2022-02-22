<template>
  <section id="home" class="relative h-full overflow-hidden">
    <div class="banner"></div>
    <div class="overlay">
      <div class="corner-marker">
        <!-- <img class="logo" src="~assets/CNSA.png" /> -->
        <div class="text">
          <p class="cnsa">C N S A</p>
          <p>中国航天</p>
        </div>
      </div>
      <type-write />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TypeWrite from '@/components/TypeWrite/TypeWrite.vue'
export default defineComponent({
  components: {
    TypeWrite,
  },
})
</script>
<style scoped lang="scss">
.overlay {
  position: absolute;
  height: 45vh;
  top: 14%;
  left: 6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .corner-marker {
    .logo {
      display: inline-block;
      width: 2.5rem;
      padding-right: 1rem;
      padding-top: 0.2rem;
    }
    .text {
      display: inline-block;
      .cnsa {
        text-indent: 3px;
      }
    }
    font-family: Helvetica;
    font-size: 1.2rem;
    color: rgba(227, 227, 227);
  }
  .title {
    font-family: Helvetica;
    font-size: 4.2rem;
    font-weight: 700;
    direction: rtl;
    color: rgba(227, 227, 227);
  }
}
</style>
