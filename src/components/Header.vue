<template>
  <div class="m-content">
    header
    <h3>欢迎来到StudyDog的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <div>
      <div class="maction">
        <span><el-link href ="/blogs">主页</el-link></span>
        <el-divider direction="vertical"></el-divider>
        <span><el-link type="success" href ="/blog/add">发表文章</el-link></span>

        <el-divider direction="vertical"></el-divider>
        <span v-show="!hasLogin"><el-link type="info" href ="/login">登录</el-link></span>

    
        <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json

//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "Header",
  data() {
    return {
      user: {
        username: "",
        avatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      hasLogin:false
    };
  },
  methods:{
      logout(){
          const _this = this
          _this.$axios.get("/logout",{
              headers:{
                  "Authorization":localStorage.getItem("token")
              }
          }).then(res=>{
              _this.$store.commit("REMOVE_USERINFO")
              _this.$router.push("/login")
          })
      }
  },
  created(){
     if(this.$store.getters.getUser.username) {
        this.user.username = this.$store.getters.getUser.username
        this.user.avatar = this.$store.getters.getUser.avatar
        this.hasLogin = true
      }

  }
};
</script>
<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction {
margin: 10px 0;
}
</style>