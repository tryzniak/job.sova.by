<template>
  <div id="app">
    <header class="vc-header">
      <logo />
      <navigation />
      <div class="vc-header__contacts  vc-contacts">
        <span class="vc-contacts__text">У Вас есть вопросы?</span>
        <div class="vc-contacts__links">
          <a class="vc-contacts__email" href="mailto:info@sova.by"
            >info@sova.by</a
          >
        </div>
      </div>
    </header>

    <main class="main">
      <slot/>
    </main>

    <footer class="vc-footer" v-bind:class="{ 'footer-full': isFullFooter }">
      <div class="vc-copyright">
        © Copyright 2019 все права защищены
      </div>
      <div class="vc-social">
        <span class="vc-social__text">Мы в социальных сетях:</span>
        <div class="vc-social__links">
          <a class="vc-social__link" href="https://vk.com/jobsovaby">
            <img src="@/assets/images/vk.svg" alt="vkontakte" />
          </a>
          <a class="vc-social__link" href="https://www.facebook.com/jobsovaby">
            <img src="@/assets/images/fb.svg" alt="facebook" />
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navigation from '~/components/Navigation.vue'

export default {
  metaInfo: {
    title: "Вакансии для людей с инвалидностью"
  },
  computed: {
    isFullFooter: function() {
       return this.$route.path.includes("/news/")
    }
  },
  components: {
    Logo,
    Navigation
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto"),
    url("../assets/fonts/roboto_regular.woff2") format("woff2"),
    url("../assets/fonts/roboto_regular.woff") format("woff");
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: local("Roboto"), local("Roboto"),
    url("../assets/fonts/roboto_bold.woff2") format("woff2"),
    url("../assets/fonts/roboto_bold.woff") format("woff");
}

.footer-full {
  margin-left: 0;
}

</style>
