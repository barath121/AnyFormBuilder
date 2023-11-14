<template>
  <div class="flex flex-col borderLeft h-full w-96">
    <div class="justify-evenly flex p-1 borderBottom">
      <h1>Options</h1>
    </div>
    <div class="flex flex-col overflow-auto">
      <div class="flex flex-col items-start p-2 borderBottom">
        <label>Type</label>
        <select class="w-full rounded p-1" v-model="pageType" @change="changePageType">
          <option value="Statement">Statement</option>
          <option value="Small Text">Small Text</option>
          <option value="Large Text">Large Text</option>
          <option value="Check Box">Check Box</option>
          <option value="Radio Button">Radio Button</option>
          <option value="Date">Date</option>
          <option value="File">File</option>
        </select>
      </div>
       <div class="flex flex-col p-2 borderBottom"  v-if="pageType!='Statement'">
        <label>Field name</label>
        <input
          class="w-full rounded p-1 resize-none inputBorder"
          placeholder="Field Name"
          v-model="fieldName"
          @input="changeFieldName"
         
        >
       </div>
      <div class="flex flex-col p-2 borderBottom">
        <label>Question</label>
        <textarea
          class="w-full rounded p-1 resize-none inputBorder"
          placeholder="Question"
          v-model="question"
          @input="changeQuestion"
        ></textarea>
      </div>
      <div class="flex flex-col p-2 borderBottom" v-if="pageType=='Check Box'||pageType=='Radio Button'">
        <label>Choices</label>
        <textarea
          class="w-full rounded p-1 resize-none inputBorder"
          placeholder="Add Choices Separated By Comma"
          v-model="choices"
          @input="changeChoices"
        ></textarea>
      </div>
      <div class="flex flex-row p-2 justify-between borderBottom" v-if="pageType!='Check Box'&&pageType!='Statement'">
        <label for="">Required</label>
        <input
          type="checkbox"
          id="requiredswitch"
          class="switchcheckbox h-0 w-0 invisible"
          v-model="isRequired"
          @change="changeIsRequired"
        /><label
          for="requiredswitch"
          class="switchlabel cursor-pointer block rounded-full bg-rose-400 relative"
        ></label>
      </div>
      <div class="p-2 borderBottom" v-if="pageType=='Small Text'||pageType=='Large Text'">
        <div class="flex flex-row justify-between mb-2">
          <label for="">Max Characters</label>
          <input
            type="checkbox"
            id="maxcharacterswitch"
            class="switchcheckbox h-0 w-0 invisible"
            v-model="hasMaxCharaters"
            @change="changeMaxCharacters"
          /><label
            for="maxcharacterswitch"
            class="switchlabel cursor-pointer block rounded-full bg-rose-400 relative"
          ></label>
        </div>
        <input
          class="w-full rounded p-1 inputBorder"
          placeholder="Number"
          type="number"
          min="1"
          v-model="maxCharacters"
          v-if="hasMaxCharaters"
          @input="changeMaxCharacters"
        />
      </div>
    </div>
  </div>
</template>
<script>
</script>
<script>
export default {
  name : "OptionsBar",
  props: ["pages", "selectedpage"],
  data(){
    return{
    question : this.pages[this.selectedpage].question,
    choices : this.convertArrayToCSV(this.pages[this.selectedpage].choices||[]),
    pageType : this.pages[this.selectedpage].pageType,
    isRequired : this.pages[this.selectedpage].isRequired,
    maxCharacters : this.pages[this.selectedpage].maxCharacters,
    hasMaxCharaters : this.pages[this.selectedpage].maxCharacters>0,
    fieldName : this.pages[this.selectedpage].fieldName
    }
  },
  methods: {
    changeFieldName(){
      this.$emit("changeFieldName",this.fieldName);
    },
    changePageType(){
      if(this.pageType!="Check Box"||this.pageType!="Radio Button"){
        this.choices = ""
        this.changeChoices();
      }
       if(this.pageType=="Statement"){
        this.fieldName = ""
        this.changeFieldName();
      }
      this.$emit("changePageType",this.pageType);
    },
    changeQuestion() {
      this.$emit("changeQuestion", this.question);
    },
    changeChoices(){
      this.$emit("changeChoices", this.choices.split(",").map(choice=>choice.trim()).filter(choice=>choice));
    },
    changeIsRequired(){
      this.$emit("changeIsRequired", this.isRequired);
    },
    changeMaxCharacters(){
      if(this.hasMaxCharaters&&this.maxCharacters){
      this.$emit("changeMaxCharacters", this.maxCharacters);
      }
      else
      this.$emit("changeMaxCharacters", undefined);
    },
    convertArrayToCSV(arr){
      return arr.join(",");
    }
  },
  watch:{
    selectedpage(newPage){
      this.question = this.pages[this.selectedpage].question;
      this.choices = this.convertArrayToCSV(this.pages[this.selectedpage].choices||[]);
      this.pageType = this.pages[this.selectedpage].pageType;
      this.isRequired = this.pages[this.selectedpage].isRequired;
      this.maxCharacters = this.pages[this.selectedpage].maxCharacters;
      this.hasMaxCharaters = this.maxCharacters>0;
      this.fieldName = this.pages[this.selectedpage].fieldName
    }
  }
};
</script>
