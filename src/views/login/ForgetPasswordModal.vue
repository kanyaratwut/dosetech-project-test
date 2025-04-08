<template>
  <b-modal
    v-model="isOpenModal"
    ref="forgetPasswordModal"
    hide-footer
    hide-header
    centered
  >
    <div class="forget-pass-modal">
      <div class="d-flex justify-content-end">
        <div @click="close">
          <CloseIcon class="icon-close click" />
        </div>
      </div>
      <HeaderLine
        :title="`${isSetNewPassword ? 'ตั้งรหัสผ่านใหม่' : 'ลืมรหัสผ่าน'}`"
        class="mt-2"
      />
      <div class="content mt-3">
        <InputText
          v-if="!isSetNewPassword"
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
        <div v-else>
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
          <InputText
            :textFloat="'ยืนยันรหัสผ่าน'"
            :type="'text'"
            placeholder="ยืนยันรหัสผ่าน"
            v-model="confirmPassword"
            isRequired
            :is-validate="isConfirmPassErr"
            :text-validate="`${
              inValidConfirmPass ? 'รหัสผ่านไม่ถูกต้อง' : 'กรุณากรอกข้อมูล'
            }`"
          />
        </div>
      </div>
      <div class="footer">
        <div class="d-flex justify-content-center align-items-center">
          <CustomButton
            :label="`${isSetNewPassword ? 'รีเซ็ต' : 'รีเซ็ตรหัสผ่าน'}`"
            @click="confirm"
            :class="[{ reset: isSetNewPassword }]"
          />
        </div>
        <div class="desc text-center" v-if="!isSetNewPassword">
          <span>เป็นสมาชิกแล้ว?</span
          ><span class="underline click" @click="gotoLogin">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import InputText from "@/components/InputText.vue";
import CustomButton from "@/components/CustomButton.vue";

//icon
import CloseIcon from "@/assets/image/svg/CloseIcon.vue";

import { mapActions } from "vuex";

export default {
  name: "ForgetPasswordModal",
  components: {
    HeaderLine,
    InputText,
    CustomButton,

    CloseIcon,
  },
  data() {
    return {
      isOpenModal: false,
      isSetNewPassword: false,
      email: "",
      password: "",
      confirmPassword: "",

      isEmailErr: false,
      isPasswordErr: false,
      isConfirmPassErr: false,
      inValidEmail: false,
      inValidPass: false,
      inValidConfirmPass: false,
    };
  },
  methods: {
    ...mapActions(["updateFormData"]),
    open() {
      this.isOpenModal = true;
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.isEmailErr = false;
      this.isPasswordErr = false;
      this.isConfirmPassErr = false;
      this.inValidEmail = false;
      this.inValidPass = false;
      this.inValidConfirmPass = false;
    },
    close() {
      this.$emit("close");
      this.isOpenModal = false;
    },
    confirm() {
      if (!this.isSetNewPassword) {
        if (this.email) {
          if (this.validateEmail(this.email)) {
            this.isSetNewPassword = true;
          } else {
            this.isEmailErr = true;
            this.inValidEmail = true;
          }
        } else {
          this.isEmailErr = true;
        }
      } else {
        if (this.password && this.confirmPassword) {
          if (this.password == this.confirmPassword) {
            this.isOpenModal = false;
            this.updateFormData({
              password: this.password,
            });
          } else {
            this.isConfirmPassErr = true;
            this.isPasswordErr = true;
            this.inValidPass = true;
            this.inValidConfirmPass = true;
          }
        } else {
          this.checkField("isPasswordErr", "password");
          this.checkField("isConfirmPassErr", "confirmPassword");
        }
      }
    },
    checkField(field, data) {
      if (!this[data]) {
        this[field] = true;
      } else {
        this[field] = false;
      }
    },
    gotoLogin() {
      this.close();
    },
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    },
  },
};
</script>

<style lang="scss" scoped>
.forget-pass-modal {
  padding: 0 30px;

  &:has(.reset) {
    padding: 0 30px 20px 30px;
  }

  .icon-close {
    width: 12px;
    height: 12px;
    fill: #868686;
  }
  .footer {
    margin-top: 30px;

    ::v-deep(.button-container) {
      width: 180px;

      &.reset {
        width: 150px;
        height: 46px;
        margin-top: 50px;
      }
    }

    .desc {
      padding-top: 8px;
      font-size: 14px;

      span:first-child {
        margin-right: 10px;
        color: #bfbfbf;
      }
    }
  }
}
</style>
