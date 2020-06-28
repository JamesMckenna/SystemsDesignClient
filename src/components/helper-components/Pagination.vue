<template>
  <div>
    <div class="per-page-row">
      <span id="topTxt">{{ totalPages }} pages at</span>
      <label class="border">
        <input
          type="radio"
          name="toggle"
          value="5"
          checked="true"
          @click="perPage"
        />
        <span>5</span>
      </label>

      <label class="border">
        <input type="radio" name="toggle" value="10" @click="perPage" />
        <span>10</span>
      </label>

      <label class="border">
        <input type="radio" name="toggle" value="15" @click="perPage" />
        <span>15</span>
      </label>
      <span id="botTxt">items per page</span>
    </div>

    <div class="pagination-row">
      <button
        type="button"
        class="pagination-btn border prev"
        @click="changePage(pageNumber - 1)"
        :disabled="pageNumber <= 1"
      >
        &lt;--
      </button>

      <button
        class="pagination-btn border grid-btn"
        :class="[
          pageNumber == 1 ? 'active' : '',
          showFirstLast ? '' : 'hidden'
        ]"
        @click="toFirst"
      >
        First
      </button>

      <span v-for="value in showPages" :key="value">
        <button
          type="button"
          class="pagination-btn border grid-btn"
          :class="[pageNumber == value ? 'active' : '']"
          @click="changePage(value)"
        >
          {{ value }}
        </button>
      </span>

      <button
        class="pagination-btn border grid-btn"
        :class="[
          pageNumber == totalPages ? 'active' : '',
          showFirstLast ? '' : 'hidden'
        ]"
        @click="toLast"
      >
        Last
      </button>

      <button
        type="button"
        class="pagination-btn border next"
        @click="changePage(pageNumber + 1)"
        :disabled="pageNumber >= totalPages"
      >
        --&gt;
      </button>
    </div>
    <slot name="page-data" />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      oldPage: 1,
      pageNumber: 1,
      oldPerPage: 5,
      itemsPerPage: 5,
      showFirstLast: false,
      totalPages: null,
      showPages: []
    };
  },
  props: {
    numOfItems: {
      type: Number,
      required: true
    },
    emitPagination: {
      type: Object,
      default: function() {
        return {
          currentItem: { type: Number },
          getNumOfItems: { type: Number }
        };
      }
    }
  },
  methods: {
    perPage(evt) {
      return (this.itemsPerPage = evt.target.value);
    },
    changePage(newPage) {
      this.pageNumber = newPage;
    },
    numberOfPages() {
      this.totalPages = Math.ceil(this.numOfItems / this.itemsPerPage);
      this.totalPages > 3
        ? (this.showPages = 3)
        : (this.showPages = this.totalPages);
    },
    toFirst() {
      this.pageNumber = 1;
    },
    toLast() {
      this.pageNumber = this.totalPages;
    },
    paginate() {
      if (this.pageNumber > 2 && this.pageNumber < this.totalPages - 2) {
        this.showPages = [];
        for (let i = -1; i < 2; i++) {
          this.$set(this.showPages, i + 1, this.pageNumber + i);
        }
      } else if (
        this.pageNumber > 2 &&
        this.pageNumber <= this.totalPages - 1
      ) {
        this.showPages = [];
        for (let i = -2; i < 1; i++) {
          this.$set(this.showPages, i + 2, this.pageNumber + i);
        }
      } else if (this.pageNumber == this.totalPages) {
        this.showPages = [];
        for (let i = 3, j = 0; i > 0; j++, i--) {
          this.$set(this.showPages, j, this.pageNumber - i);
        }
      } else {
        this.showPages = [];
        for (let i = 0; i < 3; i++) {
          this.$set(this.showPages, i, this.pageNumber + i);
        }
      }

      this.pageNumber >= 3
        ? (this.showFirstLast = true)
        : (this.showFirstLast = false);
    },
    calcFirstItem() {
      return this.pageNumber * this.oldPerPage - (this.oldPerPage - 1);
    },
    calcNewPage(fItem) {
      this.numberOfPages();
      const firstItem = Math.ceil(fItem / this.itemsPerPage);
      firstItem !== 0 ? (this.pageNumber = firstItem) : (this.pageNumber = 1);
      this.oldPerPage = this.itemsPerPage;
    },
    setPaginationValues() {
      this.emitPagination.currentItem = parseInt(this.calcFirstItem());
      this.emitPagination.getNumOfItems = parseInt(this.itemsPerPage);
    }
  },
  computed: {},
  watch: {
    pageNumber() {
      this.paginate();
    },
    itemsPerPage() {
      //calcFirstItem - get the first item on the current page before items per page is changed
      //with the first item, the viewing page can be set based on the new items per page value
      this.calcNewPage(this.calcFirstItem());
    }
  },
  created() {
    this.numberOfPages();
  },
  beforeUpdate() {
    this.setPaginationValues();
    this.$emit("paginate", this.emitPagination);
  }
};
</script>

