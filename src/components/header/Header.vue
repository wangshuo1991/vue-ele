<template>
    <div>
        <div class="header">
            <div class="content">
                <div class="avatar">
                    <img width="60" height="60" :src="hdata.avatar" alt="">
                </div>
                <div class="txt-box">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="title-name">{{hdata.name}}</span>
                    </div>
                    <div class="description">
                        {{hdata.description}}/{{hdata.deliveryTime}}分钟送达
                    </div>

                    <!-- 为什么要叫v-if？ 因为数据是异步获取的，所以就需要判断 这个数据是否加载完成，如果没有加载完成就不显示了  -->
                    <div v-if="hdata.supports" class="support">
                        <span class="icon" :class="classMap[hdata.supports[0].type]"></span>
                        <span class="text">{{hdata.supports[0].description}}</span>
                    </div>
                </div>

                <div v-if="hdata.supports" class="count" @click="showMask">
                    <span>{{hdata.supports.length}}</span><span class="icon-winfo-icon-"></span>
                </div>
                
            </div>
            <div class="bullet">
                <span class="bulletin-title">

                </span>
                <span class="bullet-text">
                    {{hdata.bulletin}}
                </span>
                <span class="icon-winfo-icon-"></span>
            </div>
            <div class="bg-img">
                <img :src="hdata.avatar" width="100%" height="100%">
            </div>

            <!-- 这里有一个重要布局 就是粘性底部 sticky footer -->
            <div class="header-mask" v-show="maskShow">
                <div class="mask-warpper clearfix">
                    <div class="mask-main">
                        <h1 class="mask-title">
                            {{hdata.name}}
                        </h1>
                        
                        <star 
                        class="mask-star" 
                        :size="48" 
                        :score="3.2">
                        </star>
                            
                        
                    </div>
                </div>
                <!-- 关闭按钮始终在页面下部 粘性菜单 sticky footer-->
                <div class="mask-close">
                    <span class="close-btn" @click="closeMask">x</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Star from '../star/Star.vue'

    export default {
        data(){
            return {
                classMap: [],
                maskShow: false,
            }
        },
        props: ['hdata'],
        created(){
            this.classMap = ['decrease','guarantee','invoice','special','discount'];
        },
        methods: {
            showMask(){
                this.maskShow = true;
            },
            closeMask(){
                this.maskShow = false;
            }
        },
        components:{
            Star
        }
    }
</script>

<style lang="scss" scoped>

@import '../../common/icon/style.css';

@mixin bg ($url) {
    background: url($url) no-repeat center center;
    background-size: cover;
}

.header {
    width: 100%;
    height: 133px;
    color: #fff;
    position: relative;
    background: rgba(7,17,27,.5);
    overflow: hidden;

    .content {
        padding: 24px 12px 18px 24px;
        overflow: hidden;
        position: relative;

        .avatar {
            float: left;
        }

        .txt-box {
            float: left;
            margin-left: 16px;

            .title { 
                margin: 2px 0 8px 0;

                .brand {
                    width: 30px;
                    height: 18px;
                    display: inline-block;
                    @include bg('brand@2x.png');
                    vertical-align: top;
                }

                .title-name {
                    font-size: 16px;
                    margin-left: 6px;
                }
            }

            .description {
                font-size: 14px;
            }

            .support {
                font-size: 14px;
                margin-top: 4px;

                .icon {
                    display:inline-block;
                    width: 14px;    
                    height: 14px;
                    vertical-align: top;
                    margin-right: 5px;

                    &.decrease {
                        @include bg('decrease_2@2x.png');
                    }

                    &.guarantee {
                        @include bg('guarantee_2@2x.png');
                    }

                    &.invoice {
                        @include bg('invoice_2@2x.png');
                    }

                    &.special {
                        @include bg('special_2@2x.png');
                    }

                    &.discount {
                        @include bg('discount_2@2x.png');
                    }

                }
            }
        }

        .count {
            position: absolute;
            bottom: 20px;
            right: 20px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            background-color:rgba(0,0,0,.3);
        }
    }

    .bullet {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(0,0,0,.3);

        .bulletin-title {
            display: inline-block;
            width: 22px;
            height: 12px;
            vertical-align: top;
            margin-top: 8px;
             @include bg('bulletin@2x.png');
        }

        .bullet-text {
            font-size: 14px;
            margin: 0 4px 0 4px;
            vertical-align: top;
        }

        .icon-winfo-icon- {
            position: absolute;
            font-size: 12px;
            right: 4px;
            top: 8px;
        }
    }

    .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        filter: blur(10px);
    }

    .header-mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,.8);

        .mask-warpper {
            min-height: 100%;

            .mask-main {
                margin-top: 60px;
                padding-bottom: 60px;

                .mask-title {
                    text-align: center;
                }

                .mask-star {
                    margin: 15px 0 24px 0;
                    text-align: center;
                }
            }

            
        }
        /*粘性底部 布局*/
        .mask-close {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            margin: -60px auto 0 auto;

            .close-btn {
                font-size: 24px;
                color: #fff;
            }

        }
    }

    
}
</style>

