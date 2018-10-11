<template>
  <div class="shop-car">
      <div class="content">
          <div class="content-left">
              <div class="car-logo-wrapper">
                  <div class="car-logo">
                    
                  </div>
              </div>
              <div class="price">￥0</div>
              <div class="desc">配送费{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            ￥{{minPrice}}起送
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
      }
  },
  data(){
    return {

    }
  },
  watch:{},
  computed:{},
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
        }
    }
</style>