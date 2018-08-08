<template>
    <div style="width:800px">
        <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="接口地址">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="接口方法">
                <el-select v-model="form.method" placeholder="">
                    <el-option label="AddUser" value="AddUser"></el-option>
                    <el-option label="HelloWorld" value="HelloWorld"></el-option>
                    <el-option label="GetTerminal" value="GetTerminal"></el-option>
                    <el-option label="GetClassifyList" value="GetClassifyList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求数据">
                <el-input type="json" v-model="form.date1"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onPost">POST</el-button>
            </el-form-item>
        </el-form>
        <el-input type="textarea" :rows="5" placeholder="输出结果" v-model="resultData">
        </el-input>
    </div>
</template>

<script>
import Qs from "qs";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        url: "http://localhost:43399/HedaWeb/TerminalController.asmx/",
        method: "GetClassifyList",
        date1: ""
      },
      info: {
        json: "aaa"
      },
      resultData: "",
    };
  },
  computed: {
    info1: {
      get: function() {

        return {json:Qs.stringify(this.form)};
      },
      // setter
      set: function(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
  },
  methods: {
    onPost() {
      let aaa = this;
      axios
        .post(this.form.url+this.form.method, Qs.stringify(this.info1))
        .then(response => {
          console.log("成功！");
          // console.log(response.data);
          console.log(JSON.stringify(response.data));

          this.resultData = JSON.stringify(Qs.parse(response.data));
        })
        .catch(error => {
          console.log("失败！");
          console.log(error);
          this.resultData = JSON.stringify(error);
        });
    }
  }
};
</script>