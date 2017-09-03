<template>
  <div class="admin">
    <md-tabs md-centered>
      <md-tab md-label="文章管理" md-icon="assignment">
        <admin-article></admin-article>
      </md-tab>
  
      <md-tab md-label="标签管理" md-icon="bookmark">
      </md-tab>
  
      <md-tab md-label="分类管理" md-icon="class">
      </md-tab>
  
      <md-tab md-label="用户管理" md-icon="person">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import AdminArticle from '../components/AdminArticle'
export default {
  name: 'Admin',
  components: {
    AdminArticle
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
