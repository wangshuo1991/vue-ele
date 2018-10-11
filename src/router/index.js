import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
import Details from '../components/details/Details.vue'
import Ratings from '../components/rating/Ratings.vue'

Vue.use(Router)

var router = new Router({
    routes: [
        {path: '/goods',component: Goods},
        {path: '/details',component: Details},
        {path: '/ratings',component: Ratings},
        {path: '/',redirect: '/goods'}
        
    ],
    mode: 'history'
});

export default router;