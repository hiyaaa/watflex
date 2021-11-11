<template>
  <v-app-bar dense clipped-left clipped-right :color="navbarColor" dark max-height="48px">
    <!---Logo part -->
    <div style="width: 200px; cursor: pointer" @click="goHome">
      <img src="@/assets/images/watflex_logo.png" width="33" class="mr-2" style="display: inline; vertical-align: top" />
      <h2 style="display: inline">WATFLEX</h2>
    </div>
    <v-divider inset vertical style="border: 1px #ffffff55 solid; margin-right: 30px"></v-divider>
    <!---Logo part -->

    <!--- menu -->
    <div style="width: 840px">
      <v-menu offset-y open-on-hover v-for="(item, index) in items" :key="index">
        <template v-slot:activator="{ on }">
          <v-btn @click="headerLink(item)" v-on="on" text large>
            <span style="color: #f5f5f5; font-size: 1rem">{{ item.title }}</span>
          </v-btn>
        </template>
        <v-list v-if="item.child != undefined">
          <v-list-item v-for="(child, i) in item.child" :key="i" :to="child.to" color="primary" exact>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!--- menu -->

    <v-spacer />
    <!---right part -->
<!-- 
    <v-divider inset vertical style="border: 1px #ffffff55 solid; margin-right: 30px"></v-divider>
    <div style="margin: 5px">
      <div>{{ $t("head.current") }}</div>
      <div>{{ nowTime }}</div>
    </div>
    <v-btn icon color="white" @click="refresh"><v-icon>mdi-cached</v-icon></v-btn> -->

    <v-divider inset vertical style="border: 1px #ffffff55 solid; margin-right: 30px"></v-divider>

    <!---User -->
    <v-menu offset-y v-if="account">
      <template v-slot:activator="{ on }">
        <v-btn fab v-on="on" x-small light class="mx-2 settingIcon" depressed><v-icon>mdi-account</v-icon></v-btn>
      </template>
      <v-list>
        <!---User info -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ account.id }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!---End User info -->
        <v-divider></v-divider>

        <!---Change Password -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t("head.changePW") }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!---End Change Password -->
        <v-divider></v-divider>

        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title>{{ $t("head.logout") }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <!---User -->
    <!---Locale Switcher -->
    <LocaleSwitcher />
    <!---Locale Switcher -->
  </v-app-bar>
</template>
<script>
// Utilities
import { get, sync } from "vuex-pathify";
import HeaderItems from "./HeaderItems";
import timeUtil from "@/utils/timeUtil";
export default {
  name: "Header",
  components: {
    LocaleSwitcher: () => import("@/components/common/LocaleSwitcher")
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showLogo: true,
    showSearch: false,
    fav: true,
    userprofile: [],
    items: HeaderItems,
    href() {
      return undefined;
    },
    nowTime: "",
    changeCount: 0
  }),
  watch: {
    refreshCount() {
      this.refreshDashboard();
    },
    dashboardRefresh() {
      this.refreshDashboard();
    },
    alertSeverity() {
      this.newAlarms = [];
      this.newEvents = [];
    }
  },
  computed: {
    navbarColor: get("app/navbarColor"),
    account: sync("account/account"),
    pageRefresh: sync("app/pageRefresh"),
    refreshCount: get("app/refreshCount"),
    dashboardRefresh: sync("app/dashboardRefresh"),
    // randomValues: sync("app/randomValues"),
    // setRandomdata: sync("app/randomdata"),
    // getRandomdata: get("app/randomdata"),
    newAlarms: sync("app/newAlarms"),
    newEvents: sync("app/newEvents"),
    alertSeverity: get("app/alertSeverity"),

    setLatency: sync("ap/latency"),
    setAirtimeUtilization: sync("ap/airtimeUtilization"),
    setCapacity: sync("ap/capacity"),
    setTrafficLine: sync("ap/trafficLine"),
    setClientLine: sync("ap/clientLine"),

    setTrafficLine_client: sync("client/trafficLine"),
    setSnr: sync("client/snr"),
    getSnr: get("client/snr")
  },

  methods: {
    headerLink(item) {
      if (item.to != null) {
        this.$router.push({ path: item.to }).catch(() => {});
      }
    },
    goHome() {
      this.$router.push({ name: "HOME" }).catch(() => {});
    },
    searchbox: function() {
      this.showSearch = !this.showSearch;
    },
    logout() {
      // this.account = null;
      window.localStorage.removeItem("account");
      this.$router.push({ name: "Login" });
    },
    refresh() {
      //모든 페이지 refresh
      this.pageRefresh = timeUtil.getLocalTime();
    },
    refreshDashboard() {
      this.dashboardRefresh = timeUtil.getLocalTime();
      this.changeCount = this.refreshCount;
    },
    compareNew(previous, next) {
      var severitys = ["Warning", "Minor", "Major", "Critical"];
      for (var s in severitys) {
        if (this.alertSeverity == severitys[s]) {
          severitys = severitys.slice(s, 4);
          break;
        }
      }
      if (next[0] == undefined || next[0].id == undefined) {
        // 새로운 알람이 없을 때
        return previous;
      } else {
        // 새로운 알람과 이전알람을 비교해야 할때
        const result = [];
        for (var i in next) {
          if (severitys.includes(next[i].severity)) {
            result.push(next[i]);
          }
          if (previous[0] != undefined)
            if (next[i].id == previous[0].id) {
              if (result.length <= 1) return previous;
              else return result;
            }
        }
        return result;
      }
    }
  },
  created() {
    this.refresh();
    this.refreshDashboard();
    this.randomValues = [];
    this.setRandomdata = [];
    this.apiHelper.get(this.apiUrl.SSE.GET_CLIENTID, {}).then(res => {
      window.sessionStorage.setItem("client_id", res.client_id);
      // window.sessionStorage.setItem("domain_id", this.account.domain);
      this.$sse(this.apiUrl.SSE.SSE_START + res.client_id + "/" + this.account.domain, {
        //TODO:: domin sse로 전송하지 않고 server단에서 호출하는 방법 확인하기
        formet: "json"
      }).then(sse => {
        this.sse = sse;
        sse.subscribe("globalNotification", result => {
          const res = JSON.parse(result).result;
          this.newAlarms = this.compareNew(this.newAlarms, res.alarms);
          this.newEvents = this.compareNew(this.newEvents, res.events);
        });
      });
    });
    this.nowTime = this.timeUtil.getNowTime("YYYY-MM-DD HH:mm:SS");
    setInterval(() => {
      this.nowTime = this.timeUtil.getNowTime("YYYY-MM-DD hh:mm:ss");
      if (this.refreshCount >= 0) {
        // 화면 새로고침을 설정한 경우
        if (this.changeCount == 0) this.refreshDashboard();
        else this.changeCount--;
      }
    }, 1000);
  }
};
</script>

<style lang="scss">
.v-application .theme--dark.white .theme--dark.v-btn.v-btn--icon {
  color: $font-color !important;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined),
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: $box-shadow;
}
.v-btn--icon.v-size--default .v-icon {
  width: 20px;
  font-size: 20px;
}
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
.option_title {
  padding: 5px;
  height: 40px;
  background: #448aff;
}
</style>
