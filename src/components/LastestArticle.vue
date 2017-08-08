<template>
  <div class="lastest-article">
    <h2>近期文章</h2>
    <ul>
        <li v-for="article in data"><router-link :to="'/article/'+article.id">{{article.title}}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.lastest-article {
    h2 {
        font-weight 500
        font-size  18px
    }
    li {
        font-size 14px
        line-height 28px
        a{
            color: #000
            text-decoration: none
        }
    }
}
</style>
