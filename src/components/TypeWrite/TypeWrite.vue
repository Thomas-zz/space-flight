<!--  -->
<template>
  <div ref="typewrite">
    <single-line :content="texts"></single-line>
  </div>
</template>

<script lang="ts">
import SingleLine from './ChildComponents/SingleLine.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    SingleLine,
  },
  setup() {
    const texts = ref('一个有希望的民族需要一群仰望星空的人')
    return { texts }
  },
})
</script>
<style scoped></style>
