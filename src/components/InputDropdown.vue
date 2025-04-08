<template>
  <div class="dropdown-container d-flex flex-column">
    <v-select
      v-model="selectOption"
      :options="options"
      :clearable="clearable"
      :searchable="searchable"
      :placeholder="placeholder"
      class="custom-v-select"
      :reduce="reduce"
      :class="{ 'is-invalid': isValidate }"
      @option:selected="onInput(selectOption)"
    >
      <template #selected-option>
        <slot name="selected-text"></slot>
      </template>
    </v-select>
    <div v-if="isValidate">
      <span class="text-error">{{ validateText }}</span>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "InputDropdown",
  components: {
    vSelect,
  },
  props: {
    options: {
      type: Array,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    isValidate: {
      type: Boolean,
      required: false,
    },
    validateText: {
      type: String,
      required: false,
      default: "กรุณากรอกข้อมูล",
    },
    placeholder: {
      type: String,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    searchable: {
      type: Boolean,
      required: false,
    },
    reduce: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      selectOption: this.value,
    };
  },
  methods: {
    onInput(newValue) {
      this.$emit("onInput", newValue);
    },
  },
  watch: {
    selectOption(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.selectOption = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-container {
  .custom-v-select {
    width: 120px;

    ::v-deep(.vs__dropdown-toggle) {
      border: 1px solid #bcbcbc;
      border-radius: 0;

      .vs__selected {
        padding: 0;
        // margin-left: 0;
        margin-right: 0;
      }

      .vs__actions {
        padding: auto;
      }
    }

    &.is-invalid {
      ::v-deep .vs__dropdown-toggle {
        border: 1px solid red;
      }
    }

    ::v-deep .vs__actions {
      svg {
        display: none;
      }

      &::after {
        content: "";
        background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8L15 11H9L12 8Z" fill="black"/><path d="M12 16L9 13H15L12 16Z" fill="black"/></svg>');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 25px;
        height: 30px;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .text-error {
    color: #ff0000;
    font-size: 13px;
  }
}
</style>
