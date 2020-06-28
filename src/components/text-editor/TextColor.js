import { Mark } from "tiptap";
import { toggleMark, markInputRule, markPasteRule } from "tiptap-commands";

class TextColor extends Mark {
  constructor(options = {}) {
    super(options);
    console.log("TEXTCOLOR");
  }

  get name() {
    return "TextColor";
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: "span",
          getAttrs: node => node.style.color === "blue" && null
        },
        {
          style: "color",
          getAttrs: value => value === "green"
        }
      ],
      toDOM: () => ["span", 0]
    };
  }

  keys({ type }) {
    return {
      "Mod-p": toggleMark(type)
    };
  }

  commands({ type }) {
    return () => toggleMark(type);
  }

  inputRules({ type }) {
    return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
  }

  pasteRules({ type }) {
    return [markPasteRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/g, type)];
  }
}

export default TextColor;
