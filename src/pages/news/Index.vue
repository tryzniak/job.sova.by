<template>
  <Layout>
    <Nameplate :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<page-query>
{
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        path
        tags {
          id
          title
          path
        }
        date (locale: "ru", format: "D MMMM YYYY")
        author
        description
        cover_image (width: 770, height: 380, blur: 10)
        ...on Post {
            id
            title
            path
        }
      }
    }
  }
}
</page-query>

<script>
import Nameplate from '~/components/Nameplate.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Nameplate,
    PostCard
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>
