<template>
  <section id="stars" class="stars-page relative h-full">
    <div class="left-list">
      <div ref="LeftArrow" class="left-arrow" @click="toLeft()"></div>
      <ul class="starsli">
        <li
          v-for="(item, index) in starsList"
          :ref="(el) => (starsLi[index] = el)"
          v-bind:key="item"
          @click="clickLi(index)"
        >
          <p>{{ item }}</p>
        </li>
      </ul>
      <!-- <img :src="imgurl" class="starsImg" ref="starsImg" /> -->
    </div>
    <stars-show-vue class="right-list" ref="StarsShow"></stars-show-vue>
    <div ref="earth" class="earth-video bg-red-400 h-1/4 top-1/3"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ReactiveEffect, Ref, ref } from 'vue'
import starsShowVue from './starsShow.vue'

type LeftArrowType = Ref<Element | any>
type StarsShowType = Ref<Element | any>
type StarsLiType = Ref<HTMLLIElement[] | any[]>
type EarthType = Ref<Element | any>

function clickLiFn(
  starsList: string[],
  StarsShow: StarsShowType,
  starsLi: StarsLiType,
  LeftArrow: LeftArrowType,
  earth: EarthType
) {
  return (index: number) => {
    console.log(StarsShow.value)

    let ifUrl = ref(true)
    // this.mouseEnter(this.current)
    // 不清除图片url
    ifUrl.value = false
    // 退场动画
    for (let i = 0; i < starsList.length; i++) {
      setTimeout(() => {
        starsLi.value[i].style.transform = 'translateX(-120%)'
      }, 100 * i)
    }
    setTimeout(() => {
      earthMove(true, earth)
      // 箭头淡入
      LeftArrow.value.style.opacity = 1
    }, 400)
    // 设置starsShow的值
    StarsShow.value.setValue(index)
    setTimeout(function () {
      StarsShow.value.enterAnimation()
    }, 1200)
  }
}

function toLeftFn(
  starsList: string[],
  LeftArrow: LeftArrowType,
  StarsShow: StarsShowType,
  starsLi: StarsLiType,
  earth: EarthType
) {
  return () => {
    // 箭头淡出
    LeftArrow.value.style.opacity = 0
    StarsShow.value.enterAnimation()
    setTimeout(() => {
      earthMove(false, earth)
    }, 800)
    for (let i = 0; i < starsList.length; i++) {
      setTimeout(() => {
        starsLi.value[i].style.transform = 'translateX(0)'
      }, 1100 + 100 * i)
    }
  }
}

function earthMove(val: boolean, earth: EarthType) {
  if (val) {
    earth.value.style.right = 40 + '%'
  } else {
    earth.value.style.right = 0
  }
}
export default defineComponent({
  components: { starsShowVue },
  setup(props, content) {
    const starsList = reactive([
      '北斗 BEIDOU',
      "嫦娥 CHANG'E",
      '墨子 MICIUS',
      '神舟 SHENZHOU',
      '天宫 TIANGONG',
      '天问 TIANWEN',
    ])
    const starsLi: StarsLiType = ref([])
    const StarsShow: StarsShowType = ref(null)
    const LeftArrow: LeftArrowType = ref(null)
    const earth: EarthType = ref(null)

    function pageIn() {
      for (let i = 0; i < starsList.length; i++) {
        setTimeout(() => {
          starsLi.value[i].style.transform = 'translateX(0)'
        }, 200 * i)
      }
    }
    const clickLi = clickLiFn(starsList, StarsShow, starsLi, LeftArrow, earth)
    const toLeft = toLeftFn(starsList, LeftArrow, StarsShow, starsLi, earth)
    return { starsList, starsLi, LeftArrow, StarsShow, earth, pageIn, clickLi, toLeft }
  },
})
</script>
<style lang="scss" scoped>
.stars-page {
  position: relative;
  background: rgba(2, 2, 2, 1);
  overflow: hidden;
  // background: url('~assets/星空.png');
  .left-list {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    z-index: 2;
    .left-arrow {
      width: 2rem;
      height: 2rem;
      border-top: 5px solid rgb(154, 154, 154);
      border-left: 5px solid rgb(154, 154, 154);
      border-radius: 2px;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 15%;
      opacity: 0;
      transform: translateY(-50%) rotate(-45deg);
      transition: 2s ease;
      z-index: 2;
    }
    .starsli {
      width: 35rem;
      li {
        height: 6.5rem;
        // width: 40vw;
        position: relative;
        text-align: right;
        line-height: 6.5rem;
        font-size: 1.9rem;
        color: rgb(154, 154, 154);
        // border: 1px solid black;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        z-index: 2;
        // 页面进入时li从左边出来
        transition: 0.8s ease;
        transform: translateX(-120%);
        p {
          transition: 0.8s ease;
        }
        &:hover {
          cursor: pointer;
          p {
            color: rgb(254, 254, 254);
            transform: translate(3rem);
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -5%;
          height: 1px;
          // width: 45vw;
          width: 43rem;
          // background: linear-gradient(to left, rgba(15, 15, 15, 1), rgba(38, 38, 38, 0.3));
          background: linear-gradient(to right, #464646 0%, #464646 60%, rgba(70, 70, 70, 0) 100%);
        }
      }
    }
    .starsImg {
      position: absolute;
      width: 23rem;
      opacity: 0.5;
      transition: 0.1s linear;
    }
  }
  .right-list {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    z-index: 2;
  }
  #moon {
    position: absolute;
    left: 2rem;
    top: 2rem;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-size: 210px;
    box-shadow: inset 15px 0 30px 6px rgb(0, 0, 0), inset -3px 0 6px 2px rgba(255, 255, 255, 0.2);
    z-index: 1;
  }
  .bgImg {
    position: absolute;
    width: 120%;
    top: -2rem;
    left: -20px;
    z-index: 1;
    opacity: 0.2;
    // transition: 0.5s linear;
  }
  .bgImg2 {
    position: absolute;
    width: 120%;
    top: -2rem;
    left: -20px;
    z-index: 0;
    opacity: 0.6;
    transform: rotate(180deg);
    // transition: 0.5s linear;
  }
  .earth-video {
    z-index: 0;
    width: 65%;
    position: absolute;
    right: 2%;
    transition: 0.8s ease;
  }
}
</style>
