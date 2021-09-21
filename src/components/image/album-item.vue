<template>
  <li class="list-group-item list-group-item-action d-flex align-items-center"
      @click.stop="$emit('albumChange',index)" style="line-height: 24px;cursor: pointer"
      :class="{'active sum-active':albumIndex === index}">{{ item.name }}
    <el-dropdown class="btn ml-auto">
                <span class="btn btn-light btn-sm border" size="mini" style="font-size: 12px">
                  {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.stop.native="$emit('albumDel',index)">删除</el-dropdown-item>
        <el-dropdown-item @click.stop.native="$emit('openEditModel',{item,index})">修改</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>

<script>
export default {
  name: "album-item",
  props: {
    item: Object,
    index: Number,
    albumIndex: Number
  }
}
</script>

<style scoped>

</style>
