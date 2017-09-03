<template>
  <div class='main'>
    <md-layout md-gutter>
      <md-layout md-flex="66" class="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div v-for="article in articles" class="item" :key="article.id">
          <article-item :data="article"></article-item>
        </div>
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
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Tag from '../components/Tag'
import ArticleItem from '../components/ArticleItem'
import axios from 'axios'

export default {
  components: {
    LastestArticle,
    Archive,
    Tag,
    ArticleItem
  },
  name: 'home',
  data () {
    return {
      articles: [],
      pagination: {
        pageSize: 10,
        total: 10,
        nextOffset: 0,
        offset: 0
      },
      filter: {},
      resource: 'article',
      queryId: null,
      lastestArticles: [],
      archives: [],
      tags: [],
      routeName: null
    }
  },
  watch: {
    '$route': function (newVal) {
      this.initByRoute()
      this.loadMore()
    }
  },
  async created () {
    this.initByRoute()
    let { data: lastestArticlesRes } = await axios.get('http://localhost:3000/api/lastest-article')
    let { data: archivesRes } = await axios.get('http://localhost:3000/api/archive')
    let { data: tagsRes } = await axios.get('http://localhost:3000/api/tag')
    this.lastestArticles = lastestArticlesRes.data
    this.archives = archivesRes.data
    this.tags = tagsRes.data
  },
  methods: {
    loadMore () {
      if (this.pagination.nextOffset != null) {
        let url = 'http://localhost:3000/api/' +
        this.resource + (this.resource === 'article/tag' ? ('/' + this.queryId) : '') +
        `?pageSize=${this.pagination.pageSize}&` +
        `offset=${this.pagination.nextOffset}&` +
        `filter=${JSON.stringify(this.filter)}`
        console.log(url)
        axios.get(url)
          .then(({ data: res }) => {
            if (!res.err) {
              this.articles = [...this.articles, ...res.data]
              this.pagination = res.pagination
            } else {
              console.log(res)
            }
          })
      }
    },
    initByRoute () {
      const name = this.$route.name
      this.routeName = name
      if (name === 'Achive') {
        const { year, month } = this.$route.params
        this.filter = {
          createdAt: {
            '$lt': `${year}-${+month + 1}-1`,
            '$gte': `${year}-${month}-1`
          }
        }
        this.resource = 'article'
      } else if (name === 'Tag') {
        const { id } = this.$route.params
        this.resource = 'article/tag'
        this.queryId = id
      } else if (name === 'Home') {
        this.filter = {}
        this.resource = 'article'
      }
      this.pagination = {
        pageSize: 10,
        total: 10,
        nextOffset: 0,
        offset: 0
      }
      this.articles = []
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.list {
  padding: 0 20px
}

.wrapper {
  display: block
}

.item {
  margin-bottom: 60px
}
</style>
