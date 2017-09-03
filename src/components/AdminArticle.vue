<template>
  <md-table-card>
    <md-toolbar>
      <h1 class="md-title">文章管理</h1>
      <md-button id="article-add" class="md-icon-button" @click="clickAdd">
        <md-icon>add</md-icon>
      </md-button>
  
    </md-toolbar>
  
    <md-table md-sort="dessert" md-sort-type="desc" @select="selectedArticle = $event" @sort="onSort">
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="title">id</md-table-head>
          <md-table-head md-sort-by="title">标题</md-table-head>
          <md-table-head md-sort-by="user.username">作者</md-table-head>
          <md-table-head md-sort-by="createdAt">发布时间</md-table-head>
          <md-table-head md-sort-by="updatedAt">修改时间</md-table-head>
          <md-table-head>
            <md-icon>settings</md-icon>
            <span>操作</span>
          </md-table-head>
        </md-table-row>
      </md-table-header>
  
      <md-table-body>
        <md-table-row v-for="(row, rowIndex) in articles" :key="rowIndex" :md-item="row" md-auto-select md-selection>
          <md-table-cell>
            {{row.id}}
          </md-table-cell>
          <md-table-cell>
            {{row.title}}
          </md-table-cell>
          <md-table-cell>
            {{row.user?row.user.username:'无'}}
          </md-table-cell>
          <md-table-cell>
            {{row.createdAt | datetime}}
          </md-table-cell>
          <md-table-cell>
            {{row.updatedAt | datetime}}
          </md-table-cell>
          <md-table-cell>
            <md-button :id="`article-edit-${row.id}`" class="md-icon-button" @click.stop.prevent="clickEdit(row.id)">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button :id="`article-remove-${row.id}`" class="md-icon-button" @click.stop.prevent="clickRemove(row.id)">
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-button id="article-remove-all" class="rm-all-btn md-icon-button" :disabled="selectedArticle.length == 0" @click="clickRemoveAll">
      <md-icon>delete</md-icon>
    </md-button> 
    
    <md-table-pagination :md-size="pagination.pageSize" :md-total="pagination.total" :md-page="page" md-label="单页文章数" md-separator="of" :md-page-options="[5, 10, 25, 50]" @pagination="onPagination">

    </md-table-pagination>
    </md-dialog>
    <md-dialog :md-open-from="currId?`#article-edit-${currId}`:'#article-add'" :md-close-to="currId?`#article-edit-${currId}`:'#article-add'" ref="editDialog">
      <md-dialog-title>{{currId?'修改':'添加'}}文章</md-dialog-title>
  
      <md-dialog-content>
        <article-edit :article-id="currId" @article="currArticle = $event"></article-edit>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="cancel('editDialog')">取消</md-button>
        <md-button class="md-primary" @click="articleCommit()">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm :md-open-from="`#article-remove-${currId}`" :md-close-to="`#article-remove-${currId}`"
      md-title="确认删除"
      :md-content-html="removeHit"
      md-ok-text="删除"
      md-cancel-text="取消"
      @close="removeDialogClose"
      ref="removeDialog">
    </md-dialog-confirm>

    <md-dialog-confirm :md-open-from="`#article-remove-all`" :md-close-to="`#article-remove-all`"
      md-title="确认删除"
      :md-content-html="removeAllHit"
      md-ok-text="删除"
      md-cancel-text="取消"
      @close="removeAllDialogClose"
      ref="removeAllDialog">
    </md-dialog-confirm>

  </md-table-card>
</template>

<script>
import axios from 'axios'
import ArticleEdit from './ArticleEdit'

export default {
  name: 'admin-article',
  components: {
    ArticleEdit
  },
  data () {
    return {
      articles: [],
      selectedArticle: [],
      sortBy: {
        name: 'id',
        type: 'asc'
      },
      pagination: {
        pageSize: 10
      },
      page: 1,
      currArticle: {},
      currId: null
    }
  },
  computed: {
    removeHit () {
      return `
      确认删除文章吗？<br/>
      ID 为：${this.currArticle.id}<br/>
      标题为：${this.currArticle.title}
      `
    },
    removeAllHit () {
      return `
      确认删除${this.selectedArticle.length}文章吗？<br/>
      `
    }
  },
  created () {
    this.getData()
    axios.get('http://localhost:3000/api/article').then(({ data: res }) => {
      if (!res.err) {
        this.articles = res.data
        this.pagination = res.pagination
      } else {
        console.log(res)
      }
    })
  },
  methods: {
    getData () {
      axios.get(`http://localhost:3000/api/article?offset=${(this.page - 1) * this.pagination.pageSize}` +
      `&pageSize=${this.pagination.pageSize}` +
      `&sort=${JSON.stringify([this.sortBy.name, this.sortBy.type])}`)
      .then(({ data: res }) => {
        if (!res.err) {
          this.articles = res.data
          this.pagination = res.pagination
        } else {
          console.log(res)
        }
      })
    },
    clickEdit (id) {
      this.currId = id
      setTimeout(() => {
        this.$refs['editDialog'].open()
      }, 0)
    },
    clickAdd () {
      this.currId = null
      this.$refs['editDialog'].open()
    },
    articleCommit () {
      if (this.currId) {
        axios.put(`http://localhost:3000/api/article/${this.currId}`, this.currArticle).then(({data: res}) => {
          if (res.err) {
            alert('修改失败')
          } else {
            alert('修改成功')
            this.$refs['editDialog'].close()
            Object.assign(this.articles.filter(i => i.id === this.currId)[0], this.currArticle)
          }
        })
      } else {
        axios.post('http://localhost:3000/api/article', this.currArticle).then(res => {
          if (res.data.err) {
            alert('提交失败')
          } else {
            alert('提交成功')
            this.$refs['editDialog'].close()
          }
        })
      }
    },
    clickRemove (id, e) {
      this.currId = id
      this.$refs['removeDialog'].open()
    },
    removeDialogClose (type) {
      if (type === 'ok') {
        axios.delete(`http://localhost:3000/api/article/${this.currId}`).then(({data: res}) => {
          if (res.err) {
            alert('删除失败')
          } else {
            alert('删除成功')
            this.$refs['removeDialog'].close()
            this.articles = this.articles.filter(i => i.id !== this.currId)
          }
        })
      }
    },
    cancel (ref) {
      this.$refs[ref].close()
    },
    onPagination (pagination) {
      this.page = pagination.page
      this.pagination.pageSize = pagination.size
      this.getData()
    },
    clickRemoveAll () {
      this.$refs['removeAllDialog'].open()
    },
    removeAllDialogClose (type) {
      if (type === 'ok') {
        Promise.all(this.selectedArticle.map(i => axios.delete(`http://localhost:3000/api/article/${i.id}`))).then((resArr) => {
          let res = resArr.reduce((i, j) => i || j.data.err, 0)
          if (res) {
            alert('删除失败')
          } else {
            alert('删除成功')
            this.$refs['removeDialog'].close()
            this.articles = this.articles.filter(i => !this.selectedArticle.map(i => i.id).includes(i.id))
            this.selectedArticle = []
          }
        })
      }
    },
    onSort (sortBy) {
      this.sortBy = sortBy
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
.rm-all-btn {
  margin-left 15px
}
</style>
