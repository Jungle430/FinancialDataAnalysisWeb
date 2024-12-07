<script lang="ts" setup>
import { login } from '@/apis/user';
import router from '@/router';
import { TokenStore } from '@/stores/tokenStore';
import { PHONE_REGEX } from '@/utils/toolUtil';
import { reactive, ref } from 'vue';

const loginRequest = reactive({
  phone: '',
  password: '',
});

const rules = reactive({
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    {
      pattern: PHONE_REGEX,
      message: '请输入正确的手机号码!',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码长度至少为5位!', trigger: 'blur' },
  ],
});

const loading = ref(false);


const tokenStore = TokenStore();
const handleLogin = () => {
  login(loginRequest.phone, loginRequest.password)
    .then(res => {
      tokenStore.setToken(res.data.token);
      console.log(tokenStore.getToken());
      router.push("/");
    })
    .catch(err => { console.error(err) })
};
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">金融数据分析系统</h2>
    <el-form :model="loginRequest" :rules="rules" label-width="80px">
      <el-form-item label="电话号码" prop="phone">
        getToken<el-input v-model="loginRequest.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginRequest.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <!-- 包裹登录按钮的 div 使按钮居中 -->
      <div class="button-container">
        <el-button type="primary" @click="handleLogin" :loading="loading">
          登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login-container {
  width: 50%;
  max-width: 1000px;
  min-width: 400px;
  padding: 8% 10%;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-title {
  width: 100%;
  text-align: center;
  margin-bottom: 10%;
  font-size: 2.0em;
  color: #333;
}

el-form {
  width: 100%;
}

el-form-item {
  width: 100%;
  margin-bottom: 20px;
  /* 增加间距，避免过于拥挤 */
  font-size: 2.0em;
}

el-input {
  width: 100%;
  padding: 10px 12px;
  /* 调整输入框内边距 */
  font-size: 20px;
  /* 调整文字大小 */
  line-height: 1.8;
  /* 让文字更舒适 */
}

.button-container {
  display: flex;
  justify-content: center;
  /* 使按钮居中 */
  width: 100%;
}

el-button {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  border-radius: 8px;
}
</style>
