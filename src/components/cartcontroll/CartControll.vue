<template>
  <div class="cart-controll">
    <!-- 本身food里边就没有 count 这个属性，如果需要向里边添加属性的话，必须用 vue.set(obj,key,value) -->
    <transition>
      <div class="decrease" v-if="food.count" @click="decreaseNum($event)">-</div>
    </transition>
    <div class="num" v-if="food.count">{{food.count}}</div>
    <div class="increase" @click="addtocart($event)">+</div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  components:{},
  props:{
    food: {
      type: Object
    }
  },
  data(){
    return {
          
    }
  },
  watch:{
    food: (newval,oldval) => {
      console.log(`food变化了`);
    }
  },
  computed:{},
  methods:{
    addtocart(event){
      if(!event._constructed) {
        return;
      }
      if(!this.food.count){
        Vue.set(this.food,"count",1)
      }else {
        this.food.count++;
      }

      console.log(this.food.count);
      
    },
    decreaseNum(event){
      if(!event._constructed) {
        return;
      }
      if(this.food.count){
        this.food.count--;
      }
    }
  },
  created(){
    
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
  .cart-controll {
    .decrease,.increase {
      padding: 6px;
      width: 14px;
      height: 14px;
      font-size: 14px;
      text-align: center;
      line-height: 14px;
      background: rgb(0,160,220);
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      border-radius: 50%;
    }

    .num {
      display: inline-block;
      vertical-align: middle;
    }

    .decrease {
      background: #fff;
      width: 13px;
      height: 13px;
      color: rgb(0,160,220);
      border: 1px solid rgb(0,160,220);
    }

  }
</style>
