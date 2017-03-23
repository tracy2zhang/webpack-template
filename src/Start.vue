<template>
  <div id="start">
    hello, webpack {{message}}
    <div>{{count}}</div>
    <button @click="add">add</button>
    <button @click="substract">substract</button>
    <p><img src="assets/img/name.jpg" alt="" style="display:block;width:500px"></p>
    <p><img :src="img" alt="" style="display:block;width:500px"></p>
    <p><i class="material-icons">home</i></p>
    <div class="header">
      fdsfdsfdsfdsfs <span>test</span>
    </div>
    <div class="page404"></div>
    <div class="download"></div>
  </div>
</template>

<script>
import img from 'assets/img/name.jpg'

export default {
  name: 'start',
  data () {
    return {
      message: 'yeah',
      count: 2,
      img
    }
  },
  methods: {
    add () {
      this.count ++
    },
    substract () {
      this.count --
    }
  }
}
</script>

<style lang="less" scoped>

  .page404 {
    width: 400px;
    height: 200px;
    background: url('assets/img/404.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .header {
    span {
      color: blue;
    }
  }

</style>
