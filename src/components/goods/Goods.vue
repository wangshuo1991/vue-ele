<template>
    <div class="goods">
        <!-- 这里内容的高度超出 可以用better-scroll 实现滑动 -->
       <div class="left-menu" ref="leftMenu">
           <ul>
               <li 
               v-for="(item,index) in goods" 
               :key="index" 
               class="menu-item"
               :class="{'current':currentIndex === index}"
               @click="selectMenu(index,$event)">
                   <span class="text">
                        <span 
                        v-show="item.type>0" 
                        class="icon" 
                        :class="classMap[item.type]">
                        </span>
                        {{item.name}}
                   </span>
               </li>
           </ul>
       </div>     
       <div class="foods-content" ref="foodContent">
           <ul>
               <li 
               class="good-list good-hook" 
               v-for="(item,index) in goods" 
               :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li 
                        class="food-item"
                        v-for="(food,i) in item.foods" 
                        :key="i">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="sell-count">月售:{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
               </li>
           </ul>
       </div>
       <shop-car :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-car>
    </div>
</template>

<script>

import BScroll from 'better-scroll';
import ShopCar from '../shopCar/ShopCar'

export default {
  components:{
    ShopCar
  },
  props:{
      seller: {
          type: Object
      }
  },
  data() {
      return {
          goods: [],
          height_ary: [],
          scrollY: 0,
      }
  },
  created () {
      this.classMap = ['decrease','guarantee','invoice','special','discount'];

      this.$http.get("/api/goods").then((res) => {
          res = res.body;
          this.goods = res.data;
          /*异步更新 dom没有变化 高度初始化会有问题 要用 nextTick */
          this.$nextTick(() => {
              this._initScroll();
              this._calcuHeight();
          });
      });

      
  },
  methods: { 
      /*初始化better-scroll*/ 
      _initScroll () {
          this.menuScroll = new BScroll(this.$refs.leftMenu,{
              click: true,
          });
          this.foodScroll = new BScroll(this.$refs.foodContent,{
              click: true,
              probeType: 3  /* 希望实时告知滚动的位置 */
          });

          this.foodScroll.on('scroll',(pos) => { /* on 监听 scroll 事件，pos 就是当前的位置，她是一个负值的y的小数，把当前滚动位置的值暴露出来 */
            this.scrollY = Math.abs(Math.round(pos.y));
          })
      },
      _calcuHeight () { /* 将每一块的高度加等起来 一项项的存在数组中；然后点击左侧 对应相应的Y值运动即可 */
          let _height = 0;
          let heightAry = [];
          let blocks = this.$refs.foodContent.getElementsByClassName("good-hook");
          heightAry.push(_height);
          for(var i=0,len=blocks.length;i<len;i++){
              _height += blocks[i].clientHeight;
              heightAry.push(_height);
          }

          //console.log(heightAry);
          this.height_ary = heightAry;
      },
      selectMenu(i,event) {
        if (!event._constructed) { /* 为了解决如果不是自定义的click 那么在这一步就停止执行 */
            return;
        }
        let blocks = this.$refs.foodContent.getElementsByClassName("good-hook");
        let el = blocks[i];
        this.foodScroll.scrollToElement(el, 300);
      }
  },
  computed: {
      currentIndex () {
          /* 遍历高度 如果 当前的高度在连个区间之内，就返回索引值 让这个索引项高亮 'current' */
          for (let i = 0;i< this.height_ary.length;i++) {
              let _height1 = this.height_ary[i];
              let _height2 = this.height_ary[i+1];
              if (!_height2 || this.scrollY >= _height1 && this.scrollY < _height2) {
                  return i;
              }
          }
          return 0;
      }
  }
}
</script>
<style lang="scss" scoped>

    @mixin bg ($url) {
        background: url($url) no-repeat center center;
        background-size: cover;
    }

    .goods { /* 定义视口高度 */
        position: absolute;
        width: 100%;
        top: 194px;
        bottom: 46px;
        display: flex;
        overflow: hidden;

        .left-menu {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;

            .menu-item {
                display: table;
                width: 56px;
                height: 54px;
                line-height: 16px;
                padding: 0 12px;

                .icon {
                    display:inline-block;
                    width: 14px;    
                    height: 14px;
                    vertical-align: top;
                    margin-right: 2px;

                    &.decrease {
                        @include bg('decrease_3@2x.png');
                    }

                    &.guarantee {
                        @include bg('guarantee_3@2x.png');
                    }

                    &.invoice {
                        @include bg('invoice_3@2x.png');
                    }

                    &.special {
                        @include bg('special_3@2x.png');
                    }

                    &.discount {
                        @include bg('discount_3@2x.png');
                    }
                }

                .text {
                    font-size: 12px;
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                }
            }

            .current {
                background: #fff;
                font-weight: 700;
                color: #333;
            }
        }

        .foods-content {
            flex: 1;

            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rbg(147,153,159);
                background: #f3f5f7;
            }

            .food-item {
                display: flex;
                margin: 18px;

                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }

                .content {
                    flex: 1;

                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }

                    .desc,.extra {
                        font-size: 10px;
                        color: rgb(147,153,159);
                        margin-bottom: 8px;
                        line-height: 14px;
                    }

                    .extra {
                        .sell-count {
                            margin-right: 6px;
                        }
                    }

                    .price {
                       
                        line-height: 24px;

                        .now {
                            font-size: 14px;
                            font-weight: 700;
                            color: #f40;
                            margin-right: 6px;
                        }

                        .old {
                            font-size: 12px;
                            color: #ccc;
                            font-style: line-through;
                        }
                    }
                    
                }
            }
        }
    }


</style>