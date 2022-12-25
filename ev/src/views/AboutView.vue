<template>
  <div class="about">
    <div v-for="(q, i) in questions" :key="i" class="question">
      <div class="idnum">
        <span class="num">{{ i + 1 }}.</span>
      </div>
      <div class="body">
        <div class="subject">
          <div class="desc" style="font-weight: bold">
            <Editor v-model.trim="q.desc" :placeholder="'题目'"></Editor>
          </div>
        </div>
        <div class="options" v-if="q.type != '填空题' && q.type != '主观题'">
          <div v-for="(item, ii) in q.items" :key="ii" class="items">
            <label>
              <input
                :type="q.type == '多选题' ? 'checkbox' : 'radio'"
                :name="i"
              />
              <span>{{ String.fromCharCode(65 + ii) }}</span>
            </label>
            <Editor
              :id="'option' + i + '_' + ii"
              v-model.trim="item.label"
              @enter="newOption(q, i, ii)"
              :placeholder="'选项'"
            ></Editor>
          </div>
        </div>

        <div>score:<input type="number" v-model="q.score" /></div>
        <div>answer:{{ q.answer }}</div>
        <div>
          <label>
            <span>analysis</span>
          </label>
          <Editor v-model.trim="q.analysis"></Editor>
        </div>
      </div>
    </div>
    <div class="op">
      <a v-for="type in types" :key="type" @click="addQuestion(type)">{{
        type
      }}</a>
    </div>
  </div>
</template>
<script setup>
import Editor from "@/components/Editor.vue";
</script>
<script>
export default {
  data() {
    return {
      questions: [],
      types: ["单选题", "多选题", "判断题", "填空题", "主观题"],
    };
  },
  methods: {
    addQuestion(type) {
      if (type == "判断题") {
        this.questions.push({
          type: type,
          desc: "",
          answer: "参考答案",
          score: 1,
          analysis: "<解析>",
          items: ["对", "错"].map((e) => {
            return { id: 1, label: e, checked: 0 };
          }),
        });
      } else
        this.questions.push({
          type: type,
          desc: "",
          answer: "参考答案",
          score: 1,
          analysis: "<解析>",
          items: [{ id: 1, label: "", checked: 1 }],
        });
    },
    newOption(question, qindex, index) {
      if (question.type == "判断题") return;
      if (question.items.length - 1 <= index) {
        question.items.splice(index + 1, 0, {
          id: 1,
          label: "",
          checked: 0,
        });
      }
      this.$nextTick(function () {
        let el = document.querySelector(
          "#option" + qindex + "_" + (index + 1) + ".div-input"
        );
        console.log(el);
        this.placeCaretAtEnd(el);
      });
    },
    placeCaretAtEnd(el) {
      el.focus();
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    },
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.subject {
  display: flex;
  position: relative;
}
.subject .desc {
  flex-grow: 1;
}
.items {
  display: flex;
  line-height: 1.5em;
}
input[type="radio"],
input[type="checkbox"] {
  overflow: hidden;
  margin-right: 5px;
}
.del {
  margin-right: 10px;
}
.num {
}
.idnum {
  min-width: 35px;
}
.options {
  margin: 10px 0;
}
.question {
  display: flex;
}
.op {
  position: fixed;
  bottom: 0;
  background: white;
  user-select: none;
  font-weight: bold;
}
.op a {
  display: inline-block;
  cursor: pointer;
  margin: 5px 10px;
  text-decoration: underline;
}
input[type="number"] {
  border: none;
  border-bottom: 1px solid;
  outline: none;
  width: 60px;
  text-align: center;
}
</style>
