<template>
  <div class="home">
    <Navbar></Navbar>
    <Login></Login>
    <Header></Header>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>
 
<script>
import Header from "@/components/Header.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Header,
    Banner,
    Footer,
    Login,
  },
};
</script>