<template>
  <div class="about">
    <div v-for="(q, i) in questions" :key="i" class="question">
      <div class="idnum">
        <span class="num">{{ i + 1 }}.</span>
        <span class="del" @click="deleteQuestion(i)">x</span>
      </div>
      <div class="body">
        <div class="subject">
          <div class="desc" style="font-weight: bold">
            <Editor
              v-model.trim="q.desc"
              :placeholder="'题目'"
              @delete="deleteQuestion(i)"
              @enter="newOption(q, i, -1)"
            ></Editor>
          </div>
        </div>
        <div class="options" v-if="q.type != '填空题' && q.type != '主观题'">
          <div v-for="(item, ii) in q.items" :key="ii" class="items">
            <label>
              <input
                v-if="q.type == '多选题'"
                :type="q.type == '多选题' ? 'checkbox' : 'radio'"
                :name="i"
                v-model="item.checked"
              />
              <input
                v-else
                :type="q.type == '多选题' ? 'checkbox' : 'radio'"
                :name="i"
                :value="ii"
                v-model="q.select"
              />

              <span>{{ String.fromCharCode(65 + ii) }}</span>
            </label>
            <Editor
              :id="'option' + i + '_' + ii"
              v-model.trim="item.label"
              @enter="newOption(q, i, ii)"
              :placeholder="'选项'"
              class="option"
              @delete="delOptions(q, i, ii)"
            ></Editor>
            <span
              v-if="q.type != '判断题' && q.items.length > 1"
              class="del"
              @click="delOptions(q, i, ii)"
              >x</span
            >
          </div>
        </div>

        <div>
          score:<input type="number" min="1" max="100" v-model="q.score" />
        </div>
        <div>
          answer:

          <template v-for="(o, oi) in q.items" :key="oi">
            <span v-if="q.type == '多选题' && o.checked" class="selectAnswer">{{
              String.fromCharCode(65 + oi)
            }}</span>
            <span
              v-else-if="q.type != '多选题' && q.select === oi"
              class="selectAnswer"
              >{{ String.fromCharCode(65 + oi) }}</span
            >
          </template>
        </div>
        <div style="display: flex">
          <label>
            <span>analysis</span>
          </label>
          <div style="background: #fcf8e3">
            <Editor v-model.trim="q.analysis"></Editor>
          </div>
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
    deleteQuestion(i) {
      this.questions.splice(i, 1);
    },
    addQuestion(type) {
      if (type == "判断题") {
        this.questions.push({
          type: type,
          desc: "",
          answer: "参考答案",
          score: 1,
          analysis: "<解析>",
          items: ["对", "错"].map((e) => {
            return { id: 1, label: e, checked: "" };
          }),
        });
      } else
        this.questions.push({
          type: type,
          desc: "",
          answer: "参考答案",
          select: "",
          score: 1,
          analysis: "<解析>",
          items: [{ id: 1, label: "", checked: "" }],
        });

      this.$nextTick(() => {
        document
          .querySelectorAll(".question")
          [this.questions.length - 1].scrollIntoView();
      });
    },
    delOptions(question, qindex, index) {
      if (question.items.length > 1) {
        question.items.splice(index, 1);
        this.$nextTick(function () {
          let el = document.querySelector(
            "#option" + qindex + "_" + (index - 1) + ".div-input"
          );
          console.log(el);
          this.placeCaretAtEnd(el);
        });
      }
    },
    newOption(question, qindex, index) {
      if (question.type == "判断题") return;
      if (question.items.length - 1 <= index) {
        question.items.splice(index + 1, 0, {
          id: 1,
          label: "",
          checked: "",
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
  padding: 15px 0;
  user-select: none;
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
.body {
  flex-grow: 1;
}
.idnum .del {
  display: block;
  color: red;
  font-weight: bold;
}
.option {
  flex-grow: 1;
}
.items .del {
  color: red;
  font-weight: bold;
  flex-shrink: 0;
}
.items label {
  width: 35px;
  display: inline-block;
  flex-shrink: 0;
}
.del {
  cursor: pointer;
  user-select: none;
}
.num {
  display: block;
  user-select: none;
}
.selectAnswer {
  color: blue;
  font-weight: bold;
}
::v-deep .desc .div-input {
  width: 100%;
}
</style>
