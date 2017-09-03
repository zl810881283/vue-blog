<template>
  <div class="main">
    <form novalidate>
      <md-layout md-gutter>
        <md-layout class="item" md-flex-xsmall="100" md-flex="66" >
          <md-input-container>
            <label>文章标题</label>
            <md-input v-model="article.title"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout class="item" md-flex-xsmall="100" md-flex="33">
        </md-layout>
      </md-layout>
      <vue-editor v-model="article.content"></vue-editor>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  props: {
    articleId: {
      type: Number
    }
  },
  name: 'article-edit',
  data () {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  watch: {
    'articleId': function (newVal) {
      let {articleId} = this
      if (articleId) {
        axios.get(`http://localhost:3000/api/article/${articleId}`).then(({data: res}) => {
          if (res.err) {
            alert('加载文章出错')
          } else {
            this.article = res.data
          }
        })
      } else {
        this.article = {
          title: '',
          content: ''
        }
      }
    },
    'article.title': function (newVal) {
      this.$emit('article', this.article)
    },
    'article.content': function (newVal) {
      this.$emit('article', this.article)
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
  padding: 0 20px
}
</style>
