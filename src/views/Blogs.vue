<template>
  <div class="mcont">
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="(blog,key) in blogs" :key=key>
          <el-card>
            <h4>
                <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
                {{blog.title}}
                </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination class="mpage" background layout="prev, pager, next" 
      :current-page="currentpage" 
      :page-size="pageSize" 
      :total="total"
      @current-change=page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "Blogs.vue",
  components: { Header },
  data(){
      return {
          blogs:{},
          currentpage:1,
          total:0,
          pageSize:5
      }
  },
  methods:{
      page(currentpage){
          const _this = this
        _this.$axios.get("/blogs?currentpage=" + currentpage).then(res => {
            console.log('currentpagemessage:')
          console.log(res)
          _this.blogs = res.data.data.records
          _this.currentpage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size



          })
      }
  },
  created(){
      console.log(this.page)
      this.page(1)
  }
};
</script>
<style scoped>
 .mpage{
     margin: 0 auto;
     text-align: center;
 }
</style>