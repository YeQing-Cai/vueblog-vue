<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="content markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import "github-markdown-css/github-markdown.css";
import Header from "../components/Header";
export default {
  name: "BlogDetail.vue",
  //import 引入的组件需要注入到对象中才能使用
  components: { Header },
  props: {},
  data() {
    //这里存放数据
    return {
      blog: {
        id: "",
        title: "标题",
        content: "内容",
      },
      ownBlog:false
    };
  },

  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    const blogId = this.$route.params.blogId;

    console.log(blogId);
    const _this = this;
    this.$axios.get("/blog/" + blogId).then((res) => {
      const blog = res.data.data;
      console.log(blog);
      _this.blog.id = blog.id;
      _this.blog.title = blog.title;
      _this.blog.description = blog.description;

      var MarkdownIt = require("markdown-it");
      var md = new MarkdownIt();
      var result = md.render(blog.content);

      _this.blog.content = result;
      _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
    });
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {},
};
</script>
<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>