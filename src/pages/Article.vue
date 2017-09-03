<template>
  <div class="main">
    <md-layout md-gutter>
      <md-layout md-flex="66" class="wrapper">
        <article-item :data="article" :show-detail="true"></article-item>
      </md-layout>
      <md-layout md-flex="33" class="wrapper">
        <lastest-article :data="lastestArticles"></lastest-article>
        <archive :data="archives"></archive>
        <tag :data="tags"></tag>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios'
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Tag from '../components/Tag'
import ArticleItem from '../components/ArticleItem'

export default {
  components: {
    LastestArticle,
    Archive,
    Tag,
    ArticleItem
  },
  name: 'article',
  data () {
    return {
      article: {},
      lastestArticles: [
        {
          id: 1,
          title: '文章名字'
        },
        {
          id: 2,
          title: '文章名字2'
        },
        {
          id: 3,
          title: '文章名字3'
        }
      ],
      archives: [
        {
          year: 2017,
          month: 1,
          articleNum: 3
        },
        {
          year: 2017,
          month: 2,
          articleNum: 6
        },
        {
          year: 2017,
          month: 3,
          articleNum: 5
        }
      ],
      targets: [
        {
          id: 1,
          name: '前端'
        },
        {
          id: 2,
          name: 'css'
        },
        {
          id: 3,
          name: '爬虫'
        }
      ]
    }
  },
  methods: {
    getData (aid) {
      axios.get(`http://localhost:3000/api/article/${aid}`).then(({data: res}) => {
        if (!res.err) {
          this.article = res.data
        } else {
          console.log(res)
          this.$router.push('/not-found')
        }
      })
    }
  },
  created () {
    let {id} = this.$route.params
    this.getData(id)
  },
  watch: {
    '$route': function (newVal) {
      let {id} = newVal.params
      this.getData(id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  padding: 0 20px
}
.wrapper{
  display: block
}
</style>
