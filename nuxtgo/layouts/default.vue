<template>
  <div>
    <Nuxt />
    <notifications group="success" position="bottom right" />
    <notifications group="error" position="top right" />
  </div>
</template>

<style lang="scss">
.banner {
  display: block;
  width: 100%;
  background: url(~/assets/images/lu.png) no-repeat center center;
  height: 420px;
  background-size: cover;
}

html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
* {
  font-family: 微軟正黑體;
}
.h1 {
  text-align: center;
  color: #fff;
  padding-top: 57px;
  letter-spacing: 14px;
  font-weight: 500;
  margin: 0;
}

#sel {
  width: 500px;
  height: 53px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.5);
  border: solid 3px #fff;
  font-size: 20px;
  max-width: 80%;
}

#h2 {
  text-align: center;
}

.bigtitle a {
}

.footer {
  position: relative;
  bottom: 0;
  background: #1d2138;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  letter-spacing: 1px;
  padding-top: 11px;
  padding-bottom: 11px;
  margin-top: 15px;
}
.footer p {
  margin: 0;
}
.container {
}
.vue-notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification-title {
  font-weight: 600;
}

.vue-notification-template {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.vue-notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #e54d42;
  border-left-color: #b82e24;
}

.vue-notification.success {
  background: #68cd86;
  border-left-color: #42a85f;
}

.vn-fade-enter-active,
.vn-fade-leave-active,
.vn-fade-move {
  transition: all 0.5s;
}

.vn-fade-enter,
.vn-fade-leave-to {
  opacity: 0;
}
</style>
