<template>
  <b-modal
    v-model="isOpenModal"
    ref="WarningModal"
    hide-footer
    hide-header
    centered
  >
    <div class="warning-modal">
      <div class="d-flex justify-content-end">
        <div @click="close">
          <CloseIcon class="icon-close click" />
        </div>
      </div>
      <div class="content">
        <div class="header" :class="resoveColor(type)">
          {{ title }}
        </div>
      </div>
      <div class="footer">
        <CustomButton :label="'รับทราบ'" @click="close" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import CloseIcon from "@/assets/image/svg/CloseIcon.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "WarningModal",
  components: {
    CloseIcon,
    CustomButton,
  },
  props: {
    title: {
      required: false,
      type: String,
      default: "กรุณาติดต่อเจ้าหน้าที่",
    },
    type: {
      type: String,
      required: false,
      validator: function (value) {
        return ["Success", "Warning"].includes(value);
      },
    },
  },
  data() {
    return {
      isOpenModal: false,
    };
  },
  methods: {
    open() {
      this.isOpenModal = true;
    },
    close() {
      this.$emit("close");
      this.isOpenModal = false;
    },
    resoveColor(type) {
      switch (type) {
        case "Success":
          return "success";
        case "Warning":
          return "warning";
        default:
          return "warning";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 576px) {
  ::v-deep(.modal-dialog) {
    width: 350px;
  }
}

.warning-modal {
//   color: red;
  cursor: default;
  .icon-close {
    width: 12px;
    height: 12px;
    fill: #868686;
  }

  .content {
    .header {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0 30px 0;
      &.success {
        color: #16274a;
      }

      &.warning {
        color: red
      }
    }
  }
}
</style>
