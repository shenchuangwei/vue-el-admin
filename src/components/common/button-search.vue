<template>
  <div>
    <div class="clearfix">
      <!--左边插槽-->
      <slot name="left"></slot>
      <!--控制高级搜索是否显示-->
      <div class="ml-auto d-flex align-items-center float-right" v-if="!superSearch">
        <!--右边具名插槽-->
        <slot name="right">
          <el-input size="mini" v-model="keywords" style="width: 160px" :placeholder="placeholder"></el-input>
          <el-button class="ml-2" size="mini" type="info" @click="$emit('search',keywords)">搜索</el-button>
          <el-button size="mini" @click="superSearch = true">高级搜索</el-button>
        </slot>
      </div>
      <!--高级搜索-->
      <el-card class="box-card my-3 bg-light" v-if="superSearch">
        <div slot="header" class="clearfix">
          <span>高级搜素</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="closeSuperSearch">收起</el-button>
        </div>
        <!--表单插槽-->
        <slot name="form"></slot>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "button-search",
  data() {
    return {
      keywords: '',
      superSearch: false
    }
  },
  props: ['placeholder'],
  methods: {
    closeSuperSearch() {
      this.superSearch = false
    }
  }
}
</script>

<style scoped>

</style>
