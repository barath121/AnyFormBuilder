<template>
  <div class="flex flex-col border h-full w-96">
    <div class="justify-evenly flex p-1 borderBottom">
      <h1>Options</h1>
    </div>
    <div class="flex flex-col overflow-auto">
      <div class="flex flex-col items-start p-2 borderBottom">
        <label>Type</label>
        <select class="w-full rounded p-1">
          <option>Statement</option>
          <option>Small Text</option>
          <option>Large Text</option>
          <option>Check Box</option>
          <option>Radio Button</option>
          <option>Date</option>
          <option>File</option>
        </select>
      </div>
      <div class="flex flex-col p-2 borderBottom">
        <label>Question</label>
        <textarea
          class="w-full rounded p-1 resize-none"
          placeholder="Question"
        ></textarea>
      </div>
      <div class="flex flex-col p-2 borderBottom">
        <label>Choices</label>
        <textarea
          class="w-full rounded p-1 resize-none"
          placeholder="Add Choices One Per Line"
        ></textarea>
      </div>
      <div class="flex flex-row p-2 justify-between borderBottom">
        <label for="">Required</label>
        <input
          type="checkbox"
          id="requiredswitch"
          class="switchcheckbox h-0 w-0 invisible"
        /><label
          for="requiredswitch"
          class="switchlabel cursor-pointer block rounded-full bg-rose-400 relative"
        ></label>
      </div>
      <div class="p-2 borderBottom">
        <div class="flex flex-row justify-between mb-2">
          <label for="">Max Characters</label>
          <input
            type="checkbox"
            id="maxcharacterswitch"
            class="switchcheckbox h-0 w-0 invisible"
          /><label
            for="maxcharacterswitch"
            class="switchlabel cursor-pointer block rounded-full bg-rose-400 relative"
          ></label>
        </div>
        <input
          class="w-full rounded p-1"
          placeholder="Number"
          type="number"
          min="0"
        />
      </div>
      <div class="p-2 borderBottom">
        <div class="flex flex-row justify-between mb-2">
          <label for="">Verification</label>
          <input
            type="checkbox"
            id="verificationswitch"
            class="switchcheckbox h-0 w-0 invisible"
          /><label
            for="verificationswitch"
            class="switchlabel cursor-pointer block rounded-full bg-rose-400 relative"
          ></label>
        </div>
        <div class="flex flex-col justify-between">
          <label for="" class="mb-2 hidden">Regex Expression</label>
          <input class="w-full rounded p-1" placeholder="Regex Expression" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
