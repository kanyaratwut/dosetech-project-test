<template>
  <b-modal
    v-model="isOpenModal"
    ref="addressModal"
    hide-footer
    hide-header
    centered
  >
    <div class="address-modal">
      <div class="d-flex justify-content-end">
        <div @click="close">
          <CloseIcon class="icon-close click" />
        </div>
      </div>
      <HeaderLine :title="'ที่อยู่จัดส่ง'" class="mt-2" />
      <div class="content mt-3">
        <b-row>
          <b-col cols="12" xl="6" md="6" sm="12">
            <InputText
              :textFloat="'ชื่อ'"
              :type="'text'"
              placeholder="ชื่อ"
              v-model="formData.firstName"
              isRequired
              :is-validate="isFirstNameErr"
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
              :is-validate="isLastNameErr"
              :text-validate="'กรุณากรอกข้อมูล'"
            />
          </b-col>
          <b-col cols="12" xl="12" md="12" sm="12">
            <InputTextArea
              :textFloat="'รายละเอียดที่อยู่'"
              :type="'text'"
              placeholder="รายละเอียดที่อยู่"
              rows="5"
              v-model="formData.address"
              isRequired
              :is-validate="isAddressErr"
              :text-validate="'กรุณากรอกข้อมูล'"
            />
          </b-col>
          <b-col cols="12" xl="6" md="6" sm="12" class="mb-3">
            <div class="required">จังหวัด</div>
            <InputDropdown
              v-model="formData.province"
              :options="provinceList"
              :clearable="false"
              :searchable="false"
              placeholder="กรุณาเลือกจังหวัด"
              :reduce="(option) => option.value"
              :is-validate="isProvinceErr"
              @onInput="onInput('province')"
              class="w-100"
            />
          </b-col>
          <b-col cols="12" xl="6" md="6" sm="12" class="mb-3">
            <div class="required">เขต/อำเภอ</div>
            <InputDropdown
              v-model="formData.district"
              :options="districtList"
              :clearable="false"
              :searchable="false"
              placeholder="กรุณาเลือกเขต/อำเภอ"
              :reduce="(option) => option.value"
              :is-validate="isDistrictErr"
              @onInput="onInput('district')"
              class="w-100"
            />
          </b-col>
          <b-col cols="12" xl="6" md="6" sm="12" class="mb-3">
            <div class="required">แขวง/ตำบล</div>
            <InputDropdown
              v-model="formData.subDistrict"
              :options="subDistrictList"
              :clearable="false"
              :searchable="false"
              placeholder="กรุณาเลือกแขวง/ตำบล"
              :reduce="(option) => option.value"
              :is-validate="isSubDistrictErr"
              @onInput="onInput('subDistrict')"
              class="w-100"
            />
          </b-col>
          <b-col cols="12" xl="6" md="6" sm="12">
            <InputText
              :textFloat="'รหัสไปรษณีย์'"
              :type="'text'"
              placeholder="รหัสไปรษณีย์"
              v-model="formData.zipCode"
              isRequired
              :is-validate="isZipCodeErr"
              :text-validate="'กรุณากรอกข้อมูล'"
            />
          </b-col>
        </b-row>
      </div>
      <div class="footer pt-4 pb-2">
        <div class="d-flex justify-content-between align-items-center">
          <CustomButton
            :label="'ย้อนกลับ'"
            isOutline
            @click="close"
            class="px-5"
          />
          <CustomButton :label="'บันทึก'" @click="save" class="px-4" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import InputText from "@/components/InputText.vue";
import CustomButton from "@/components/CustomButton.vue";
import InputDropdown from "@/components/InputDropdown.vue";
import InputTextArea from "@/components/InputTextArea.vue";

//icon
import CloseIcon from "@/assets/image/svg/CloseIcon.vue";

