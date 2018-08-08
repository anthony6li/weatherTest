<template>
    <div>
        <h1>下方为Ui测试区</h1>
        <el-row class="newTabs">
            <div class="block">
                <span class="demonstration">element-ui Button显示默认颜色</span>
                <span class="wrapper">
                    <el-button type="success">Success</el-button>
                    <el-button type="warning">Warning</el-button>
                    <el-button type="danger">Danger</el-button>
                    <el-button type="info">Info</el-button>
                </span>
            </div>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-radio v-model="radio" label="1">备选项</el-radio>
                <el-radio v-model="radio" label="2">备选项</el-radio>
            </el-col>
            <el-col :span="4">
                <span class="demonstration">有默认值</span>
                <el-color-picker v-model="color"></el-color-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-transfer v-model="value1" :data="data"></el-transfer>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="6">
                <el-progress :percentage="0"></el-progress>
                <el-progress :percentage="70"></el-progress>
                <el-progress :percentage="80" color="#8e71c7"></el-progress>
                <el-progress :percentage="100" status="success"></el-progress>
                <el-progress :percentage="50" status="exception"></el-progress>
            </el-col>
            <el-col :span="6">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-progress type="circle" :percentage="0"></el-progress>
                <el-progress type="circle" :percentage="25"></el-progress>
                <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
                <el-progress type="circle" :percentage="100" status="success"></el-progress>
                <el-progress type="circle" :percentage="50" status="exception"></el-progress>
            </el-col>
        </el-row>
        <el-row>
            <div class="block">
                <span class="demonstration">Pagination 分页 大于 7 页时的效果</span>
                <el-pagination layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      color: "#409EFF",
      radio: "1",
      data: generateData(),
      value1: [1, 4]
    };
  }
};
</script>

<style>
</style>
