<template>
   
  <div>
       
    <el-container>
           
      <el-header>
               
        <router-link to="/blogs">
                 
          <img
            src="https://i0.hdslb.com/bfs/face/572241ee6faaa5819961e33e832752e7cbfa6f95.jpg@240w_240h_1c_1s.webp"
            style="height: 60%; margin-top: 10px"
          />
                 
        </router-link>
             
      </el-header>
           
      <el-main>
               
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
                   
          <el-form-item label="用户名" prop="username">
                       
            <el-input
              type="text"
              maxlength="12"
              v-model="ruleForm.username"
            ></el-input>
                     
          </el-form-item>
                   
          <el-form-item label="密码" prop="password">
                       
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
                     
          </el-form-item>
                   
          <el-form-item>
                       
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
                       
            <el-button @click="resetForm('ruleForm')">重置</el-button>          
          </el-form-item>
                 
        </el-form>
             
      </el-main>
         
    </el-container>
     
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "111111",
        username: "markerhub",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      try {
        this.$refs[formName].validate(async (valid) => {
          // 对ref为ruleForm的form表单进行rules的规则验证，返回验证结果valid=>true/false
          // async (valid) => {}是箭头函数的写法async function FuncationName(valid)
          // async|(异步) function|(函数) FuncationName(valid)|(函数名(入参对象)) {}
          if (valid) {
            // 提交逻辑
            const res = await this.$axios.post("/login", this.ruleForm); //进行hhtps请求往后端请求
            // api接口'/login', 请求参数this.ruleForm对象
            // 异步请求成功后执行后面代码，失败不执行，会被catch抓到抛出的错误，具体方法查看axios.js封装的处理方法(我注释说明了)
            // console.log(res.headers)
            // console.log(res)
            const jwt=res.headers["authorization"]//头文件判断
            const userInfo=res.data.data
            console.log(userInfo)
            //const token = res.headers["authorization"];
            this.$store.commit("SET_TOKEN", jwt);
            this.$store.commit("SET_USERINFO", userInfo);
            // vuex保存信息
            this.go("blogs");// 路由跳转(main.js全局混入)
          } else {
            console.log("error submit!!"); // 表单验证错误
            return false;
          }
       });
      } catch (e) {
        console.log(e.message || e); // 错误内容
        console.log("api error!!"); // try{}内代码执行错误
      }
    },
    // submitForm(formName) {
    //   const _this = this;
    //   this.$refs[formName].validate((valid) => {
    //     // 对ref为ruleForm的form表单进行rules的规则验证，返回验证结果valid=>true/false
    //     if (valid) {
          
    //       // 提交逻辑
    //       this.$axios
    //         .post("/login", this.ruleForm)//进行hhtps请求往后端请求
    //         // api接口'/login', 请求参数this.ruleForm对象
    //         .then((res) => {//后端发送回来的内容
    //         // 异步请求成功后执行，失败不执行，具体方法查看axios.js封装的处理方法(我注释说明了)
    //             // console.log(res.headers)
    //             // console.log(res)
    //             const jwt=res.headers["authorization"]//头文件判断
    //             const userInfo=res.data.data
    //             console.log(userInfo)
    //           //const token = res.headers["authorization"];
    //           _this.$store.commit("SET_TOKEN", jwt);
    //           _this.$store.commit("SET_USERINFO", userInfo);
    //           // vuex保存信息
    //           _this.$router.push("/blogs");// 路由跳转
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.$notify({
      title: "看这里：",
      message: "关注公众号：MarkerHub，回复【vueblog】，领取项目资料与源码",
      duration: 1500,
    });
  },
};
</script>


<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}
.mlogo {
  height: 80%;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>
