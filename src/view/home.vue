<template>
  <div>
    home
    <div>当前数值{{ $store.state.count }}</div>
    <p>{{ $store.getters.score }}</p>
    <button @click="add">一个</button>
    <button @click="addAsync">两个</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    add() {
      this.$store.commit('increment')
    },
    addAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style lang="less" scope></style>
