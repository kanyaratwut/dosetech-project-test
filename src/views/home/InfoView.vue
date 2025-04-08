<template>
  <div class="info-container text-start h-100 w-100">
    <HeaderLine :title="'บัญชีของฉัน'" />
    <div class="content mt-3">
      <b-row>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'ชื่อ'"
            :type="'text'"
            placeholder="ชื่อ"
            v-model="formData.firstName"
            isRequired
            :is-validate="formData.isFirstNameErr"
            :text-validate="'กรุณากรอกข้อมูล'"
          />
        </b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'นามสกุล'"
            :type="'text'"
            placeholder="นามสกุล"
            v-model="formData.lastName"
            isRequired
            :is-validate="formData.isLastNameErr"
            :text-validate="'กรุณากรอกข้อมูล'"
          />
        </b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'อีเมล'"
            :type="'text'"
            placeholder="อีเมล"
            v-model="formData.email"
            isRequired
            :is-validate="formData.isEmailErr"
            :text-validate="`${
              formData.inValidEmail ? 'อีเมลไม่ถูกต้อง' : 'กรุณากรอกข้อมูล'
            }`"
          />
        </b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <InputText
            :textFloat="'เบอร์โทรศัพท์'"
            type="text"
            placeholder="เบอร์โทรศัพท์"
            :maxlength="10"
            v-model="formData.mobileNo"
            isRequired
            :is-validate="formData.isMobileNoErr"
            :text-validate="'กรุณากรอกข้อมูล'"
            @onKeydown="handleMobileInput"
            @onBlur="handleMobileInput"
          />
        </b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <div class="mb-3">
            <div class="required">วันเกิด</div>
            <div class="d-flex gap-2 w-100">
              <InputDropdown
                v-model="formData.day"
                :options="options.days"
                :clearable="false"
                :searchable="false"
                placeholder="วัน"
                :reduce="(option) => option.value"
                :is-validate="formData.isDayErr"
                class="w-100"
              />
              <InputDropdown
                v-model="formData.month"
                :options="options.months"
                :clearable="false"
                :searchable="false"
                placeholder="เดือน"
                :reduce="(option) => option.value"
                :is-validate="formData.isMonthErr"
                class="w-100"
              />
              <InputDropdown
                v-model="formData.year"
                :options="options.years"
                :clearable="false"
                :searchable="false"
                placeholder="ปี"
                :reduce="(option) => option.value"
                :is-validate="formData.isYearErr"
                class="w-100"
              />
            </div></div
        ></b-col>
        <b-col cols="12" xl="6" md="6" sm="12">
          <div class="required">เพศ</div>
          <div class="d-flex align-items-center gap-2">
            <div
              v-for="gender in [
                { value: 1, label: 'ชาย' },
                { value: 2, label: 'หญิง' },
              ]"
              :key="gender.value"
            >
              <div
                class="d-flex justify-content-center align-items-center gap-1 mt-2"
              >
                <input
                  type="radio"
                  :value="gender.value"
                  :id="`gender-${gender.value}`"
                  v-model="formData.gender"
                  class="input-radio"
                />
                <label>{{ gender.label }}</label>
              </div>
            </div>
          </div>
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
import InputDropdown from "@/components/InputDropdown.vue";

import WarningModal from "@/views/modal/WarningModal.vue";

import { mapActions } from "vuex";

export default {
  components: {
    HeaderLine,
    InputText,
    CustomButton,
    InputDropdown,
    WarningModal
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        day: "",
        month: "",
        year: "",
        gender: 1,

        isFirstNameErr: false,
        isLastNameErr: false,
        isEmailErr: false,
        isMobileNoErr: false,
        isDayErr: false,
        isMonthErr: false,
        isYearErr: false,

        inValidEmail: false,
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
    save() {
      this.checkField("isFirstNameErr", "firstName");
      this.checkField("isLastNameErr", "lastName");
      this.checkField("isEmailErr", "email");
      this.checkField("isMobileNoErr", "mobileNo");
      this.checkField("isDayErr", "day");
      this.checkField("isMonthErr", "month");
      this.checkField("isYearErr", "year");

      if (this.validateEmail(this.formData.email)) {
        this.updateFormData({
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          mobileNo: this.formData.mobileNo,
          password: this.formData.password,
          day: this.formData.day,
          month: this.formData.month,
          year: this.formData.year,
          gender: this.formData.gender,
        });
        this.$refs.warningModal.open();
      } else {
        this.formData.isEmailErr = true;
        this.formData.inValidEmail = true;
      }
    },
    checkField(field, data) {
      if (!this.formData[data]) {
        this.formData[field] = true;
      } else {
        this.formData[field] = false;
      }
    },
    handleMobileInput(event) {
      this.formData.mobileNo = event.target.value.replace(/\D/g, "");
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

    this.formData.firstName = this.$store.state.formData.firstName;
    this.formData.lastName = this.$store.state.formData.lastName;
    this.formData.email = this.$store.state.formData.email;
    this.formData.mobileNo = this.$store.state.formData.mobileNo;
    this.formData.day = this.$store.state.formData.day;
    this.formData.month = this.$store.state.formData.month;
    this.formData.year = this.$store.state.formData.year;
    this.formData.gender = this.$store.state.formData.gender;
  },
  watch: {
    "formData.firstName": function () {
      if (this.formData.firstName) {
        this.formData.isFirstNameErr = false;
      }
    },
    "formData.lastName": function () {
      if (this.formData.lastName) {
        this.formData.isLastNameErr = false;
      }
    },
    "formData.email": function () {
      if (this.formData.email) {
        this.formData.isEmailErr = false;
      }
    },
    "formData.mobileNo": function () {
      if (this.formData.mobileNo) {
        this.formData.isMobileNoErr = false;
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
  },
};
</script>

<style lang="scss" scoped>
.info-container {
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

  .content {
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

    ::v-deep(.dropdown-container) {
      .custom-v-select {
        width: 100% !important;
      }
    }
  }

  .footer {
    margin-top: 30px;
  }
}
</style>
