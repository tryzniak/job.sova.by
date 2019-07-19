<template>
  <div class="post-meta">
    {{ post.date }}.
    <template v-if="post.author">
      <strong>{{ post.author }}</strong>
    </template>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang="scss">
.post-meta {
  font-size: 0.8em;
  opacity: 0.8;
}
</style>
