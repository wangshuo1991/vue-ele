<template>
  <div class="shop-car">
      <div class="content">
          <div class="content-left">
              <div class="car-logo-wrapper">
                  <div class="car-logo" :class="{'hasFood': totalCount>0}">
                    <div class="food-count" v-show="totalCount>0">{{totalCount}}</div>
                  </div>
              </div>
              <div class="price">￥{{totalPrice}}</div>
              <div class="desc">配送费{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" :class="{'gotopay': minPrice<totalPrice}">
            <span v-if="totalPrice===0">￥{{minPrice}}起送</span>
            <span v-else-if="minPrice>totalPrice">￥{{minPrice-totalPrice}}起送</span>
            <span v-else>立即结算</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
      deliveryPrice: {
          type: Number
      },
      minPrice: {
          type: Number
      },
      selectFoods: { /* 在 goods 页面选中的商品 放在这个数组中 */
          type: Array,
          default () {
              return [];
          }
      }
  },
  data(){
    return {

    }
  },
  watch:{},
  computed:{
      totalPrice () {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });  
          return total;
      },
      totalCount () {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count<99?count:99;
      }
  },
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
    .shop-car {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        background: #333;

        .content {
            display: flex;
            background: #141d27;

            .content-left {
                flex: 1;

                .car-logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    box-sizing: border-box;
                    vertical-align: top;
                    background: #141d27;

                    .car-logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        position: relative;

                        .food-count {
                            position: absolute;
                            width: 24px;
                            height: 16px;
                            background: red;
                            color: #fff;
                            font-size: 12px;
                            line-height: 16px;
                            text-align: center;
                            border-radius: 16px;
                            right: -5px;
                            top: -5px;
                        }
                    }

                    .hasFood {
                        background: #3B99FF;
                    }
                }

                .price {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin-top: 12px;
                    box-sizing: border-box;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255,255,255,0.1);
                    font-size: 16px;
                    font-weight: 700;
                    color: #ddd8d8;
                }

                .desc {
                    display: inline-block;
                    vertical-align: top;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    font-size: 12px;
                    color: #f5f5f5;
                    
                }
            }

            .content-right {
                flex: 0 0 105px;
                font-size: 16px;
                color: #ddd;
                text-align: center;
                line-height: 48px;
                background: #2b333b;
            }

            .gotopay {
                background: #2BA245;
                color: #fff;
            }
        }
    }
</style>