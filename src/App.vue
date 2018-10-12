<template>
  <div id="app">
    <my-header :hdata="leftNavMsg"></my-header>
    <div class="tab-container">
        <ul class="tab-nav">
            <router-link to="/goods" tag="li">商品</router-link>
            <router-link to="/details" tag="li">详情</router-link>
            <router-link to="/ratings" tag="li">评论</router-link>
        </ul>
        <router-view :seller="leftNavMsg"></router-view>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/header/Header.vue'

export default {
  name: 'app',
  data(){
    return {
      leftNavMsg: {}
    }
  },
  components: {
      MyHeader
  },
  methods:{
    getProInfo () { //-> 取数据
          this.$http.get('/api/seller?='+Math.random()).then(
              (res) => {  
                  this.leftNavMsg = res.body.data;
              }
          );
      }
  },
  created(){
    this.getProInfo();
  }
}
</script>

<style>
.tab-container{
    width: 100%;
    background: #fff;
}

.tab-container .tab-nav {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}

.tab-container .tab-nav li {
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
}

.router-link-active {
    color: #f40;
}
</style>


