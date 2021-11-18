<template>
  <div>
    <child>
      <template v-slot:default>999</template>
    </child>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child,
  },
}
</script>

<style lang="scss" scoped>
</style>
