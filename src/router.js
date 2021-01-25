import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import User from "./views/User.vue";
import Profile from "./views/Profile.vue";
import Orders from "./views/Orders.vue";
import MProducts from "./views/MProducts.vue";
import { fb } from './Firebase';


Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/user",
            name: "user",
            component: User,
            meta: { requiresAuth: true }, // 登入前須經過驗證
            // User.vue的子分頁
            children: [
                {
                    path: "profile",
                    name: "profile",
                    component: Profile
                },
                {
                    path: "orders",
                    name: "orders",
                    component: Orders
                },
                {
                    path: "Mproducts",
                    name: "Mproducts",
                    component: MProducts
                },
            ]
        },
        {
            path: "/about",
            name: "about",
            component: () =>
                import("./views/About.vue")
        },
        {
            path: "/products",
            name: "products",
            component: () =>
                import("./views/Products.vue")
        },
        {
            path: "/stores",
            name: "stores",
            component: () =>
                import("./views/Stores.vue")
        },
        {
            path: "/news",
            name: "news",
            component: () =>
                import("./views/News.vue")
        },
    ]
});

//需經過驗證才可登入
router.beforeEach((to, from, next) => {

    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser

    // 未經過驗證則到首頁
    if (requiresAuth && !currentUser) {
        next('/')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router;