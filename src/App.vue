<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-container>
      <el-header>
        <arheader ></arheader>
      </el-header>
      <el-container>
        <el-aside style="width:205px" class="hidden-sm-and-down">
          <araside></araside>
        </el-aside>
        <el-container>
          <el-main>
            <div style="border:1px">
              <router-view/>
            </div>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import arheader from "./components/arheader";
import araside from "./components/araside";
export default {
  name: "App",
  components: {
    arheader: arheader,
    araside: araside
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 10px;
}
</style>
