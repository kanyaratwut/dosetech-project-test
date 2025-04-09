<template>
  <div class="navigation-container">
    <b-row>
      <b-col cols="12" xl="3" md="3" sm="12" class="navigation-wrp">
        <div class="text-left header">
          <div>เมนู</div>
          <div class="click d-md-none d-sm-block" @click="onCollapse">
            <ArrowDown class="icon-arrow" />
          </div>
        </div>
        <div class="tabs" v-if="!isCollapse">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tab', { active: activeTab === index }]"
            @click="tab.router ? $router.push(tab.router) : onActiveTab(index)"
            class="text-left d-flex align-items-center gap-2"
          >
            <component :is="tab.icon" />
            <div>{{ tab.label }}</div>
          </div>
        </div></b-col
      >
      <b-col class="p-0">
        <div class="tab-content">
          <component :is="tabs[activeTab].component" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InfoView from "@/views/home/InfoView.vue";
import ChangePassword from "@/views/home/ChangePassword.vue";
import AddressView from "@/views/home/AddressView.vue";

//icon
import LockOutIcon from "@/assets/image/svg/LockOutIcon.vue";
import ChangePasswordIcon from "@/assets/image/svg/ChangePasswordIcon.vue";
import UserIcon from "@/assets/image/svg/UserIcon.vue";
import ContactIcon from "@/assets/image/svg/ContactIcon.vue";
import ArrowDown from "@/assets/image/svg/ArrowDown.vue";

export default {
  name: "NavigationBar",
  components: {
    InfoView,
    ChangePassword,
    AddressView,

    LockOutIcon,
    ChangePasswordIcon,
    UserIcon,
    ContactIcon,
    ArrowDown,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
      isCollapse: false,
    };
  },
  methods: {
    onActiveTab(index) {
      this.activeTab = index;
    },
    onCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-container {
  font-size: 17px;
  height: 100%;

  .navigation-wrp {
    padding: 0;

     @media (min-width: 768px) {
     padding-right: 15px;
    }

    .header {
      padding: 10px 0px;
      color: #cfc0a1;
      display: flex;
      justify-content: space-between;

      @media (min-width: 768px) {
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
      }

      .icon-arrow {
        width: 15px;
        height: 15px;
        fill: #cfc0a1 !important;
      }
    }

    .tabs {
      display: flex;
      flex-direction: column;

      .tab {
        padding: 10px 20px;
        cursor: pointer;
        background-color: #ffffff;
        border-left: 4px solid #ffffff;
        border-bottom: 1px solid #e9e9e9;

        svg {
          width: 18px;
          height: 18px;
          fill: #16274a !important;
        }

        svg * {
          fill: #16274a !important;
        }

        &.active {
          background-color: #ffffff;
          border-left: 4px solid #16274a;
          color: #16274a;
          font-weight: bold;
        }

        &:hover {
          background-color: #ffffff;
          border-left: 4px solid #16274a;
        }
      }
    }
  }

  .tab-content {
    padding: 10px 0;

    @media (min-width: 768px) {
      padding: 0;
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
