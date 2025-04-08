<template>
  <div class="register-container">
    <div class="register">
      <div class="header">
        <HeaderLine :title="'ลงทะเบียน'" />
      </div>
      <div class="form text-left mt-3">
        <InputText
          :textFloat="'อีเมล'"
          :type="'text'"
          placeholder="อีเมล"
          v-model="formData.email"
          isRequired
          :is-validate="formData.isEmailErr"
          :text-validate="formData.errorEmail"
        />
        <div class="text-danger mb-0">{{ formData.error }}</div>
        <div>
          <InputText
            :textFloat="'รหัสผ่าน'"
            :type="'text'"
            placeholder="รหัสผ่าน"
            v-model="formData.password"
            isRequired
            :detail="'*รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9 ควรมีความยาวไม่ต่ำกว่า 6 ตัว'"
            :is-validate="formData.isPasswordErr"
            :text-validate="formData.errorPassword"
          />
          <div class="text-danger mb-0">{{ formData.error }}</div>
        </div>
        <InputText
          :textFloat="'ยืนยันรหัสผ่าน'"
          :type="'text'"
          placeholder="ยืนยันรหัสผ่าน"
          v-model="formData.confirmPassword"
          isRequired
          :is-validate="formData.isConfirmPassErr"
          :text-validate="formData.errorPassword"
        />
        <div class="text-danger mb-0">{{ formData.error }}</div>
        <div>
          <div class="required">วันเกิด</div>
          <div class="d-flex gap-3 width-100">
            <InputDropdown
              v-model="formData.day"
              :options="options.days"
              :clearable="false"
              :searchable="false"
              placeholder="วัน"
              :reduce="(option) => option.value"
              :is-validate="formData.isDayErr"
              class="width-100"
            />
            <InputDropdown
              v-model="formData.month"
              :options="options.months"
              :clearable="false"
              :searchable="false"
              placeholder="เดือน"
              :reduce="(option) => option.value"
              :is-validate="formData.isMonthErr"
              class="width-100"
            />
            <InputDropdown
              v-model="formData.year"
              :options="options.years"
              :clearable="false"
              :searchable="false"
              placeholder="ปี"
              :reduce="(option) => option.value"
              :is-validate="formData.isYearErr"
              class="width-100"
            />
          </div>
        </div>
        <div class="mt-3">
          <div class="d-flex gap-2">
            <div class="required">เพศ</div>
            <div
              v-for="gender in [
                { value: 1, label: 'ชาย' },
                { value: 2, label: 'หญิง' },
              ]"
              :key="gender.value"
            >
              <div
                class="d-flex justify-content-center align-items-center gap-1"
              >
                <input
                  type="radio"
                  :value="gender.value"
                  :id="`gender-${gender.value}`"
                  :name="`gender`"
                  v-model="formData.gender"
                  class="click input-radio"
                />
                <label>{{ gender.label }}</label>
              </div>
            </div>
          </div>
          <div v-if="formData.isGenderErr">
            <span class="text-error">{{ "กรุณากรอกข้อมูล" }}</span>
          </div>
        </div>
        <div class="term-condition d-flex gap-2 mt-3">
          <label class="custom-checkbox d-flex align-items-center">
            <input type="checkbox" v-model="formData.isAgree" />
            <span class="checkmark"></span>
          </label>
          <div>
            ยอมรับข้อกำหนดและเงื่อนไขในการใช้งาน
            <span class="underline click">เพิ่มเติม</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <CustomButton
          :label="'ลงทะเบียน'"
          :is-disabeld="!formData.isAgree"
          @click="register"
        />
        <div class="desc">
          <span>เป็นสมาชิกแล้ว?</span
          ><span class="underline click" @click="$router.push('/login')"
            >เข้าสู่ระบบ</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import CustomButton from "@/components/CustomButton.vue";
import InputText from "@/components/InputText.vue";
import InputDropdown from "@/components/InputDropdown.vue";

import { mapActions } from "vuex";

