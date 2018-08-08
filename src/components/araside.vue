<template >
  <div >
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false" v-if="isCollapse" >展开</el-radio-button>
      <el-radio-button :label="true" v-if="!isCollapse" >收起</el-radio-button>
    </el-radio-group>
    <el-menu :default-active="this.$route.path" router mode="vertical" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.navItem}}</span>
        <!-- {{item.navItem}} -->
      </el-menu-item>
    </el-menu>
    <!-- <router-link to="/HelloWorld">长春天气</router-link>
        <router-link to="/NewsLists">公众号文章更新列表</router-link>
        <router-link to="/hedaweb">HedaWeb测试</router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,

      navList: [
        { name: "/HelloWorld", navItem: "长春天气查询页" },
        { name: "/NewsLists", navItem: "公众号查询页" },
        { name: "/hedaweb", navItem: "卢迪测试" },
        { name: "/UITest", navItem: "UI测试页" },
        { name: "/login", navItem: "Login页测试" }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 190px;
  min-height: 400px;
}
.el-radio-group {
  margin-bottom: 5px;
  margin-top: 10px;
  text-align:'left';
}
</style>