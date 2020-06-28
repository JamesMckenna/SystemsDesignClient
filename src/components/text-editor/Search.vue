<template>
  <div class="search theme-border theme-shadow">
    <div class="search-row">
      <input
        name="Search"
        title="Search"
        class="theme-border"
        ref="search"
        @keydown.enter.prevent="editor.commands.find(searchTerm)"
        placeholder="Search …"
        type="text"
        v-model="searchTerm"
      />

      <button
        class="theme-button theme-shadow theme-border"
        name="Find"
        @click="editor.commands.find(searchTerm)"
      >
        Find
      </button>
      <button
        class="theme-button theme-shadow theme-border"
        name="Clear"
        @click="editor.commands.clearSearch(), clearFields()"
      >
        Clear
      </button>
    </div>

    <div class="search-row">
      <input
        name="Replace"
        title="Replace"
        class="theme-border"
        @keydown.enter.prevent="editor.commands.replace(replaceWith)"
        placeholder="Replace …"
        type="text"
        v-model="replaceWith"
      />

      <button
        class="theme-button theme-shadow theme-border"
        name="Replace"
        @click="editor.commands.replace(replaceWith)"
      >
        Replace
      </button>
      <button
        class="theme-button theme-shadow theme-border"
        Name="Replace-All"
        @click="editor.commands.replaceAll(replaceWith)"
      >
        All
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      searchTerm: null,
      replaceWith: null,
      focused: false
    };
  },
  methods: {
    clearFields() {
      this.searchTerm = null;
      this.replaceWith = null;
    }
  }
};
</script>

<style>
.search {
  width: 18rem;
  margin: auto auto;
  background-color: var(--ndd-bg-colour);
  padding: 0.25rem;
}

.search-row {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.search input {
  padding: 0.25rem;
  margin: 0.25rem 0.25rem;
  font-size: 0.75rem;
  width: 14rem;
}

/* .search-button {
  width: 3.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  padding: 0;
} */

.find {
  background: rgba(255, 213, 0, 0.5);
}
</style>
