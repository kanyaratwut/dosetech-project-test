<template>
  <div class="login-container">
    <div class="login">
      <div class="header">
        <HeaderLine :title="'เข้าสู่ระบบ'" />
      </div>
      <div class="form mt-3">
        <InputText
          :textFloat="'อีเมล'"
          :type="'text'"
          placeholder="อีเมล"
          v-model="email"
          isRequired
          :is-validate="isEmailErr"
          :text-validate="`${
            inValidEmail ? 'อีเมลไม่ถูกต้อง' : 'กรุณากรอกข้อมูล'
          }`"
        />
        <InputText
          :textFloat="'รหัสผ่าน'"
          :type="'text'"
          placeholder="รหัสผ่าน"
          v-model="password"
          isRequired
          :is-validate="isPasswordErr"
          :text-validate="`${
            inValidPass ? 'รหัสผ่านไม่ถูกต้อง' : 'กรุณากรอกข้อมูล'
          }`"
        />
        <div
          class="text-end underline click forget-password"
          @click="$refs.forgetPasswordModal.open()"
        >
          ลืมรหัสผ่าน ?
        </div>
      </div>
      <div class="footer">
        <CustomButton :label="'เข้าสู่ระบบ'" @click="login" />
        <div class="desc">
          <span>ลูกค้าใหม่?</span
          ><span class="underline click" @click="$router.push('/register')"
            >สมัครสมาชิก</span
          >
        </div>
      </div>
    </div>
    <ForgetPasswordModal ref="forgetPasswordModal" />
    <WarningModal ref="warningModal" :title="'อีเมลหรือรหัสผ่านไม่ถูกต้อง'" />
  </div>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import CustomButton from "@/components/CustomButton.vue";
import InputText from "@/components/InputText.vue";
import ForgetPasswordModal from "./login/ForgetPasswordModal.vue";
import WarningModal from "./modal/WarningModal.vue";

export default {
  name: "HomeView",
  components: {
    HeaderLine,
    CustomButton,
    InputText,
    ForgetPasswordModal,
    WarningModal,
  },
  data() {
    return {
      email: "",
      password: "",

      isEmailErr: false,
      isPasswordErr: false,
      inValidEmail: false,
      inValidPass: false,
    };
  },
  methods: {
    login() {
      if (!this.email) {
        this.isEmailErr = true;
      } else {
        this.isEmailErr = false;
      }

      if (!this.password) {
        this.isPasswordErr = true;
      } else {
        this.isPasswordErr = false;
      }

      if (this.email && this.password) {
        if (
          this.validateEmail(this.email) &&
          this.validatePassword(this.password)
        ) {
          this.isEmailErr = false;
          this.isPasswordErr = false;
          this.inValidEmail = false;
          this.inValidPass = false;
          if (
            this.email == this.$store.state.formData.email &&
            this.password == this.$store.state.formData.password
          ) {
            this.$router.push("/home");
          } else {
            this.$refs.warningModal.open();
          }
        } else {
          if (!this.validateEmail(this.email)) {
            this.isEmailErr = true;
            this.inValidEmail = true;
          } else {
            this.isEmailErr = false;
          }

          if (!this.validatePassword(this.password)) {
            this.isPasswordErr = true;
            this.inValidPass = true;
          } else {
            this.isPasswordErr = false;
          }
        }
      } else if (this.email || this.password) {
        this.inValidPass = false;
        this.inValidEmail = false;

        if (this.email) {
          if (this.validateEmail(this.email)) {
            this.isEmailErr = false;
            this.inValidEmail = false;
          } else {
            this.isEmailErr = true;
            this.inValidEmail = true;
          }
        } else {
          this.isEmailErr = true;
          this.inValidEmail = false;
        }

        if (this.password) {
          if (this.validatePassword(this.email)) {
            this.isPasswordErr = false;
            this.inValidPass = false;
          } else {
            this.isPasswordErr = true;
            this.inValiinValidPassdEmail = true;
          }
        } else {
          this.isPasswordErr = true;
          this.inValidPass = false;
        }
      } else {
        this.isEmailErr = true;
      }
    },
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    },
    validatePassword(password) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[1-9])[a-z1-9]{6,}$/;
      return passwordPattern.test(password);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  padding: 50px 20px 50px 20px;

  .login {
    width: 100%;
    .form {
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;

      .forget-password {
        font-size: 12px;
        margin-top: 5px;
        color: #8e959b;
      }
    }

    .footer {
      margin-top: 50px;

      ::v-deep(.button-container) {
        height: 50px;
      }

      .desc {
        margin-top: 10px;
        font-size: 12px;

        span:first-child {
          margin-right: 10px;
          color: #bfbfbf;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .login-container {
    width: 100%;
    .login {
      width: 50%;
    }
  }
}

@media (min-width: 1200px) {
  .login-container {
    width: 100%;
    .login {
      width: 50%;
    }
  }
}

@media (min-width: 1400px) {
  .login-container {
    width: 100%;
    .login {
      width: 30%;
    }
  }
}
</style>
