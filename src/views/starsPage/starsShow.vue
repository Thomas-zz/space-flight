<!--stars页面右边的信息展示-->
<template>
  <div>
    <div class="wrapper" :class="{ show: WrapperRightIn == true }">
      <div class="up-wrapper">
        <div class="wrapper-name">
          <div
            ref="Wrappercontent"
            class="wrapper-content"
            :class="{ show: ContentRightIn == true }"
          >
            {{ wrapperName }}
          </div>
        </div>
        <div class="wrapper-intro">
          <div
            ref="Wrappercontent"
            class="wrapper-content"
            :class="{ show: ContentRightIn == true }"
          >
            {{ wrapperIntro }}
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="under-wrapper">
        <div class="wrapper-story">
          <div
            ref="Wrappercontent"
            class="wrapper-content"
            :class="{ show: ContentRightIn == true }"
          >
            {{ wrapperStory }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getStarsMessage } from '@/api/starsMessage'

type messageType = { name: string; intro: string; story: string }

const getData = () => {
  return new Promise((resolve) => {
    resolve(getStarsMessage())
  })
}

export default defineComponent({
  setup() {
    let wrapperName = ref('数据未找到')
    let wrapperIntro = ref('数据未找到')
    let wrapperStory = ref('数据未找到')
    const WrapperRightIn = ref(false)
    const ContentRightIn = ref(false)
    // const message: messageType[] = [
    //   {
    //     name: '北斗',
    //     intro: '导航定位卫星',
    //     story:
    //       '无论你在哪里，荒漠或深海，白天或黑夜，我都能找到你。如果找不到，那你只能是在我心里。',
    //   },
    //   {
    //     name: '嫦娥',
    //     intro: '月球探测器',
    //     story:
    //       '那暗淡无光却追随一生的星球，是银河万顷之中最温柔的谜底。嫦娥揽月，四十万千米，只为多了解你多一点，再多一点。',
    //   },
    //   {
    //     name: '墨子',
    //     intro: '墨子科学实验卫星',
    //     story: '量子为信使，我想对你说的，只有你能听到，你的悄悄话，也只有我能知道。',
    //   },
    //   {
    //     name: '神舟',
    //     intro: '载人、航空实验飞船',
    //     story: '神舟摆渡，从此，璀璨你的星河有了炎黄子孙的声影，等待千年的飞天夙愿终迎来梦圆时刻。',
    //   },
    //   {
    //     name: '天宫',
    //     intro: '中国空间站',
    //     story:
    //       '天地不再遥远，紫微宫不再是神话，浩渺的太空，黄帝之胄有了的立足之地，无限的奥秘等待着我们去探索。',
    //   },
    //   {
    //     name: '天问',
    //     intro: '火星探测器',
    //     story: '银河万顷，地球只不过是一个暗淡蓝点，四亿公里的距离，是我们探索宇宙的起点。',
    //   },
    // ]
    let message: messageType[]

    getData().then((res: any) => {
      message = reactive(res.data.data)
    })

    function setValue(index: number) {
      wrapperName.value = message[index].name
      wrapperIntro.value = message[index].intro
      wrapperStory.value = message[index].story
    }

    function enterAnimation() {
      if (WrapperRightIn.value) {
        ContentRightIn.value = false
        setTimeout(function () {
          WrapperRightIn.value = false
        }, 700)
        // ContentRightIn.value = false
      } else {
        WrapperRightIn.value = true
        setTimeout(function () {
          ContentRightIn.value = true
        }, 900)
        // ContentRightIn.value = true
      }
    }

    onMounted(() => {
      // setValue(0)
    })

    return {
      setValue,
      enterAnimation,
      WrapperRightIn,
      ContentRightIn,
      wrapperName,
      wrapperIntro,
      wrapperStory,
    }
  },
})
</script>
<style lang="scss" scoped>
@keyframes show {
  0% {
    width: 100%;
    height: 0;
  }
  100% {
    width: 100%;
    height: 5rem;
  }
}
.show {
  width: 30rem !important;
}
.wrapper {
  position: absolute;
  top: 38%;
  right: 18rem;
  width: 0;
  font-family: SerifHeavy, Helvetica, sans-serif;
  transition: width 0.8s;
  color: rgb(254, 254, 254);
  .up-wrapper {
    position: relative;
    .wrapper-name {
      overflow: hidden;
      font-size: 4rem;
      line-height: 5rem;
      .wrapper-content {
        white-space: nowrap;
        transform: translate3d(0, 100%, 0);
        transition: transform 0.8s cubic-bezier(0.21, 0.45, 0.07, 1);
      }
      .show {
        transform: translate3d(0, 0, 0);
      }
    }
    .wrapper-intro {
      overflow: hidden;
      font-size: 2rem;
      line-height: 2.6rem;
      .wrapper-content {
        white-space: nowrap;
        transform: translate3d(0, 100%, 0);
        transition: transform 0.8s cubic-bezier(0.21, 0.45, 0.07, 1);
      }
      .show {
        transform: translate3d(0, 0, 0);
      }
    }
  }
  .under-wrapper {
    position: relative;
    .wrapper-story {
      overflow: hidden;
      font-size: 1.4rem;
      line-height: 2rem;
      .wrapper-content {
        transform: translate3d(0, -100%, 0);
        transition: transform 0.8s cubic-bezier(0.21, 0.45, 0.07, 1);
      }
      .show {
        transform: translate3d(0, 0, 0);
      }
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to left, #909090 0%, #909090 25%, transparent 50%);
    background-size: 4px 1px;
    margin-bottom: 0.3rem;
  }
}
</style>
