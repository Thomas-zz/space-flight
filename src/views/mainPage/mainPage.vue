<template>
  <Aside />
  <main id="mainPage" class="h-screen overflow-y-scroll" @wheel.prevent="throttleHandleScroll">
    <Home />
    <StarsPage ref="starsPage" />
    <Human />
    <JourneyPage />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useStore from '@/store/index'
import Home from '@/views/home/Home.vue'
import Human from '@/views/human/human.vue'
import JourneyPage from '@/views/journeyPage/journeyPage.vue'
import StarsPage from '@/views/starsPage/starsPage.vue'
import Aside from '@/components/aside.vue'
import throttle from '@/effect/commonEffect'

// 鼠标滚轮改变地址栏，切换页面
function handleScrollEvent() {
  const pageInfo = useStore().pageInfo
  const hrefArr: string[] = []
  for (const item of pageInfo) {
    hrefArr.push(item.href)
  }
  const starsPage = ref(null)
  // 标志“星辰”页面是否是第一次被切换到
  let firstInto = true

  // starsPage的入场动画
  function starsAnimate() {
    if (firstInto) {
      ;(starsPage as any).value.pageIn()
      firstInto = false
    }
  }

  // 鼠标滚轮事件，修改url地址实现滚动
  function handleScroll(e: WheelEvent) {
    const hash = window.location.hash
    let index: number
    let url: string
    if (!hash) {
      index = 0
      url = window.location.href
    } else {
      index = hrefArr.indexOf(hash)
      url = window.location.href.split(hash)[0]
    }

    if (e.deltaY > 0) {
      if (index + 1 < hrefArr.length) {
        window.location.href = url + hrefArr[index + 1]
        starsAnimate()
      }
    } else if (e.deltaY < 0) {
      if (index - 1 >= 0) {
        window.location.href = url + hrefArr[index - 1]
        starsAnimate()
      }
    }
  }

  // 为函数添加节流
  const throttleHandleScroll = throttle(handleScroll, 500)
  return { throttleHandleScroll, starsPage }
}

export default defineComponent({
  components: { Home, Human, JourneyPage, StarsPage, Aside },
  // function changePage() {
  //   let dom = document.querySelector('#human')
  //   console.log(dom)
  // }
  setup() {
    const { throttleHandleScroll, starsPage } = handleScrollEvent()
    return { throttleHandleScroll, starsPage }
  },
})
</script>

<style lang="scss">
main {
  scroll-behavior: smooth;
}
main::-webkit-scrollbar {
  display: none;
}
</style>
