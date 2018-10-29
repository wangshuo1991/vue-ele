<template>
  <div>
	<div class="shop-car">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="car-logo-wrapper">
					<div class="car-logo" :class="{'hasFood': totalCount>0}">
						<div class="food-count" v-show="totalCount>0">{{totalCount}}</div>
					</div>
				</div>
				<div class="price">￥{{totalPrice}}</div>
				<div class="desc">配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="{'gotopay': minPrice<totalPrice}" @click.stop.prevent="pay">
				<span v-if="totalPrice===0">￥{{minPrice}}起送</span>
				<span v-else-if="minPrice>totalPrice">￥{{minPrice-totalPrice}}起送</span>
				<span v-else>立即结算</span>
			</div>
		</div>
		<div class="shopcart-list" v-show="listshow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li v-for="(food,index) in selectFoods" :key="index" class="food">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<CartControll :food="food"></CartControll>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="list-mask" v-show="listshow" @click="hidelist">

	</div>
  </div>
</template>

<script>

import CartControll from '../cartcontroll/CartControll'
import BScroll from 'better-scroll';

export default {
  components:{
      CartControll
  },
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
        fold: true
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
      },
      listshow () {
          if(!this.totalCount){
			  this.fold = true;		
			  return false;	
		  }
		  
		  let show = !this.fold;
		 if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
		} else {
			this.scroll.refresh();
		}
		  return show;
      }
  },
  methods:{ 
	  toggleList(){/* 展开 购物车详情列表 */
		  if(!this.totalCount){
			  return;
		  }
		  this.fold = !this.fold;
	  },
	  empty(){
		  this.selectFoods.forEach(item=>{
			  item.count=0;
		  });
	  },
	  hidelist(){
		  this.fold = true;
	  },
	  pay(){
		  if(this.totalPrice<this.minPrice){
			  return;
		  }
		  window.alert(`支付${this.totalPrice}`);
	  }
  },
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

		.shopcart-list {

			position: absolute;
			top: -261px;
			left: 0;
			z-index: -1;
			width: 100%;

			.list-header {
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,.1);
				overflow: hidden;

				.title {
					float: left;
					font-size: 14px;
					color: rgb(7,17,27)
				}

				.empty {
					float: right;
					font-size: 12px;
					color: rgb(0,160,220);
				}
			}
			
			.list-content {
				padding: 0 18px;
				width: 100%;
				box-sizing: border-box;
				height: 220px;
				background: #fff;
				overflow: auto;

				.food {
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(7,17,27,.1);

					.name {
						line-height: 24px;
						font-size: 14px;
						color: rgb(7,17,27);
					}

					.price {
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;	
						font-size: 14px;
						font-weight: 700;
						color: #f40;
					}

					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 10px;
					}
				}
			}
		}

		

    }

	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		background: rgba(0,0,0,.5);
	}
</style>