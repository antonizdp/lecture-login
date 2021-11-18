<template>
  <el-select :value="value" @input="$emit('input', $event)" clearable filterable>
    <el-option v-for="option in options" :key="option._id" :value="option._id" :label="option.code">
      <div class="option-wrapper">
        <span>{{ option.code }}</span>
        <span>{{ option.title }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Array,
      // 验证是对象数组，且数组元素是有 _id、title、code 属性的对象
      validator(value) {
        return value.every((item) => {
          const { _id, title, code } = item
          return Boolean(_id && title && code)
        })
      },
    },
    value: {
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.option-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.option-wrapper > :last-child {
  font-size: 13px;
  color: #8492a6;
}
</style>
