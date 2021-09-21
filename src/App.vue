<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
      return {
        radio:3
      }
  },
  methods:{

  }
}
</script>

<style>
::-webkit-scrollbar-track
{
  background: transparent;
}

::-webkit-scrollbar
{
  width: 3px;
}

::-webkit-scrollbar-thumb
{
  background: #9f9f9f;
  border-radius: 10px;
}
</style>
