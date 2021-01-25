<template>
  <div class="navbar">
    <nav
      class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/news" class="nav-link">News</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/stores" class="nav-link">Stores</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="gomenber"><span>Member-Center</span></a>
          </li>
        </ul>
      </div>
      <form class="form-inline my-2 my-lg-0">
        <!-- 點選後彈出login視窗(Modal) -->
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          data-toggle="modal"
          data-target="#login"
          v-show="isLogin == 'no'"
          >Login/Register</a
        >
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          @click="logout()"
          v-show="isLogin == 'yes'"
          >Log out</a
        >
      </form>
    </nav>
  </div>
</template>
 
<script>
import { fb, db } from "../Firebase";
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      level: null,
      isLogin: "no",
    };
  },
  methods: {
    logout() {
      //會員登出
      fb.auth()
        .signOut()
        //會員登出通知
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "info",
            title: "you are already logged out",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gomenber() {
      //登入後才可到會員中心
      let user = fb.auth().currentUser;
      if (user !== null) {
        this.$router.replace("user");
      } else {
        //未登入提醒
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Please Login or Register!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  created() {
    // 由firebase的Authentication中取得使用者
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = "yes";
      }
    });
  },
};
</script>
 
<style scoped lang="scss">
@media (min-width: 992px) {
  .navbar.custom-nav {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #7da79d !important;
  }
}
</style>