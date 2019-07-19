<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom"># {{ $page.tag.title }}</h1>

    <div class="posts">
      <PostCard
        v-for="edge in $page.tag.belongsTo.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </div>
  </Layout>
</template>

<page-query>
query Tag ($id: String!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            date (locale: "ru", format: "D MMMM YYYY")
            author
            description
            cover_image (width: 860, blur: 10)
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Nameplate from "~/components/Nameplate.vue";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    Nameplate,
    PostCard
  },
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>

<style lang="scss"></style>
