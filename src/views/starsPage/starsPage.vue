<template>
  <section id="stars" @mousemove="mouseMove()" class="stars-page relative h-full">
    <div class="left-list">
      <div ref="LeftArrow" class="left-arrow" @click="toLeft()"></div>
      <ul class="starsli">
        <li
          v-for="(item, index) in starsList"
          :ref="(el) => (starsLi[index] = el)"
          v-bind:key="item"
          @click="clickLi(index)"
          @mouseenter="mouseEnter(index)"
          @mouseleave="mouseLeave()"
        >
          <p>{{ item }}</p>
        </li>
      </ul>
      <div class="starsImg" ref="starsImg"></div>
      <!-- <img :src="imgUrl" class="starsImg" ref="starsImg" /> -->
    </div>
    <stars-show-vue class="right-list" ref="StarsShow"></stars-show-vue>
    <div id="moon"></div>
    <img src="../../assets/星空.png" class="bgImg" ref="bgImg1" />
    <!-- <img
      src="https://qcmkmk.file.qingfuwucdn.com/file/be1d034d2582101e_1645169699305.png"
      class="bgImg2"
      ref="bgImg2"
    /> -->
    <video
      ref="earth"
      class="earth-video"
      src="https://qcmkmk.file.qingfuwucdn.com/file/3bf9261692d52ad9_1645519552164.mp4"
      autoplay
      loop
      muted
    ></video>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ReactiveEffect, Ref, ref } from 'vue'
import starsShowVue from './starsShow.vue'

type LeftArrowType = Ref<Element | any>
type StarsShowType = Ref<Element | any>
type StarsLiType = Ref<HTMLLIElement[] | any[]>
type EarthType = Ref<Element | any>
type StarsImgType = Ref<Element | any>
type ImgListType = {
  imgurl: string
}[]

function bgImgShowFn(
  starsList: string[],
  StarsShow: StarsShowType,
  starsLi: StarsLiType,
  LeftArrow: LeftArrowType,
  earth: EarthType
) {
  // 设置鼠标离开li的时候要不要清除图片url
  const ifUrl = ref(true)
  const current = ref(0)
  const lock = ref(true)
  // const imgList: ImgListType = reactive([
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/c2b7843f71e897e5_1645284026751.png` },
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/107f8fe22bd4b68f_1645284031912.png` },
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/05ebfc8f5f2d987e_1645284035935.png` },
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/335f902554bee002_1645284040341.png` },
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/5e228f828329d615_1645284054726.png` },
  //   { imgurl: `https://qcmkmk.file.qingfuwucdn.com/file/9632d79836bbd68a_1645284061755.png` },
  // ])
  const imgList: ImgListType = [
    { imgurl: `../../src/assets/stars/北斗.png` },
    { imgurl: `../../src/assets/stars/嫦娥.png` },
    { imgurl: `../../src/assets/stars/墨子.png` },
    { imgurl: `../../src/assets/stars/神舟飞船.png` },
    { imgurl: `../../src/assets/stars/天宫.png` },
    { imgurl: `../../src/assets/stars/天问.png` },
  ]
  const imgUrl = ref('')
  const starsImg: StarsImgType = ref(null)

  function clickLi(index: number) {
    // console.log(StarsShow.value)

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
    console.log(new Date())
    setTimeout(function () {
      StarsShow.value.enterAnimation()
    }, 1200)
  }
  function mouseLeave() {
    if (ifUrl.value) {
      current.value = 0
      // imgUrl.value = ''
      starsImg.value.style.backgroundImage = ''
    }
  }
  function mouseEnter(index: number) {
    current.value = index
    lock.value = true
    // console.log('当前列：' + this.current)
    // imgUrl.value = imgList[index].imgurl
    starsImg.value.style.backgroundImage = `url(${imgList[index].imgurl})`
  }
  function mouseMove() {
    let timeout: any = ref(null)
    const mouseX = ref(0)
    const mouseY = ref(0)
    if (!lock.value) return null
    clearTimeout(timeout)
    const e: MouseEvent | undefined = window.event as MouseEvent
    const width = starsImg.value.clientWidth / 2
    const height = starsImg.value.clientHeight / 2
    const newMouseX = e.clientX
    const newMouseY = e.clientY

    starsImg.value.style.left = (e.clientX - width) / 16 + 'rem'
    starsImg.value.style.top = (e.clientY - height) / 26 + 'rem'

    // // 移动背景图
    // if (mouseX < this.mouseX) {
    //   bgImg1.style.left = bgImg1.getBoundingClientRect().left + 1 + 'px'
    //   bgImg2.style.left = bgImg2.getBoundingClientRect().left + 0.5 + 'px'
    // } else if (mouseX > this.mouseX) {
    //   bgImg1.style.left = bgImg1.getBoundingClientRect().left - 1 + 'px'
    //   bgImg2.style.left = bgImg2.getBoundingClientRect().left - 0.5 + 'px'
    // }

    // if (mouseY < this.mouseY) {
    //   bgImg1.style.top = bgImg1.getBoundingClientRect().top + 1 + 'px'
    //   bgImg2.style.top = bgImg2.getBoundingClientRect().top + 0.5 + 'px'
    // } else if (mouseY > this.mouseY) {
    //   bgImg1.style.top = bgImg1.getBoundingClientRect().top - 1 + 'px'
    //   bgImg2.style.top = bgImg2.getBoundingClientRect().top - 0.5 + 'px'
    // }

    // 重设mouseX和mouseY
    mouseX.value = newMouseX
    mouseY.value = newMouseY

    // 关锁
    lock.value = false
    // 50毫秒后打开
    timeout.value = setTimeout(function () {
      lock.value = true
    }, 50)
  }
  function toLeft() {
    ifUrl.value = true
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
  return { clickLi, mouseLeave, mouseMove, mouseEnter, toLeft, imgUrl, starsImg }
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

    const { clickLi, mouseLeave, mouseMove, mouseEnter, toLeft, imgUrl, starsImg } = bgImgShowFn(
      starsList,
      StarsShow,
      starsLi,
      LeftArrow,
      earth
    )
    return {
      starsList,
      starsLi,
      LeftArrow,
      StarsShow,
      earth,
      imgUrl,
      starsImg,
      pageIn,
      clickLi,
      toLeft,
      mouseEnter,
      mouseMove,
      mouseLeave,
    }
  },
})
</script>

<style lang="scss" scoped>
.stars-page {
  position: relative;
  // background: rgba(2, 2, 2, 1);
  overflow: hidden;
  // background: url('~assets/星空.png');
  .left-list {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    z-index: 3;
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
      width: 20rem;
      background-size: 20rem auto;
      background-repeat: no-repeat;
      height: 18rem;
      opacity: 0.5;
      transition: 0.1s linear;
      will-change: auto;
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
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 2%;
    transition: 0.8s ease;
  }
}
</style>
