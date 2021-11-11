<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {}
};
</script>
<style>
html {
  min-width: 960px;
  overflow-x: auto;
}

/* ############################
base cacomponent 공통 */
/* .component-layout, */
/* chart 타이틀이 레이아웃을 벗어나면 생략 */
.component-title,
.component-title p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1em;
}
.component-title span {
  font-size: 0.8em;
}

/* 차트 x 축 시간 잘리는 부분 조정 */
.component-content {
  width: calc(100% - 28px);
}
.apexcharts-svg {
  width: calc(100% + 28px);
}

.apexcharts-menu-item {
  color: #2b2b2b;
}
.apexcharts-menu-icon > svg {
  fill: white !important;
}
/* full-screen */
.full-screen-component-container .base-component-container {
  width: 100%;
  height: 90%;
}

/* tabs */
.v-tab {
  font-size: 1rem;
}
.v-input {
  font-size: 12px;
}
.v-label {
  font-size: 12px;
}

/** pagination  */
.v-pagination__navigation,
.v-pagination__item,
.v-pagination__item--active {
  box-shadow: none;
}

/** v-row */
.no-gutters {
  margin-bottom: 2px;
}

/** AlarmHeader에 사용 */
.alarm-header-back .v-toolbar__content {
  height: 48px;
  padding: 0px 40px 0px 10px;
}

/** toast message */
.toast-critical {
  background-color: red !important;
}
.toast-major {
  background-color: orange !important;
}
.toast-minor {
  background-color: #a6a6a6 !important;
}
.toasted * {
  color: white;
}
.toasted .primary .action,
.toasted.toasted-primary .action {
  color: white;
  font-size: 22px;
}
</style>
