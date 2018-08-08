<template>
  <div class="hello">
    <h1 style="text-align: -webkit-left;">{{currentCify.label}}实时天气Json数据(京东云)：</h1>
    <el-tabs v-model="first.activeName" type="border-card" class="newTabs">
      <el-tab-pane label="当日天气" name="first">
        <el-row>
          <el-col :span=8 :xs=24>
            <el-row>
              <el-col :span=12 :xs=12>
                <el-select v-model="currentCify" placeholder="请选择">
                  <el-option v-for="item in cities" :key="item.value" :label="item.displayName" :value="item">
                    <span style="float: left">{{ item.displayName }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span=6 :xs=12>
                <el-button style="float:left" type="success" @click="liuxiao">天气查询</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-select v-model="currentCSS" placeholder="请选择" @input="changeCard">
                  <el-option v-for="item in CSSs" :key="item.value" :label="item.displayName" :value="item">
                    <span style="float: left">{{ item.displayName }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span=24>
                <rainCard :info="infos"></rainCard>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" :xs=24>
            <el-table :data="first.tableData" style="width: 100%" border stripe>
              <el-table-column prop="key" label="指标" width="250">
              </el-table-column>
              <el-table-column prop="value" label="指数" width="250">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="生活指数" name="second">
        <p>Element 表格 Table（动态添加数据，遍历接口Json数据）</p>
        <el-table :data="second.tableData" style="width: 100%" border stripe>
          <el-table-column prop="name" label="名称" width="250">
          </el-table-column>
          <el-table-column prop="brf" label="指数" width="250">
          </el-table-column>
          <el-table-column prop="txt" label="建议" width="500">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未来7小时天气" name="third">
        <el-carousel :interval="3000" type="card" height="400px">
          <el-carousel-item v-for="item in 7" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="未来7天天气" name="fourth">
        <el-carousel :interval="3000" height="400px">
          <el-carousel-item v-for="item in 7" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="AQI指数" name="fifth">
        <p>Element 卡片 Card</p>
        <el-card class="box-card">
          <p>AQI：{{fifth.aqi}}</p1>
            <p>PM2.5：{{fifth.pm25}}</p>
            <p>PM10：{{fifth.pm10}}</p>
            <p>经度：{{fifth.lat}} 纬度：{{fifth.lon}}</p>
        </el-card>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import Qs from "qs";
import axios from "axios";
import rainCard from "./weatherCard/rainCard.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      currentCify: {
        value: "changchun",
        displayName: "长春"
      },
      cities: [
        {
          value: "changchun",
          displayName: "长春"
        },
        {
          value: "Beijing",
          displayName: "北京"
        },
        {
          value: "Shanghai",
          displayName: "上海"
        },
        {
          value: "Nanjing",
          displayName: "南京"
        },
        {
          value: "Chengdu",
          displayName: "成都"
        },
        {
          value: "Shenzhen",
          displayName: "深圳"
        },
        {
          value: "Guangzhou",
          displayName: "广州"
        }
      ],
      currentCSS: {
        value: "",
        night: false,
        displayName: ""
      },
      CSSs: [
        {
          value: "晴",
          night: false,
          displayName: "晴朗"
        },
        {
          value: "雷",
          night: false,
          displayName: "雷天"
        },
        {
          value: "雨",
          night: false,
          displayName: "雨天"
        },
        {
          value: "雪",
          night: false,
          displayName: "雪"
        },
        {
          value: "夜",
          night: true,
          displayName: "夜晚"
        }
      ],
      first: {
        //静态处理
        tableData: [
          {
            key: "天气状况", //cond
            value: ""
          },
          {
            key: "感冒指数", //fl
            value: ""
          },
          {
            key: "能见度", //vis
            value: ""
          },
          {
            key: "相对湿度", //hum
            value: ""
          },
          {
            key: "温度", //tmp
            value: ""
          },
          {
            key: "降水量", //pcpn
            value: ""
          },
          {
            key: "大气压", //pres
            value: ""
          },
          {
            key: "风", //wind: [], deg	：风向（360度）  sc：风力等级  dir：风向    spd：风速
            value: []
          }
        ],
        activeName: "first"
      },
      second: {
        //动态添加
        tableData: []
      },
      third: {
        tableData: []
      },
      fifth: {
        aqi: "N/A",
        pm25: "N/A",
        pm10: "N/A",
        lat: "N/A",
        lon: "N/A"
      },
      infos: {
        wendu: "N/A",
        tianqi: "晴",
        night: false,
        max: "",
        min: "",
        tq: ""
      }
    };
  },
  components: {
    rainCard: rainCard
  },
  computed: {
    info: function() {
      {
        return {
          city: this.currentCify.value,
          appkey: "aec7b8ed50a53d2f997787273a3d5945"
        };
      }
    }
  },
  created: function() {
    this.liuxiao();
  },
  methods: {
    changeCard: function(obj) {
      this.infos.tianqi = obj.value;
      this.infos.night = obj.night;
      return this.infos;
    },
    liuxiao: function() {
      // this.$http.post("freeweather", Qs.stringify(this.info)).then(
      this.$http
        .post("api/he/freeweather", Qs.stringify(this.info))
        .then(response => {
          // console.log("请求响应：");
          // console.log(response);
          //当日天气
          this.first.tableData[0].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.cond.txt;
          this.first.tableData[1].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.fl;
          this.first.tableData[2].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.vis;
          this.first.tableData[3].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.hum;
          this.first.tableData[4].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.tmp;
          this.first.tableData[5].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.pcpn;
          this.first.tableData[6].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.pres;
          this.first.tableData[7].value = Qs.parse(
            response.data
          ).result.HeWeather5[0].now.wind.sc;
          //生活指数
          let suggestion = Qs.parse(response.data).result.HeWeather5[0]
            .suggestion;
          let ss = this.second;
          // console.log(suggestion);
          Object.keys(suggestion).forEach(function(key, value) {
            // console.log(key);
            // console.log(value);
            // console.log(suggestion[key].brf);
            var name = "";
            switch (key) {
              case "air":
                name = "户外活动指数";
                break;
              case "comf":
                name = "舒适度指数";
                break;
              case "cw":
                name = "洗车指数";
                break;
              case "drsg":
                name = "穿衣指数";
                break;
              case "flu":
                name = "感冒指数";
                break;
              case "sport":
                name = "运行指数";
                break;
              case "trav":
                name = "行车指数";
                break;
              case "uv":
                name = "防晒指数";
                break;
              default:
                break;
            }
            ss.tableData.push({
              brf: suggestion[key].brf,
              txt: suggestion[key].txt,
              name: name
            });
          });
          // //API指数
          this.fifth.aqi = Qs.parse(
            response.data
          ).result.HeWeather5[0].aqi.city.aqi;
          this.fifth.pm25 = Qs.parse(
            response.data
          ).result.HeWeather5[0].aqi.city.pm25;
          this.fifth.pm10 = Qs.parse(
            response.data
          ).result.HeWeather5[0].aqi.city.pm10;
          this.fifth.lat = Qs.parse(
            response.data
          ).result.HeWeather5[0].basic.lat;
          this.fifth.lon = Qs.parse(
            response.data
          ).result.HeWeather5[0].basic.lon;
          this.msg = Qs.parse(response.data).result.HeWeather5[0].now;
          console.log(Qs.parse(response.data).result.HeWeather5);

          //缓存当天天气状态
          if (this.first.tableData[0].value.indexOf("雨") != -1) {
            this.infos.tianqi = "雨";
          } else if (this.first.tableData[0].value.indexOf("雷") != -1) {
            this.infos.tianqi = "雷";
          } else if (this.first.tableData[0].value.indexOf("雪") != -1) {
            this.infos.tianqi = "雪";
          } else {
            this.infos.tianqi = "晴";
          }
          this.infos.tq = this.first.tableData[0].value;
          //缓存当前温度
          this.infos.wendu = this.first.tableData[4].value;
          this.infos.max = Qs.parse(
            response.data
          ).result.HeWeather5[0].daily_forecast[0].tmp.max;
          this.infos.min = Qs.parse(
            response.data
          ).result.HeWeather5[0].daily_forecast[0].tmp.min;

          this.currentCSS.value = this.infos.tianqi;
          if (new Date().getHours > 18 || new Date().getHours < 6) {
            this.infos.night = true;
          }
          this.currentCSS.night = this.infos.night;
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
/* .newTabs {
  width: auto;
}
h1,
h2 {
  font-weight: normal;
} */
/* ul {
  list-style-type: none;
  padding: 0;
} */
/* li {
  display: inline-block;
  margin: 0 10px;
} */
/* a {
  color: #42b983;
}

.text {
  font-size: 14px;
} */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 800px;
}
</style>
