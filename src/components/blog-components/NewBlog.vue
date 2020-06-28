<template>
  <div>
    <svg-icons></svg-icons>

    <h2 style="text-align: center">Write A New Blog</h2>
    <!-- ************** REMOVE novalidate ******************** -->
    <form id="createBlog" class="blog-meta theme-border theme-shadow">
      <div class="label-row">
        <label for="title" form="createBlog">Title:</label>
        <input
          id="title"
          class="theme-border"
          name="title"
          type="text"
          form="createBlog"
          placeholder="Think power words &amp; SEO"
          minlength="2"
          maxlength="75"
          v-model.trim="blog.title"
          required
        />
      </div>

      <div class="label-row">
        <span>Author: </span>
        <span>Logged in User - oidc cookie</span>
      </div>

      <div class="label-row">
        <label for="category" form="createBlog">Blog Category:</label>
        <select
          id="category"
          class="theme-border"
          name="category"
          form="createBlog"
          v-model.trim="blog.category"
          required
        >
          <option disabled value="">~Blog Category~</option>
          <option
            v-for="category in categories"
            v-bind:value="category.category"
            :key="category.id"
            >{{ category.category }}</option
          >
        </select>
      </div>
      <div class="label-row">
        <label for="description" form="createBlog">Description:</label>
        <textarea
          id="description"
          class="blog-textarea theme-border"
          type="text"
          name="description"
          form="createBlog"
          placeholder="Description of the blog content. Think SEO keywords"
          minlength="2"
          maxlength="100"
          wrap="soft"
          v-model.trim="blog.description"
          required
        ></textarea>
      </div>

      <div class="label-row">
        <label for="tags" form="createBlog">Tags:</label>
        <textarea
          id="tags"
          class="blog-textarea theme-border"
          name="tags"
          type="text"
          form="createBlog"
          placeholder="Think SEO and search terms"
          minlength="2"
          maxlength="100"
          v-model.trim="blog.tags"
          required
        ></textarea>
      </div>
    </form>

    <hr />

    <menu-bubble :editor="editor"></menu-bubble>

    <div class="editor-menu-row">
      <main-menu :editor="editor"></main-menu>
      <search :editor="editor"></search>
    </div>

    <hr />

    <editor-content
      class="editor-content theme-border theme-shadow"
      :editor="editor"
    />

    <div class="form-buttons">
      <button
        type="button"
        form="createBlog"
        class="theme-border theme-shadow theme-button theme-button"
        @click="notYetImplmeneted"
      >
        Save Draft
      </button>

      <button
        type=""
        form="createBlog"
        class="theme-border theme-shadow theme-button theme-button"
        @click="notYetImplmeneted"
      >
        Publish
      </button>
    </div>
    <p class="error-class" v-if="error !== undefined">{{ error }}</p>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  HorizontalRule,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
  TrailingNode,
  Search,
  Focus
} from "tiptap-extensions";

import { Blog } from "@/models/blog/blog.js";
export default {
  name: "NewBlog",
  components: {
    EditorContent,
    "main-menu": () => import("@/components/text-editor/MainMenu.vue"),
    "menu-bubble": () => import("@/components/text-editor/MenuBubble.vue"),
    "svg-icons": () => import("@/components/text-editor/SvgIcons.vue"),
    search: () => import("@/components/text-editor/Search.vue")
  },
  data() {
    return {
      categories: [],
      blog: Blog,
      error: "",
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [2, 3, 4] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new HorizontalRule(),
          new Image(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new TrailingNode({
            node: "paragraph",
            notAfter: ["paragraph"]
          }),
          new Search({
            disableRegex: false
          }),
          new Focus({
            className: "has-focus",
            nested: false
          })
        ]
      })
    };
  },
  methods: {
    notYetImplmeneted(evt) {
      evt.preventDefault();
      alert("Not yet implemented");
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    saveDraft() {
      const newBlog = new Blog();
      try {
        newBlog.title = this.blog.title;
        newBlog.author = "LoggedInUser";
        newBlog.category = this.blog.category;
        newBlog.description = this.blog.description;
        newBlog.tags = this.blog.tags;
        newBlog.date = new Date();
        newBlog.content = this.editor.getHTML();
      } catch (e) {
        console.error(e);
        this.error = e;
      }
      console.log(newBlog);
    }
  },
  created() {
    this.categories = this.getCategories();
  },
  mounted() {
    this.blog.category = "";
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("renderHeader", true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("renderHeader", false);
    next();
  }
};
</script>

<style>
.error-class {
  display: flex;
  flex-direction: row;
  max-width: 19rem;
  margin: auto;
  color: red;
}

.blog-meta {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: var(--bgcolor1);
  margin: 1rem auto;
  padding: 1rem;
}

.label-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

label {
  margin: 0.25rem 0;
}

select:focus,
input:focus,
textarea:focus {
  outline-color: var(--h-tag-colour);
  border-color: var(--h-tag-colour);
}

input,
select,
.blog-textarea {
  width: 20rem;
  resize: none;
}

.form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem auto;
}

.table-btns {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.editor-menu-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 96%;
  margin: 1rem auto;
}

table,
th,
td {
  border: 1px solid black;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 5rem;
}

.editor-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  background-color: var(--bgcolor2);
  width: 96%;
  min-height: 20rem;
  margin: auto auto;
}

.editor-content * {
  caret-color: currentColor;
}

.editor-content pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  overflow-x: auto;
}

.editor-content pre code {
  display: block;
}

.editor-content p code {
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.editor-content ol,
.editor-content ul {
  padding-left: 1rem;
}

.editor-content li > ol,
.editor-content li > p,
.editor-content li > ul {
  margin: 0;
}

.editor-content a {
  color: inherit;
}

.editor-content blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}

.editor-content blockquote p {
  margin: 0;
}

.editor-content img {
  max-width: 100%;
  border-radius: 3px;
}

.editor-content table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.editor-content table td,
.editor-content table th {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.editor-content table td > *,
.editor-content table th > * {
  margin-bottom: 0;
}

.editor-content table th {
  font-weight: 700;
  text-align: left;
}

.editor-content table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.editor-content table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}

.editor-content .tableWrapper {
  margin: 1em 0;
  overflow-x: auto;
}

.editor-content .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

[data-type="drag_item"] {
  display: flex;
  padding: 0.5rem;
  background-color: rgba(black, 0.05);
  margin-bottom: 0.5rem;
  border-radius: 6px;
}

[data-type="drag_item"] > :first-child {
  flex: 1 1 auto;
}

[data-type="drag_item"] > :last-child {
  flex: 0 0 auto;
  margin-left: auto;
  cursor: move;
}

.has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #3ea4ffe6;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .blog-meta {
    max-width: 85%;
    margin: 1rem auto;
  }

  .label-row {
    max-width: 100%;
    margin: 0.25rem 0;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  .blog-meta {
    max-width: 39rem;
  }
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
