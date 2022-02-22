<template>
  <aside>
    <ul id="aside-ul">
      <li v-for="item in pageInfo" :key="item.name">
        <a class="block w-full h-full" :href="item.href">{{ item.name }}</a>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { mapState } from 'pinia'
import useStore from '@/store/index'

export default defineComponent({
  setup() {
    // const pageNo = reactive({ 起航: '#home', 星辰: '#stars', 牧星人: '#human', 征途: '#journey' })
    const pageInfo = useStore().pageInfo
    return { pageInfo }
  },
})
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
  z-index: 4;

  li {
    height: 6rem;
    width: 6rem;
    text-align: center;
    font-size: 1rem;
    font-family: Helvetica;
    line-height: 6rem;
    // border: 1px solid;
    color: rgb(227, 227, 227);
    position: relative;
    &:hover {
      cursor: pointer;
      color: rgb(34, 187, 255);
      &:after {
        content: '';
        position: absolute;
        width: 0.2rem;
        height: 1rem;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: rgb(34, 187, 255);
      }
    }
  }
}

.select {
  color: rgb(34, 187, 255);
  &:after {
    content: '';
    position: absolute;
    width: 0.2rem;
    height: 1rem;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgb(34, 187, 255);
  }
}
</style>
