<script lang="ts" setup>
import { IconGithub, IconEmail } from '@arco-design/web-vue/es/icon';
import TelegramNegative from '@/assets/icons/telegram-negative.svg'
</script>

<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" />
        <a-typography-title :style="{ margin: 0, fontSize: '23px' }" :heading="5">
          金融数据分析系统
        </a-typography-title>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <TelegramNegative :width="30" :height="30" />
      </li>
      <li>
        <IconGithub :size="30" />
      </li>
      <li>
        <IconEmail :size="30" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
