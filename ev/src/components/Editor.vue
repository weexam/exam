<template>
  <div
    ref="div"
    class="div-input"
    contenteditable
    :placeholder="placeholder"
    @focus="ischecked = true"
    @blur="blurFn"
    @input="inputFn"
    v-html="text"
    :class="{
      empty: modelValue.length == 0,
      placeholder_hide: modelValue.length > 0,
    }"
    @keydown.enter.prevent="enter($event)"
    @keydown.delete="handleDelete($event)"
    @paste="handlePaste($event)"
  ></div>
</template>

<script>
import { placeCaretAtEnd } from "@/Browser";
export default {
  name: "DivInput",
  props: ["modelValue", "placeholder"],
  emits: ["update:modelValue", "enter", "delete"],
  data() {
    return {
      ischecked: false,
      text: this.modelValue,
    };
  },
  mounted() {},
  watch: {
    modelValue() {
      // 解决光标跳动BUG
      if (!this.ischecked) {
        this.text = this.modelValue;
      }
    },
  },
  methods: {
    handleDelete(event) {
      if (this.modelValue.length == 0) this.$emit("delete");
    },
    handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;

      if (!items || items.length === 0) {
        this.$message.error("当前浏览器不支持本地");
        return;
      }

      if (this.text.trim().length != 0) {
        return;
      }
      navigator.clipboard.readText().then((r) => {
        this.text = r;
        this.$nextTick(() => {
          this.$emit("update:modelValue", this.$refs.div.innerHTML);
        });
      });
      event.preventDefault();
      if (true) return;
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].type);
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        this.$message.error("粘贴内容非图片");
        return;
      }
      // 此时file就是我们的剪切板中的图片对象
      this.addFile(file); //预览
      console.log("黏贴", file);
    },
    enter() {
      this.$emit("enter");
    },
    inputFn(e) {
      let chars = e.target.innerText.split("");

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] == "(") {
          let start = i;
          let end = -1;
          for (let j = i + 1; j < chars.length; j++) {
            if (chars[j] == "(") break;
            if (chars[j] == ")") {
              end = j;
              break;
            }
          }
          if (end > 0) {
            chars.splice(start + 1, 0, ..."<span class='fill'>".split(""));
            end += "<span class='fill'>".length;
            chars.splice(end, 0, ..."</span>".split(""));

            i += "<span class='fill'>".length + "</span>".length;
          }
        }
      }
      let div = document.createElement("div");
      div.innerHTML = chars.join("");
      if (div.innerHTML != e.target.innerHTML) {
        e.target.innerHTML = div.innerHTML;
        placeCaretAtEnd(e.target.querySelector(".cur") || e.target);

        // cursorPos.setStart(cursorPos.getst);
      } else {
      }
      this.$emit("update:modelValue", div.innerHTML);
    },
    blurFn(e) {
      this.ischecked = false;
      this.text = this.modelValue;
      e.view.blur();
    },
  },
};
</script>

<style>
.div-input {
  display: inline-block;
  border-bottom: 1px solid #ccc;
  outline: none;
  padding: 0 5px;
  width: 100%;
}
.empty {
  background: transparent url(enter.gif) no-repeat;
}
.div-input span {
  border-bottom: 1px solid black;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.5);
  margin: 0 5px;
}
.fill {
  padding: 0 10px;
}
</style>
