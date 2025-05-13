<script lang="ts" setup>
import { login } from '@/apis/user';
import { TokenStore } from '@/stores/tokenStore';
import { PHONE_REGEX } from '@/utils/toolUtil';
import { type FormInstance, type FormRules } from 'element-plus';
import { Lock, User } from "@element-plus/icons-vue"
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Owl from "@/views/Login/components/Owl.vue"
import { useFocus } from '@/views/Login/composables/useFocus';
import { goto } from '@/utils/routerUtils';

const router = useRouter();

const { isFocus, handleBlur, handleFocus } = useFocus()


const loginFormRef = ref<FormInstance | null>(null);
const loading = ref(false);

const loginFormData = reactive({
  phone: '',
  password: ''
});

const loginFormRules: FormRules = {
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
};

const handleLogin = () => {
  login(loginFormData.phone, loginFormData.password)
    .then(res => {
      TokenStore().setToken(res.data.token);
      goto({ name: 'stock' })
    })
    .catch(err => {
      console.error(err);
    });
};

</script>

<template>
  <div class="login-container">
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/images/layouts/logo-text-2.png">
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="phone">
            <el-input v-model.trim="loginFormData.phone" placeholder="电话号码" type="text" tabindex="1" :prefix-icon="User"
              size="large" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="loginFormData.password" placeholder="密码" type="password" tabindex="2"
              :prefix-icon="Lock" size="large" show-password @blur="handleBlur" @focus="handleFocus" />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
