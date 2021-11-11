<template>
  <div>
    <v-data-table
      mobile-breakpoint="0"
      v-bind="$attrs"
      v-on="$listeners"
      hide-default-footer
      :items-per-page="-1"
      @update:sort-by="updateSortBy"
      @update:sort-desc="updateSortDesc"
    >
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-data-table>
    <v-divider class="mb-5" v-if="page" />
    <v-pagination
      v-if="page"
      :value="page"
      @input="changePage($event)"
      :length="pageCount"
      :total-visible="totalVisible"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "BaseDataTable",
  data() {
    return {
      totalVisible: 9,
      sortBy: undefined,
      sortByOld: undefined,
      sortDesc: undefined,
      sortDescOld: undefined
    };
  },
  methods: {
    changePage(e) {
      this.$emit("update:page", e);
      if (this.refresh) this.refresh();
    },
    updateSortBy(v) {
      this.sortBy = v[0]; // col : undefined, string
      if (this.sortBy !== undefined) {
        this.sortDesc = false;
      }
      this.updateSort();
    },
    updateSortDesc(v) {
      this.sortDesc = v[0]; // desc : undefined, true, false
      this.updateSort();
    },
    updateSort() {
      // console.log(`${this.sortByOld} -> ${this.sortBy} || ${this.sortDescOld} -> ${this.sortDesc}`);
      if (this.sortBy === undefined && this.sortDesc === undefined) {
        // sort 해제
        this.sortByOld = this.sortBy;
        this.sortDescOld = this.sortDesc;
        this.emitUpdateSort("", "");

      } else if (this.sortBy !== this.sortByOld || this.sortDesc !== this.sortDescOld) {
        if (this.sortBy !== undefined && this.sortDesc === false) {
          // asc
          this.sortByOld = this.sortBy;
          this.sortDescOld = this.sortDesc;
          this.emitUpdateSort(this.sortBy, "ASC");

        } else if (this.sortBy !== undefined && this.sortDesc === true) {
          // desc
          this.sortByOld = this.sortBy;
          this.sortDescOld = this.sortDesc;
          this.emitUpdateSort(this.sortBy, "DESC");
        }
      }
    },
    emitUpdateSort(sortCol, dir) {
      this.$emit("update:sort", { sortCol: sortCol, dir: dir });
    }
  },
  props: {
    page: {
      type: Number
    },
    pageCount: {
      type: Number,
      default: 1
    },
    refresh: {
      type: Function
    }
  },
  created() {},
  computed: {}
};
</script>
