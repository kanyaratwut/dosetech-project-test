<template>
  <div class="change-password-container text-start h-100 w-100">
    <HeaderLine :title="'เปลี่ยนรหัสผ่าน'" />
    <div class="content mt-3">
      <b-row>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'รหัสผ่านปัจจุบัน'"
            :type="'text'"
            placeholder="รหัสผ่านปัจจุบัน"
            v-model="formData.currentPassword"
            isRequired
            :is-validate="formData.isCurrentPassErr"
            :text-validate="'กรุณากรอกข้อมูล'"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'รหัสผ่านใหม่'"
            :type="'text'"
            placeholder="รหัสผ่านใหม่"
            v-model="formData.newPassword"
            isRequired
            :is-validate="formData.isNewPassErr"
            :text-validate="formData.error"
          />
        </b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'ยืนยันรหัสผ่าน'"
            :type="'text'"
            placeholder="ยืนยันรหัสผ่าน"
            v-model="formData.confirmPassword"
            isRequired
            :is-validate="formData.isConfirmPassErr"
            :text-validate="formData.error"
          />
        </b-col>
      </b-row>
    </div>
    <div class="footer d-flex justify-content-center align-items-center">
      <CustomButton :label="'บันทึก'" @click="save" />
    </div>
    <WarningModal ref="warningModal" :type="'Success'" :title="'บันทึกสำเร็จ'"/>
  </div>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import InputText from "@/components/InputText.vue";
import CustomButton from "@/components/CustomButton.vue";

import WarningModal from "@/views/modal/WarningModal.vue";

import { mapActions } from "vuex";

export default {
  components: {
    HeaderLine,
    InputText,
    CustomButton,
    WarningModal
  },
  data() {
    return {
      formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",

        isCurrentPassErr: false,
        isNewPassErr: false,
        isConfirmPassErr: false,

        error: "",
      },
    };
  },
  methods: {
    ...mapActions(["updateFormData"]),
    save() {
      if (
        this.formData.currentPassword &&
        this.formData.newPassword &&
        this.formData.confirmPassword
      ) {
        if (this.formData.newPassword == this.formData.confirmPassword) {
          this.formData.isNewPassErr = false;
          this.formData.isConfirmPassErr = false;
          this.updateFormData({
            password: this.formData.newPassword,
          });
          this.$refs.warningModal.open();
        } else {
          this.formData.isNewPassErr = true;
          this.formData.isConfirmPassErr = true;
          this.formData.error = "รหัสผ่านไม่ตรงกัน";
        }
      } else {
        this.checkField("isCurrentPassErr", "currentPassword");
        this.checkField("isNewPassErr", "newPassword");
        this.checkField("isConfirmPassErr", "confirmPassword");
        this.formData.error = "กรุณากรอกข้อมูล";
      }
    },
    checkField(field, data) {
      if (!this.formData[data]) {
        this.formData[field] = true;
      } else {
        this.formData[field] = false;
      }
    },
    validatePassword(password) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[1-9])[a-z1-9]{6,}$/;
      return passwordPattern.test(password);
    },
  },
  watch: {
    "formData.currentPassword": function () {
      if (this.formData.currentPassword) {
        this.formData.isCurrentPassErr = false;
      }
    },
    "formData.newPassword": function () {
      if (this.formData.newPassword) {
        this.formData.isNewPassErr = false;
      }
    },
    "formData.confirmPassword": function () {
      if (this.formData.confirmPassword) {
        this.formData.isConfirmPassErr = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.change-password-container {
  border: 1px solid #efefef;
  padding: 15px 10px;
  font-size: 17px;

  @media (min-width: 768px) {
    border-left: 1px solid #e9e9e9;
    padding-left: 5px;
    border-right: none;
    border-top: none;
    border-bottom: none;
    padding: 0 20px;
  }

  .footer {
    margin-top: 40px;
  }
}
</style>
