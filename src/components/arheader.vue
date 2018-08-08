<template>
  <div>
    <!-- <h4>这里可以路由切换：</h4> -->
    <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.name" >
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        { name: "/HelloWorld", navItem: "长春天气查询页" },
        { name: "/NewsLists", navItem: "公众号查询页" },
        { name: "/hedaweb", navItem: "卢迪测试" },
        { name: "/UITest", navItem: "UI 测试页" }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>