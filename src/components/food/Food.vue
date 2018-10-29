<template>
  <div v-show="showFlag" class="food">
      <div class="food-content">
          <div class="image-header">
              <img :src="food.image" alt="">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
      food: {
          type: Object
      }
  },
  data(){
    return {
        showFlag: false
    }
  },
  watch:{},
  computed:{},
  methods:{
      show(){
          this.showFlag = true;
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;

        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>