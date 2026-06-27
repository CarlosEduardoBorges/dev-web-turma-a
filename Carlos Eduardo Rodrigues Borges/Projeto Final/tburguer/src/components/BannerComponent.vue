<template>
  <div id="main-banner">
    <img src="~@/../public/img/BANNER_SUSHI.png" id="banner-img" />
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  width: 100%;
  background-color: #1a2744;
  display: flex;
  justify-content: center;
}

#banner-img {
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: block;
}
</style>