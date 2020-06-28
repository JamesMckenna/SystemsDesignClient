<template>
  <editor-menu-bubble
    :editor="editor"
    :keep-in-bounds="keepInBounds"
    v-slot="{ commands, isActive, getMarkAttrs, menu }"
  >
    <div
      class="menububble theme-shadow theme-border"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
    >
      <button
        class="theme-button theme-shadow theme-border"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        <icon name="bold" />
      </button>

      <button
        class="theme-button theme-shadow theme-border"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <icon name="italic" />
      </button>

      <button
        title="Underline"
        class="theme-button theme-shadow theme-border"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <icon name="underline" />
      </button>

      <button
        title="Strike Through"
        class="theme-button theme-shadow theme-border"
        :class="{ 'is-active': isActive.strike() }"
        @click="commands.strike"
      >
        <icon name="strike" />
      </button>

      <button
        class="theme-button theme-shadow theme-border"
        :class="{ 'is-active': isActive.code() }"
        @click="commands.code"
      >
        <icon name="code" />
      </button>

      <form
        class="menububble-form"
        v-if="linkMenuIsActive"
        @submit.prevent="setLinkUrl(commands.link, linkUrl)"
      >
        <input
          class="menububble-input theme-button theme-shadow theme-border"
          type="text"
          v-model="linkUrl"
          placeholder="https://"
          ref="linkInput"
          @keydown.esc="hideLinkMenu"
        />
        <button
          class="theme-button theme-shadow theme-border"
          @click="setLinkUrl(commands.link, null)"
          type="button"
        >
          <icon name="remove" />
        </button>
      </form>

      <template v-else>
        <button
          class="theme-button theme-shadow theme-border"
          @click="showLinkMenu(getMarkAttrs('link'))"
          :class="{ 'is-active': isActive.link() }"
        >
          <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
          <icon name="link" />
        </button>
      </template>
    </div>
  </editor-menu-bubble>
</template>

<script>
import { EditorMenuBubble } from "tiptap";
export default {
  name: "MenuBubble",
  components: {
    EditorMenuBubble,
    icon: () => import("@/components/text-editor/Icon.vue")
  },
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      keepInBounds: true,
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    }
  }
};
</script>

<style>
em {
  font-style: italic;
}

strong {
  font-weight: bold;
}

.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 520;
  background: var(--ndd-bg-colour);
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}

.menububble.is-active {
  opacity: 1;
  visibility: visible;
}

.menububble-form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.menububble-input {
  font: inherit;
  border: none;
  background: transparent;
  color: #fff;
}
</style>