export default {
  name: "RegisterView",
  components: {
    HeaderLine,
    CustomButton,
    InputText,
    InputDropdown,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        day: "",
        month: "",
        year: "",
        gender: "",
        isAgree: false,

        isEmailErr: false,
        isPasswordErr: false,
        isConfirmPassErr: false,
        isDayErr: false,
        isMonthErr: false,
        isYearErr: false,
        isGenderErr: false,

        invalidPass: false,
        error: "",
        errorPassword: "",
        errorEmail: "",
      },
      options: {
        days: [],
        months: [
          { value: 1, label: "มกราคม" },
          { value: 2, label: "กุมภาพันธ์" },
          { value: 3, label: "มีนาคม" },
          { value: 4, label: "เมษายน" },
          { value: 5, label: "พฤษภาคม" },
          { value: 6, label: "มิถุนายน" },
          { value: 7, label: "กรกฎาคม" },
          { value: 8, label: "สิงหาคม" },
          { value: 9, label: "กันยายน" },
          { value: 10, label: "ตุลาคม" },
          { value: 11, label: "พฤศจิกายน" },
          { value: 12, label: "ธันวาคม" },
        ],
        years: [
          { value: 1, label: "2565" },
          { value: 2, label: "2566" },
          { value: 3, label: "2567" },
          { value: 4, label: "2568" },
          { value: 5, label: "2569" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["updateFormData"]),
    register() {
      if (
        this.formData.email &&
        this.formData.password &&
        this.formData.confirmPassword &&
        this.formData.day &&
        this.formData.month &&
        this.formData.year &&
        this.formData.gender
      ) {
        if (this.validatePassword(this.formData.password)) {
          if (this.formData.password == this.formData.confirmPassword) {
            if (this.validateEmail(this.formData.email)) {
              this.$router.push("/login");
              this.updateFormData({
                email: this.formData.email,
                password: this.formData.password,
                day: this.formData.day,
                month: this.formData.month,
                year: this.formData.year,
                gender: this.formData.gender,
              });
            } else {
              this.formData.isEmailErr = true;
            }
          } else {
            this.formData.invalidPass = true;
            this.formData.isPasswordErr = true;
            this.formData.isConfirmPassErr = true;
            this.formData.errorPassword = "รหัสผ่านไม่ตรงกัน";

            if (this.validateEmail(this.formData.email)) {
              this.formData.isEmailErr = false;
            } else {
              this.formData.isEmailErr = true;
              this.formData.errorEmail = "อีเมลไม่ถูกต้อง";
            }
          }
        } else {
          this.formData.invalidPass = true;
          this.formData.isPasswordErr = true;
          this.formData.isConfirmPassErr = true;
          this.formData.errorPassword = "รหัสผ่านไม่ถูกต้อง";

          if (this.validateEmail(this.formData.email)) {
            this.formData.isEmailErr = false;
          } else {
            this.formData.isEmailErr = true;
            this.formData.errorEmail = "อีเมลไม่ถูกต้อง";
          }
        }
      } else {
        if (this.formData.email) {
          if (this.validateEmail(this.formData.email)) {
            this.formData.isEmailErr = false;
          } else {
            this.formData.isEmailErr = true;
            this.formData.errorEmail = "อีเมลไม่ถูกต้อง";
          }
        } else {
          this.formData.isEmailErr = true;
          this.formData.errorEmail = "กรุณากรอกข้อมูล";
        }

        this.checkField("isPasswordErr", "password");
        this.checkField("isConfirmPassErr", "confirmPassword");
        this.checkField("isDayErr", "day");
        this.checkField("isMonthErr", "month");
        this.checkField("isYearErr", "year");
        this.checkField("isGenderErr", "gender");
        this.formData.errorPassword = "กรุณากรอกข้อมูล";
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
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    },
  },
  beforeMount() {
    this.options.days = Array.from({ length: 31 }, (_, index) => ({
      value: index + 1,
      label: index + 1,
    }));
  },
  watch: {
    "formData.email": function () {
      if (this.formData.email) {
        this.formData.isEmailErr = false;
      }
    },
    "formData.password": function () {
      if (this.formData.password) {
        this.formData.isPasswordErr = false;
      }
    },
    "formData.confirmPassword": function () {
      if (this.formData.confirmPassword) {
        this.formData.isConfirmPassErr = false;
      }
    },
    "formData.day": function () {
      if (this.formData.day) {
        this.formData.isDayErr = false;
      }
    },
    "formData.month": function () {
      if (this.formData.month) {
        this.formData.isMonthErr = false;
      }
    },
    "formData.year": function () {
      if (this.formData.year) {
        this.formData.isYearErr = false;
      }
    },
    "formData.gender": function () {
      if (this.formData.gender) {
        this.formData.isGenderErr = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  padding: 50px 20px 50px 20px;

  .register {
    width: 100%;

    .width-100 {
      width: 100%;
    }

    ::v-deep(.dropdown-container .custom-v-select) {
      width: 100%;
    }

    .form {
      text-align: left;
      display: flex;
      flex-direction: column;
      // gap: 5px;
      width: 100%;

      .text-error {
        color: #ff0000;
        font-size: 13px;
      }

      .custom-checkbox {
        position: relative;
        padding-left: 20px;
        margin-top: 4px;
        cursor: pointer;
        font-size: 16px;
      }

      .custom-checkbox input {
        display: none;
      }

      .custom-checkbox .checkmark {
        position: absolute;
        left: 0;
        top: 0;
        height: 18px;
        width: 18px;
        background-color: #fff;
        border: 1px solid #adb5bd;
        border-radius: 1px;
      }

      .custom-checkbox input:checked + .checkmark {
        background-color: #c9b67e;
        border: 2px solid #bcbcbc;
      }

      .custom-checkbox input:checked + .checkmark::after {
        content: "✔";
        position: absolute;
        left: 3px;
        top: 0px;
        width: 0px;
        height: 0px;
        color: #fff;
        font-size: 10px;
      }

      .input-radio {
        flex: none;
        margin-right: 10px;
        width: 15px;
        height: 15px;
        border: 2px solid white;
        box-shadow: 0 0 0 1px #e2e2e2;
        appearance: none;
        border-radius: 50%;
        cursor: pointer;
        background-color: #fff;
        transition: all ease-in 0.2s;

        &:checked {
          background-color: #fff;
          border: 5px solid #16274a;
        }

        &:disabled {
          pointer-events: none;
          background-color: #e2e2e2;
          box-shadow: none;
          &:not(:checked) {
            width: 25px !important;
            height: 25px !important;
          }
          &:checked {
            background-color: #a1a1a1;
            box-shadow: 0 0 0 1px #a1a1a1;
          }
        }
      }
    }

    .footer {
      margin-top: 50px;

      ::v-deep(.button-container) {
        height: 50px;
      }

      .desc {
        margin-top: 10px;
        font-size: 14px;

        span:first-child {
          margin-right: 5px;
          color: #bfbfbf;
        }

        span:last-child {
          font-weight: bold;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .register-container {
    padding: 50px;

    .width-100 {
      width: auto;
    }

    ::v-deep(.dropdown-container .custom-v-select) {
      width: 120px;
    }
  }
}

@media (min-width: 1200px) {
  .register-container {
    width: 100%;
    .register {
      width: 50%;
    }

    .width-100 {
      width: 100%;
    }

    ::v-deep(.dropdown-container .custom-v-select) {
      width: 100%;
    }
  }
}
</style>
