<template>
  <Aside />
  <main
    id="mainPage"
    class="h-screen overflow-y-scroll"
    style="background: rgba(2, 2, 2, 1)"
    @wheel.prevent="throttleHandleScroll"
  >
    <img
      class="mainBgImg h-full"
      src="https://qcmkmk.file.qingfuwucdn.com/file/be1d034d2582101e_1645169699305.png"
    />
    <Home />
    <StarsPage ref="starsPage" />
    <Human />
    <JourneyPage />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import useStore from '@/store/index'
import Home from '@/views/home/Home.vue'
import Human from '@/views/human/human.vue'
import JourneyPage from '@/views/journeyPage/journeyPage.vue'
import StarsPage from '@/views/starsPage/starsPage.vue'
import Aside from '@/components/aside.vue'
import throttle from '@/effect/commonEffect'

type starsPageType = Ref<Element | null>

// 鼠标滚轮改变地址栏，切换页面
function handleScrollEvent(firstInto: Ref<boolean>, starsPage: starsPageType) {
  const pageInfo = useStore().pageInfo
  const hrefArr: string[] = []
  for (const item of pageInfo) {
    hrefArr.push(item.href)
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
      }
    } else if (e.deltaY < 0) {
      if (index - 1 >= 0) {
        window.location.href = url + hrefArr[index - 1]
      }
    }
  }

  // 为函数添加节流
  const throttleHandleScroll = throttle(handleScroll, 500)
  return { throttleHandleScroll }
}

// starsPage的入场动画
function starsAnimate(firstInto: Ref<boolean>, starsPage: starsPageType) {
  if (firstInto.value) {
    ;(starsPage as any).value.pageIn()
    firstInto.value = false
  }
}

export default defineComponent({
  components: { Home, Human, JourneyPage, StarsPage, Aside },
  // function changePage() {
  //   let dom = document.querySelector('#human')
  //   console.log(dom)
  // }

  setup() {
    // 标志“星辰”页面是否是第一次被切换到
    const firstInto = ref(true)
    const starsPage = ref(null)

    const hash = window.location.hash
    window.location.hash = ''

    window.addEventListener('hashchange', () => {
      if (firstInto.value && location.hash === '#stars') {
        starsAnimate(firstInto, starsPage)
      }
    })

    onMounted(() => {
      if (!!hash) {
        window.location.hash = hash
      }
    })
    const { throttleHandleScroll } = handleScrollEvent(firstInto, starsPage)
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

.mainBgImg {
  position: absolute;
  width: 120%;
  z-index: 0;
  opacity: 0.8;
}
</style>
