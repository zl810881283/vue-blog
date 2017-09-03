<template>
  <div class="article-item">
    <h3>{{data.title}}</h3>
    <div class="desc">
        <span class="target">{{data.tags && data.tags.map(i=>i.name).join(",")}}</span>
        <span class="cricle"></span>
        <span class="date">{{data.createdAt | datetime('YYYY/MM/DD')}}</span>
        <span class="cricle"></span>
        <span class="click-times">浏览 {{data.clickTimes}}</span>
    </div>
    <div class="content" v-if="showDetail" v-html="data.content"></div>
    <div class="content" v-if="!showDetail" v-html="data.content"></div>
    
    <div v-if="!showDetail"class="view-article"><router-link :to="`/article/${data.id}`">查看文章</router-link></div>
  </div>
</template>

<script>
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    data: {
      required: true,
      type: [Object, Array]
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.article-item{
    h3 {
        text-align center
    }
    .desc{
        display flex
        justify-content center
        align-items center
        .cricle{
             display block
             height: 4px
             width: 4px
             background-color black
             border-radius 50%
        }
        .target,.date,.click-times{
            color: gray
            font-size 14px
            margin 0 5px
        }
    }
    .content{
        margin-top 20px
        line-height 1.5
    }
    .view-article{
        margin 20px
        text-align center
        a{
            color: #000
            text-decoration: none

            &:after{
                content:"|"
                display inline-block
                margin 0 10px
                font-weight 700
            }
            &:before{
                content:"|"
                display inline-block
                margin 0 10px
                font-weight 700
            }
        }
    }
}
</style>
