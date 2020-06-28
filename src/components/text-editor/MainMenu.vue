<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
    <div class="menubar theme-border theme-shadow">
      <div class="row">
        <button
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.undo"
          title="Undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.redo"
          title="Redo"
        >
          <icon name="redo" />
        </button>

        <button
          title="Code"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          title="Paragraph"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />
        </button>

        <button
          title="Heading 2 Element"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          title="Heading 3 Element"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          title="Heading 4 Element"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.heading({ level: 4 })"
        >
          H4
        </button>

        <button
          title="Bullet List"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          title="Ordered List"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          title="Blokequote"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button
          title="Code Block"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button
          title="Horizontal Rule"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="commands.horizontal_rule"
        >
          <icon name="hr" />
        </button>

        <button
          title="Add Image"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="showImagePrompt(commands.image)"
        >
          <icon name="image" />
        </button>
      </div>
      <div>
        <button
          title="Create Table"
          class="menubar-button theme-button theme-shadow theme-border"
          @click="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: true
            })
          "
        >
          <icon name="table" />
        </button>

        <span v-if="isActive.table()">
          <button
            title="Delete Table"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.deleteTable"
          >
            <icon name="delete-table" />
          </button>

          <button
            title="Add Column Before"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.addColumnBefore"
          >
            <icon name="add-col-before" />
          </button>

          <button
            title="Add Column After"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.addColumnAfter"
          >
            <icon name="add-col-after" />
          </button>

          <button
            title="Delete Column"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.deleteColumn"
          >
            <icon name="delete-col" />
          </button>

          <button
            title="Add Row Before"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.addRowBefore"
          >
            <icon name="add-row-before" />
          </button>

          <button
            title="Add Row After"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.addRowAfter"
          >
            <icon name="add-row-after" />
          </button>

          <button
            title="Delete Row"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.deleteRow"
          >
            <icon name="delete-row" />
          </button>

          <button
            title="Combine Cells"
            class="menubar-button theme-button theme-shadow theme-border"
            @click="commands.toggleCellMerge"
          >
            <icon name="combine-cells" />
          </button>
        </span>
      </div>
    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from "tiptap";
export default {
  name: "MainMenu",
  components: {
    EditorMenuBar,
    icon: () => import("@/components/text-editor/Icon.vue")
  },
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  }
};
</script>

<style>
.menubar {
  width: max-content;
  margin: 1rem auto;
  padding: 0.25rem;
  background: var(--ndd-bg-colour);
  text-align: center;
}

.theme-button,
.menubar-button {
  margin: 0.25rem;
  background: var(--bgcolor2);
  color: var(--h-tag-colour);
  cursor: pointer;
}

.menubar-button {
  min-width: 2rem;
  min-height: 2rem;
}

svg {
  fill: var(--h-tag-colour);
}

.theme-button:hover svg,
.menububble-button:hover svg,
.menubar-button:hover svg,
.menubar-button:hover {
  fill: white;
}

.theme-button:hover,
.menububble-button:hover,
.menubar-button:hover {
  color: white;
  background: linear-gradient(
    to right,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
}
</style>
