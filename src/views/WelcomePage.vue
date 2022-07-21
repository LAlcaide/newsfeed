<template>
  <body data-home-page="Home.html" data-home-page-title="Home" class="u-body u-xl-mode">
    <section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="1280" data-image-height="853" id="sec-6270">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h1 class="u-text u-text-default u-title u-text-1">LIDEL ALCAIDE</h1>
        <p class="u-large-text u-text u-text-default u-text-variant u-text-2">07/08/2022</p>
        <router-link :to="{name: 'Home'}" class="u-btn u-button-style u-palette-2-base u-btn-1">go To App</router-link>
      </div>
    </section>
</body>
</template>

<script lang="ts">
export default {
    name: "WelcomePage",
    components: {}
}
</script>

<style>
 .u-section-1 {
  background-image: linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("@/assets/Bg.jpg");
  background-position: 50% 50%;
}

.u-section-1 .u-sheet-1 {
  min-height: 800px;
}

.u-section-1 .u-text-1 {
  font-size: 6rem;
  font-weight: 700;
  margin: 60px auto 0;
}

.u-section-1 .u-text-2 {
  margin: 30px auto 0;
}

.u-section-1 .u-btn-1 {
  background-image: none;
  text-transform: uppercase;
  font-weight: 700;
  margin: 40px auto 60px;
}

@media (max-width: 1199px) {
  .u-section-1 .u-sheet-1 {
    min-height: 660px;
  }
}

@media (max-width: 991px) {
  .u-section-1 .u-sheet-1 {
    min-height: 506px;
  }
}

@media (max-width: 767px) {
  .u-section-1 .u-sheet-1 {
    min-height: 380px;
  }
}

@media (max-width: 575px) {
  .u-section-1 .u-sheet-1 {
    min-height: 239px;
  }

  .u-section-1 .u-text-1 {
    font-size: 3.75rem;
  }
}
</style>