export default {
  name: "AddressModal",
  components: {
    HeaderLine,
    InputText,
    CustomButton,
    InputDropdown,
    InputTextArea,

    CloseIcon,
  },
  data() {
    return {
      isOpenModal: false,
      formData: {
        id: 0,
        firstName: "",
        lastName: "",
        address: "",
        province: "",
        district: "",
        subDistrict: "",
        zipCode: "",
      },

      isFirstNameErr: false,
      isLastNameErr: false,
      isAddressErr: false,
      isProvinceErr: false,
      isDistrictErr: false,
      isSubDistrictErr: false,
      isZipCodeErr: false,

      provinceList: [],
      districtList: [],
      subDistrictList: [],

      options: [
        {
          province: "กรุงเทพมหานคร",
          districts: [
            {
              district: "พระนคร",
              subdistricts: [
                { subdistrict: "พระบรมมหาราชวัง", zipcode: "10200" },
                { subdistrict: "วังบูรพาภิรมย์", zipcode: "10200" },
                { subdistrict: "ชนะสงคราม", zipcode: "10200" },
              ],
            },
            {
              district: "บางรัก",
              subdistricts: [
                { subdistrict: "สุริยวงศ์", zipcode: "10500" },
                { subdistrict: "บางรัก", zipcode: "10500" },
                { subdistrict: "คลองมหานาค", zipcode: "10500" },
              ],
            },
            {
              district: "ปทุมวัน",
              subdistricts: [
                { subdistrict: "ปทุมวัน", zipcode: "10330" },
                { subdistrict: "วังใหม่", zipcode: "10330" },
              ],
            },
          ],
        },
        {
          province: "นนทบุรี",
          districts: [
            {
              district: "เมืองนนทบุรี",
              subdistricts: [
                { subdistrict: "บางกระสอ", zipcode: "11000" },
                { subdistrict: "บางศรีเมือง", zipcode: "11000" },
                { subdistrict: "ท่าทราย", zipcode: "11000" },
              ],
            },
            {
              district: "บางบัวทอง",
              subdistricts: [
                { subdistrict: "บางรักใหญ่", zipcode: "11110" },
                { subdistrict: "บางบัวทอง", zipcode: "11110" },
              ],
            },
          ],
        },
        {
          province: "เชียงใหม่",
          districts: [
            {
              district: "เมืองเชียงใหม่",
              subdistricts: [
                { subdistrict: "ศรีภูมิ", zipcode: "50000" },
                { subdistrict: "ช้างเผือก", zipcode: "50000" },
                { subdistrict: "สารภี", zipcode: "50000" },
              ],
            },
            {
              district: "หางดง",
              subdistricts: [
                { subdistrict: "สันป่าตอง", zipcode: "50100" },
                { subdistrict: "หางดง", zipcode: "50100" },
              ],
            },
          ],
        },
        {
          province: "นครราชสีมา",
          districts: [
            {
              district: "เมืองนครราชสีมา",
              subdistricts: [
                { subdistrict: "ในเมือง", zipcode: "30000" },
                { subdistrict: "หนองบัว", zipcode: "30000" },
                { subdistrict: "ตะพานหิน", zipcode: "30000" },
              ],
            },
            {
              district: "โนนสูง",
              subdistricts: [
                { subdistrict: "โนนสูง", zipcode: "30210" },
                { subdistrict: "หนองบัว", zipcode: "30210" },
              ],
            },
          ],
        },
        {
          province: "บุรีรัมย์",
          districts: [
            {
              district: "เมืองบุรีรัมย์",
              subdistricts: [
                { subdistrict: "ในเมือง", zipcode: "31000" },
                { subdistrict: "หนองบัว", zipcode: "31000" },
                { subdistrict: "สำโรง", zipcode: "31000" },
              ],
            },
            {
              district: "เฉลิมพระเกียรติ",
              subdistricts: [
                { subdistrict: "ตะโก", zipcode: "31190" },
                { subdistrict: "บัวขาว", zipcode: "31190" },
              ],
            },
          ],
        },
        {
          province: "อ่างทอง",
          districts: [
            {
              district: "เมืองอ่างทอง",
              subdistricts: [
                { subdistrict: "ตลาดหลวง", zipcode: "14000" },
                { subdistrict: "บางแก้ว", zipcode: "14000" },
                { subdistrict: "ศาลาแดง", zipcode: "14000" },
                { subdistrict: "ป่างิ้ว", zipcode: "14000" },
                { subdistrict: "บ้านแห", zipcode: "14000" },
                { subdistrict: "ตลาดกรวด", zipcode: "14000" },
                { subdistrict: "มหาดไทย", zipcode: "14000" },
                { subdistrict: "บ้านอิฐ", zipcode: "14000" },
                { subdistrict: "หัวไผ่", zipcode: "14000" },
                { subdistrict: "จำปาหล่อ", zipcode: "14000" },
                { subdistrict: "โพสะ", zipcode: "14000" },
                { subdistrict: "บ้านรี", zipcode: "14000" },
                { subdistrict: "คลองวัว", zipcode: "14000" },
                { subdistrict: "ย่านซื่อ", zipcode: "14000" },
              ],
            },
            {
              district: "วิเศษชัยชาญ",
              subdistricts: [
                { subdistrict: "วัดแจ้ง", zipcode: "14110" },
                { subdistrict: "ท่าโรง", zipcode: "14110" },
                { subdistrict: "ทุ่งโพธิ์", zipcode: "14110" },
              ],
            },
            {
              district: "ไชโย",
              subdistricts: [
                { name: "จรเข้ร้อง", zipcode: "14140" },
                { name: "ไชยภูมิ", zipcode: "14140" },
                { name: "ชัยฤทธิ์", zipcode: "14140" },
                { name: "เทวราช", zipcode: "14140" },
                { name: "ราชสถิตย์", zipcode: "14140" },
                { name: "ไชโย", zipcode: "14140" },
                { name: "หลักฟ้า", zipcode: "14140" },
                { name: "ชะไว", zipcode: "14140" },
                { name: "ตรีณรงค์", zipcode: "14140" },
                { name: "บางปลากด", zipcode: "14130" },
              ],
            },
            {
              district: "ป่าโมก",
              subdistricts: [
                { subdistrict: "ป่าโมก", zipcode: "14130" },
                { subdistrict: "สายทอง", zipcode: "14130" },
                { subdistrict: "โรงช้าง", zipcode: "14130" },
                { subdistrict: "บางเสด็จ", zipcode: "14130" },
                { subdistrict: "นรสิงห์", zipcode: "14130" },
                { subdistrict: "เอกราช", zipcode: "14130" },
                { subdistrict: "โผงเผง", zipcode: "14130" },
                { subdistrict: "อ่างแก้ว", zipcode: "14130" },
              ],
            },
            {
              district: "แสวงหา",
              subdistricts: [
                { subdistrict: "ศรีพราน", zipcode: "14150" },
                { subdistrict: "บ้านพราน", zipcode: "14150" },
                { subdistrict: "วังน้ำเย็น", zipcode: "14150" },
                { subdistrict: "แสวงหา", zipcode: "14150" },
                { subdistrict: "จำลอง", zipcode: "14150" },
                { subdistrict: "สีบัวทอง", zipcode: "14150" },
              ],
            },
            {
              district: "สามโก้",
              subdistricts: [
                { subdistrict: "สามโก้", zipcode: "14150" },
                { subdistrict: "คลองน้อย", zipcode: "14150" },
              ],
            },
            {
              district: "โพธิ์ทอง",
              subdistricts: [
                { subdistrict: "อินทประมูล", zipcode: "14120" },
                { subdistrict: "บางพลับ", zipcode: "14120" },
                { subdistrict: "หนองแม่ไก่", zipcode: "14120" },
                { subdistrict: "รำมะสัก", zipcode: "14120" },
                { subdistrict: "บางระกำ", zipcode: "14120" },
                { subdistrict: "โพธิ์รังนก", zipcode: "14120" },
                { subdistrict: "องครักษ์", zipcode: "14120" },
                { subdistrict: "โคกพุทรา", zipcode: "14120" },
                { subdistrict: "ยางช้าย", zipcode: "14120" },
                { subdistrict: "บ่อแร่", zipcode: "14120" },
                { subdistrict: "ทางพระ", zipcode: "14120" },
                { subdistrict: "สามง่าม", zipcode: "14120" },
                { subdistrict: "บางเจ้าฉ่า", zipcode: "14120" },
                { subdistrict: "คำหยาด", zipcode: "14120" },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    open(isCreate, id, item) {
      this.isOpenModal = true;
      this.setDefult();
      if (isCreate == true) {
        this.formData.id = id + 1;
      } else {
        this.formData.id = item.id;
        this.formData.firstName = item.firstName;
        this.formData.lastName = item.lastName;
        this.formData.address = item.address;
        this.formData.province = item.province;
        this.formData.district = item.district;
        this.formData.subDistrict = item.subDistrict;
        this.formData.zipCode = item.zipCode;
      }
    },
    close() {
      this.$emit("close");
      this.isOpenModal = false;
    },
    save() {
      this.checkField("isFirstNameErr", "firstName");
      this.checkField("isLastNameErr", "lastName");
      this.checkField("isAddressErr", "address");
      this.checkField("isProvinceErr", "province");
      this.checkField("isDistrictErr", "district");
      this.checkField("isSubDistrictErr", "subDistrict");
      this.checkField("isZipCodeErr", "zipCode");

      if (
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.address &&
        this.formData.province &&
        this.formData.district &&
        this.formData.subDistrict &&
        this.formData.zipCode
      ) {
        this.close();
        this.$emit("updateFormAddress", this.formData);
      }
    },
    checkField(field, data) {
      if (!this.formData[data]) {
        this[field] = true;
      } else {
        this[field] = false;
      }
    },
    setDefult() {
      this.formData.id = null;
      this.formData.firstName = "";
      this.formData.lastName = "";
      this.formData.address = "";
      this.formData.province = null;
      this.formData.district = null;
      this.formData.subDistrict = null;
      this.formData.zipCode = "";
    },
    onInput(type) {
      if (type == "province") {
        this.formData.district = null;
        this.formData.subDistrict = null;
        this.formData.zipCode = "";
      } else if (type == "district") {
        this.formData.subDistrict = null;
        this.formData.zipCode = "";
      } else if (type == "subDistrict") {
        this.formData.zipCode = "";
      }
    },
  },
  beforeMount() {
    this.provinceList = this.options.map((item) => ({
      value: item.province,
      label: item.province,
    }));
  },
  watch: {
    "formData.province": function () {
      if (this.formData.province) {
        this.districtList = this.options
          .find((item) => item.province == this.formData.province)
          .districts.map((district) => ({
            value: district.district,
            label: district.district,
          }));
      }
    },
    "formData.district": function () {
      if (this.formData.district) {
        this.subDistrictList = this.options
          .find((item) => item.province == this.formData.province)
          .districts.find((item) => item.district == this.formData.district)
          .subdistricts.map((item) => ({
            value: item.subdistrict,
            label: item.subdistrict,
          }));
      }
    },
    "formData.subDistrict": function () {
      if (this.formData.subDistrict) {
        this.formData.zipCode = this.options
          .find((item) => item.province == this.formData.province)
          .districts.find((item) => item.district == this.formData.district)
          .subdistricts.find(
            (item) => item.subdistrict == this.formData.subDistrict
          ).zipcode;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  ::v-deep(.modal-dialog) {
    min-width: 800px;
  }

  .address-modal {
    font-size: 17px;
  }
}

.address-modal {
  color: #16274a;
  padding: 10px;
  font-size: 15px;
  .icon-close {
    width: 12px;
    height: 12px;
    fill: #868686;
  }

  .content {
    ::v-deep(.dropdown-container) {
      .custom-v-select {
        width: 100% !important;
      }
    }
  }
}
</style>
