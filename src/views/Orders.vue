<template>
  <div class="order">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Order Page</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/layout/orders.jpg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "order",
  props: {
    msg: String,
  },
};
</script>