<style scoped>
.per-page-row label span {
  text-align: center;
  background-color: white;
  width: 2rem;
  height: 1rem;
  display: block;
  border-radius: 0.1875rem;
  cursor: pointer;
}
.per-page-row input:checked + span {
  background-color: rgba(105, 105, 134, 1);
  color: #f7f7f7;
  cursor: auto;
}
.per-page-row:has(label > input[type="radio"]:checked) {
  background-color: rgba(105, 105, 134, 1);
  border-radius: 0.1875rem;
  cursor: auto;
}
.per-page-row label input {
  position: absolute;
  visibility: hidden;
  top: -20rem;
}
.pagination-btn {
  margin: 0.5rem;
  min-width: 2rem;
  height: 1rem;
  cursor: pointer;
  background-color: white;
}
.active {
  background-color: rgba(105, 105, 134, 1);
  color: white;
  cursor: auto;
}
[disabled] {
  background-color: rgb(127, 127, 127);
  color: rgb(127, 127, 127);
  cursor: auto;
}
.hidden {
  visibility: hidden;
}
.border {
  border-color: #696986;
  border-radius: var(--borderradius);
  border-style: var(--borderstyle);
  border-width: 0px;
  box-shadow: var(--boxshadow);
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .per-page-row {
    display: grid;
    grid-template-areas:
      "tTxt tTxt tTxt"
      "btn btn btn"
      "bTxt bTxt bTxt";
    grid-template-columns: auto auto auto;
    grid-template-rows: 1.5rem;
    justify-content: center;
    margin: 0.5rem 0.5rem;
  }
  .per-page-row label {
    grid-area: btn btn btn;
    width: 2rem;
    margin: 0.5rem 0.5rem;
    align-self: center;
  }
  #topTxt {
    grid-area: tTxt;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
  }
  #botTxt {
    grid-area: bTxt;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
  }
  .pagination-row {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-areas:
      "btn1 btn1 btn1 btn1 btn1"
      "prev . . . next";
    grid-template-rows: 1.5rem;
    justify-content: center;
    margin: 0.5rem 0.5rem;
  }
  .prev {
    grid-area: prev;
  }
  .next {
    grid-area: next;
  }
  .grid-btn {
    grid-area: btn1 btn1 btn1 btn1 btn1;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
  .per-page-row {
    display: grid;
    grid-template-areas: "tTxt btn btn btn bTxt";
    grid-template-columns: 7rem 3rem 3rem 3rem 7rem;
    margin: 0.5rem 0.5rem;
  }
  #topTxt {
    margin-left: 2rem;
    margin-right: 0rem;
  }
  #botTxt {
    margin-left: auto;
  }
  .pagination-row {
    grid-template-areas: "prev btn1 btn1 btn1 btn1 btn1 next";
    grid-template-columns: auto auto 3rem 3rem 3rem auto auto;
  }
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
