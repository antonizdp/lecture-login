<template>
  <div class="product-create">
    <el-form label-position="top" :model="product" :rules="productRules">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="前缀">
            <base-select :options="prefixes" v-model="product.prefix"></base-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="电机外方或者外径">
            <el-cascader
              v-model="product.diameter"
              :options="diameters"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'code',
              }"
              filterable
              :show-all-levels="false"
            >
              <template v-slot:default="{ data, node }">
                <span v-if="node.isLeaf">{{ data.code }}</span>
                <span :class="{ 'option-desc': node.isLeaf }">
                  {{ data.title }}
                </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="电机型式">
            <base-select :options="motorTypes" v-model="product.motorType"></base-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="机身长度">
            <base-select :options="motorThicknesses" v-model="product.motorThickness"></base-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="导程代码">
            <base-select :options="leads" v-model="product.motorLead"></base-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="电流" prop="current">
            <el-input v-model="product.current"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="长度或行程" prop="distance">
            <el-input v-model="product.distance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="操作">
            <el-button type="primary" @click="gotoEdit">领号</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect'

export default {
  components: {
    BaseSelect,
  },
  data() {
    return {
      prefixes: [],
      diameters: [],
      motorTypes: [],
      motorThicknesses: [],
      leads: [],
      product: {
        prefix: '',
        diameter: '',
        motorType: '',
        motorThickness: '',
        lead: '',
        current: '',
        distance: '',
      },
      productRules: {
        current: [
          {
            pattern: /^[1-9]+\d*(\.\d+)?$/,
            message: '电流只能是数字',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getPrefixes()
    this.getMotorTypes()
    this.getMotorThicknesses()
    this.getLeads()
  },
  methods: {
    getPrefixes() {
      this.$api.prefixes.get().then(({ data }) => {
        this.prefixes = data
      })
    },
    getMotorTypes() {
      this.$api.motorTypes.get().then(({ data }) => {
        this.motorTypes = data
      })
    },
    getMotorThicknesses() {
      this.$api.motorThicknesses.get().then(({ data }) => {
        this.motorThicknesses = data
      })
    },
    getLeads() {
      this.$api.leads.get().then(({ data }) => {
        this.leads = data
      })
    },
    gotoEdit() {
      this.$api.products
        .create(this.product)
        .then((response) => {
          const { _id } = response.data
          this.$router.push(`/products/${_id}/edit`)
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.product-create {
  ::v-deep {
    .el-form {
      > :last-child {
        .el-form-item__label {
          visibility: hidden;
        }
      }
    }
  }

  .el-select,
  .el-cascader {
    display: block;
  }
}
</style>
