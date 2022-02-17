<!--  -->
<template>
  <div class="text title">
    <div class="pa">
      <span
        v-for="(item, index) in usedcontent.slice(0, specialSpan)"
        :key="index"
        :style="{ animationDelay: delayTimes[index] + 'ms' }"
        >{{ item }}</span
      >
    </div>
    <div class="pa">
      <span
        v-for="(aitem, indey) in usedcontent.slice(specialSpan)"
        :key="indey"
        :style="{ animationDelay: delayTimes[indey + specialSpan] + 'ms' }"
        >{{ aitem }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const usedcontent: string[] = reactive([])
    const delayTimes: number[] = reactive([])
    const specialSpan = 8
    const delayTime = 300
    onMounted(() => {
      // 分割传过来的字符串
      usedcontent.push(...props.content.split(''))
      const len = usedcontent.length

      let startTime = 0
      for (let i = 0; i < len; i++) {
        // 当下标值等于预设值时，延长动画等待时长
        if (i === specialSpan || i === 2 || i === 12) {
          startTime = delayTime + 500 + startTime
        } else {
          startTime += delayTime - 100
        }
        delayTimes.push(startTime)
      }
    })

    return { usedcontent, delayTimes, specialSpan, delayTime }
  },
})
</script>
<style scoped>
.title {
  font-family: Helvetica;
  font-size: 4.2rem;
  font-weight: 600;
  color: rgba(227, 227, 227);
}
.text {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 33.6rem;
  height: 11.63rem;
}
/* .text::after{
    content: "|";
    display: inline-block;
    width: 44px;
} */
.pa {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .list::after{
    animation: 1s shiny steps(2,jump-none) infinite;
} */
/* @keyframes shiny {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
} */
.text span {
  display: inline-block;
  width: 0;
  overflow: hidden;
  animation: 300ms move ease forwards;
  text-align: center;
}
@keyframes move {
  0% {
    width: 0;
  }
  100% {
    width: 4.2rem;
  }
}
.text-wrapper {
  white-space: pre-line;
}
</style>
