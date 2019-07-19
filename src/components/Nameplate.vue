<template>
  <div class="nameplate">
    <g-image
      alt="Nameplate image"
      class="nameplate__image"
      src="~/assets/images/news.svg"
      width="180"
      height="180"
      blur="5"
    />

    <h1 v-if="showTitle" class="nameplate__site-title">
      Новости проекта
    </h1>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["showTitle"]
};
</script>

<style lang="scss">
.nameplate {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  padding: calc(var(--space) / 2) 0;

  &__image {
    width: 180px;
    height: 180px;
    margin-bottom: 1em;
  }

  &__intro {
    opacity: 0.8;
  }

  &__site-title {
    font-size: 1.5em;
  }

  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
    }
  }
}
</style>
