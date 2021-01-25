<template>
  <div class="user">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!--sidebar-brand-->
          <div class="sidebar-item sidebar-brand">
            <a href="#">VUE SHOP</a>
            <!--收合按鈕-->
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!--sidebar-header-->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="/img/user.jpg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">User</span>
              <span class="user-role">Email</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!--sidebar-menu-->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>MEAU</span>
              </li>
              <li>
                <router-link to="/user/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>

              <li>
                <router-link to="/user/MProducts">
                  <i class="fab fa-amazon"></i>
                  <span>Manage Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <i class="fa fa-home"></i>
                  <span>Home</span>
                </router-link>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-sign-out-alt"></i>
                  <span class="menu-text" @click="logout()">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!--sidebar-menu-->
        </div>
      </nav>
      <!-- 安排子分頁出現位置 -->
      <!--page-content-->
      <main class="page-content">
        <router-view></router-view>
      </main>
    </div>
    <!--page-wrapper-->
  </div>
</template>
 
<script>
import { fb, db } from "../Firebase";
export default {
  name: "user",
  data() {
    return {
      email: null,
    };
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        //點選登出之後來到首頁頁面
        .then(() => {
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // 由firebase的Authentication中取得使用者email
    let user = fb.auth().currentUser;
    this.email = user.email;
  },
};
</script>
 
<style scoped lang="scss">
</style>