<template>
  <div class="main">
    <div class="col md-8 list">
      <article-item :data="article" :show-detail="true"></article-item>
    </div>
    <div class="col md-4 xs-12">
      <lastest-article :data="lastestArticles"></lastest-article>
      <archive :data="archives"></archive>
      <target :data="targets"></target>
    </div>
  </div>
</template>

<script>
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Target from '../components/Target'
import ArticleItem from '../components/ArticleItem'
export default {
  components: {
    LastestArticle,
    Archive,
    Target,
    ArticleItem
  },
  name: 'article',
  data () {
    return {
      article: {
        id: 1,
        title: '文章名字',
        target: '前端',
        date: '2017/6/17',
        clickTimes: '2222',
        content: `随着屏幕的大小变换，内容区域的元素会匹配屏幕重新布局，就是我们说的自适应效果。我们在.col列中追加class类就可以实现自适应效果。如超小屏幕(xs)、超大屏幕(xl)。栅格系统首先会匹配移动手机版小屏幕，所以每个.col都需要一个class如：.xs-*，这样的话如果大屏幕的类没有设置，它就会使用这个.xs-*。
本文不会探讨单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 首先本文不会探讨
单元测试方向，因为单测已经有完善的工具体系。但前端开发中，除了一些框架和库，愿意去写单测的少之又少。另外单测维护成本较高，而且也没法满足前端测试的所有需求。 用户可以基于 tag 来快速筛选感兴趣的文章，文章也可以依照 而且人工设置难免不规范和不完全。`
      },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list{
  padding: 0 20px
}
</style>
