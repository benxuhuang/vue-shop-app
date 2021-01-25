<template>
  <div class="profile">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Profile settings</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          <div class="col-md-6">
            <img
              src="/img/layout/profile.png"
              width="100"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "profile",
  props: {
    msg: String,
  },
};
</script>