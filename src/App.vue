<template>
<div class="main-container">
  <Header />
  <Slider />
  <Footer />
</div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Slider from "./components/Slider.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Slider,
  },

};
</script>
