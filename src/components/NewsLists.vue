<template>
  <div>
    <el-card class="box-card">
      <el-form ref="info" :model="info" label-width="200px" label-position="right" label-suffix="：">
        <el-form-item label="微信公众号">
          <el-select v-model="info.account" placeholder="请选择微信公众号：">
            <el-option label="人民日报" value="rmrbwx"></el-option>
            <el-option label="新榜" value="newrankcn"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-col>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dataValue" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="分页数量">
          <el-input-number v-model="info.page" :min="1" :max="1" label="分页数量"></el-input-number>
        </el-form-item>
        <el-form-item label="文章数量">
          <el-input-number v-model="info.size" :min="1" :max="10" label="文章数量"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="liuxiao">查询</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <h3 style="text-align: -webkit-left;">公众号文章列表:</h3>
    <el-row>
      <el-col :span="4" v-for="(obj, index) in data" :key="obj" :offset="index > 0 ? 2 : 0">
        <el-card shadow="always" :body-style="{ padding: '0px' ,height:'350px'}">
          <p>{{obj.title}}</p>
          <img :src="obj.imageUrl" class="image">
          <div style="padding: 14px;">
            <span class="newSpan">{{obj.summary}}</span>
            <div class="bottom clearfix">
              <a target="_blank" :href="obj.url">原文链接</a>
              <time class="time">{{ obj.publicTime }}</time>
              <el-button type="text" class="button" @click="liuxiao">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      info: {
        account: "rmrbwx",
        from: "2018-06-25 00:00:00",
        to: "2018-07-25 00:00:00",
        page: 1,
        size: 1
      },
      data: []
    };
  },
  computed: {
    // 计算属性的 getter
    dataValue: {
      get: function() {
        return [this.info.from, this.info.to];
      },
      // setter
      set: function(newValue) {
        this.info.from = newValue[0];
        this.info.to = newValue[1];
      }
    }
  },
  created: function() {
    // this.$http
    //   .post("newrank/api/sync/weixin/account/articles", Qs.stringify(this.info))
    //   .then(response => {
    //     let dataTemp = Qs.parse(response.data).data;
    //     this.data = dataTemp;
    //     console.log(this.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  methods: {
    liuxiao: function() {
      this.$http
        .post(
          "newrank/api/sync/weixin/account/articles",
          Qs.stringify(this.info)
        )
        .then(response => {
          let dataTemp = Qs.parse(response.data).data;
          console.log(dataTemp);
          this.data = dataTemp;
          console.log(this.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 230px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.newSpan {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.newForm {
  height: 100%;
  width: 600px;
}
.box-card {
    width: 800px;
  }
</style>
