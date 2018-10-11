<template>
  <div class="star" :class="whichStar">
      <span 
      class="star-item"
      :class="itemClass" 
      v-for="(itemClass,index) in classes" 
      :key="index"></span>
  </div>
</template>

<script>

const LENGTH = 5; 
const star_on = 'on';
const star_half = 'half';
const star_off = 'off';
 
export default {

  components:{},
  props:{
      size: {
          type: Number
      },
      score: {
          type: Number
      }
  },
  data(){
    return {

    }
  },
  watch:{},
  computed:{
      whichStar () {
          return 'star-' + this.size;
      },
      classes () {
          let result = [];
          let score = Math.floor(this.score*2)/2;
          let integer_star = Math.floor(score);
          let hasDecimal = this.score%1!==0;
          for(let i=0;i<integer_star;i++){
              result.push(star_on);
          }
          if(hasDecimal){
            result.push(star_half);
          }
          while (result.length<LENGTH) {  /*这里注意 - 不要死循环*/
            result.push(star_off);  
          }
          return result;
      }
  },
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
@mixin bg ($url) {
    background: url($url) no-repeat center center;
    background-size: cover;
}

.star {
    font-size: 0;
    .star-item {
        display: inline-block;
       
    }
    &.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;

            
            &.on {
                @include bg ('star48_on@2x.png')
            }

            &.half {
                @include bg ('star48_half@2x.png')
            }

            &.off {
                @include bg ('star48_off@2x.png')
            }
            
        }
    }

    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 15px;

            
            &.on {
                @include bg ('star36_on@2x.png')
            }

            &.half {
                @include bg ('star36_half@2x.png')
            }

            &.off {
                @include bg ('star36_off@2x.png')
            }
            
        }
    }

    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;

            &.on {
                @include bg ('star24_on@2x.png')
            }

            &.half {
                @include bg ('star24_half@2x.png')
            }

            &.off {
                @include bg ('star24_off@2x.png')
            }
            
        }
    }
}


</style>