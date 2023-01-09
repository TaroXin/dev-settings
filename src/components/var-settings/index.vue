<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="var-settings-container">
    <van-form>
      <van-cell-group title="变量设置">
        <van-cell title="Debug Mode">
          <template #right-icon>
            <van-switch v-model="checked" />
          </template>
        </van-cell>

        <van-field
          label="高拍仪IP"
          placeholder="请输入高拍仪IP"
          input-align="right"
          maxlength="15"
        />
      </van-cell-group>

      <div class="action-wrap">
        <van-space>
          <van-button type="primary" native-type="submit" size="small">
            保存设置
          </van-button>
          <van-button type="warning" size="small">
            从文件中加载
          </van-button>
        </van-space>
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
.action-wrap {
  text-align: center;
  padding: 10px;
}
</style>
