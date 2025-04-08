<template>
  <div class="address-container text-start h-100 w-100">
    <HeaderLine :title="'ที่อยู่จัดส่ง'" />
    <div class="d-flex justify-content-end align-items-center">
      <CustomButton
        :label="'สร้างที่อยู่ใหม่'"
        @click="$refs.addressModal.open(true, items.length)"
      />
    </div>
    <div class="content mt-3">
      <div class="table">
        <b-table
          :fields="fields"
          :items="items"
          striped
          :per-page="perPage"
          :current-page="currentPage"
          class="table"
          sticky-header
          show-empty
          empty-text="ไม่มีรายการ"
        >
          <template #head(addressDetail)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template #cell(action)="data">
            <div
              class="d-flex justify-content-center align-items-center bg-transparent click"
            >
              <div
                class="bg-transparent"
                @click="$refs.addressModal.open(false, null, data.item)"
              >
                แก้ไข&nbsp;
              </div>
              <div class="bg-transparent sm-mt-2">|</div>
              <div class="bg-transparent" @click="onRemove(data.item.id)">
                &nbsp;ลบ
              </div>
            </div>
          </template>
        </b-table>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <InputDropdown
            v-model="perPage"
            :options="options.perPage"
            :clearable="false"
            :searchable="false"
            placeholder="ปี"
            :reduce="(option) => option.value"
          >
            <template #selected-text>
              <div>{{ perPage }} / หน้า</div>
            </template>
          </InputDropdown>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
    <AddressModal ref="addressModal" @updateFormAddress="updateFormAddress" />
    <WarningModal ref="warningModal" :type="'Success'" :title="'ลบสำเร็จ'" />
  </div>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import CustomButton from "@/components/CustomButton.vue";
import InputDropdown from "@/components/InputDropdown.vue";

import AddressModal from "./modal/AddressModal.vue";
import WarningModal from "@/views/modal/WarningModal.vue";

export default {
  components: {
    HeaderLine,
    CustomButton,
    InputDropdown,

    AddressModal,
    WarningModal,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "addressDetail", label: "รายละเอียดที่อยู่" },
        { key: "action", label: "" },
      ],
      items: [
        {
          id: 1,
          addressDetail: "address1 ชนะสงคราม พระนคร กรุงเทพมหานคร 10200",
          firstName: "name1",
          lastName: "last1",
          address: "address1",
          province: "กรุงเทพมหานคร",
          district: "พระนคร",
          subDistrict: "ชนะสงคราม",
          zipCode: "10200",
        },
        {
          id: 2,
          addressDetail: "address3 สันป่าตอง หางดง เชียงใหม่ 50100",
          firstName: "name2",
          lastName: "last2",
          address: "address2",
          province: "เชียงใหม่",
          district: "หางดง",
          subDistrict: "สันป่าตอง",
          zipCode: "50100",
        },
        {
          id: 3,
          addressDetail: "address3 บางบัวทอง บางบัวทอง นนทบุรี 11110",
          firstName: "name3",
          lastName: "last3",
          address: "address3",
          province: "นนทบุรี",
          district: "บางบัวทอง",
          subDistrict: "บางบัวทอง",
          zipCode: "11110",
        },
        {
          id: 4,
          addressDetail: "address4 แสวงหา แสวงหา อ่างทอง 14150",
          firstName: "name4",
          lastName: "last4",
          address: "address4",
          province: "อ่างทอง",
          district: "แสวงหา",
          subDistrict: "แสวงหา",
          zipCode: "14150",
        },
      ],
      options: {
        perPage: [
          {
            value: 1,
            label: "1",
          },
          {
            value: 5,
            label: "5",
          },
          {
            value: 10,
            label: "10",
          },
          {
            value: 15,
            label: "15",
          },
        ],
      },
    };
  },
  methods: {
    onRemove(id) {
      this.$refs.warningModal.open();
      this.items = this.items.filter((item) => item.id != id);
    },
    updateFormAddress(data) {
      const isEdit = this.items.filter((item) => item.id == data.id);

      if (isEdit.length > 0) {
        this.items = this.items.map((item) => {
          if (item.id === data.id) {
            return {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              province: data.province,
              district: data.district,
              subDistrict: data.subDistrict,
              zipCode: data.zipCode,
              addressDetail: `${data.address} ${data.subDistrict} ${data.district} ${data.province} ${data.zipCode}`,
            };
          }
          return item;
        });
      } else {
        this.items.push({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          province: data.province,
          district: data.district,
          subDistrict: data.subDistrict,
          zipCode: data.zipCode,
          addressDetail: `${data.address} ${data.subDistrict} ${data.district} ${data.province} ${data.zipCode}`,
        });
      }
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.address-container {
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
    .table {
      @media (min-width: 768px) {
        ::v-deep(.b-table-sticky-header) {
          min-height: 300px;
        }
      }

      ::v-deep(table) {
        thead tr th {
          background: #16274a;
          color: #ffffff;

          &:last-child {
            min-width: 100px;
          }
        }

        tbody {
          tr {
            td {
              color: #16274a;
            }

            &:nth-of-type(odd) * {
              background: #e8eaee;
            }
          }
        }

        tbody .b-table-empty-row:nth-of-type(odd) * {
          background: transparent !important;
          min-height: 220px;

          div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .b-table-empty-row {
          border-bottom: transparent;
        }
      }
    }

    ::v-deep(.dropdown-container .custom-v-select) {
      width: 100px;
    }

    ::v-deep(.pagination) {
      border-radius: 2px;
      margin-bottom: 0;

      .page-item {
        &.disabled {
          .page-link {
            background-color: #ffffff;
          }
        }

        .page-link {
          color: #16274a;
        }

        &.active {
          .page-link {
            background-color: #16274a;
            border: 1px solid #16274a;
            color: #ffffff;

            &:focus {
              outline: none;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
}
</style>
