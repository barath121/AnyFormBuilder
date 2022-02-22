<template>
    <div>
      <h1 class="text-3xl">Select One Option?</h1>
    <input disabled class="questionInput hidden" />
    <input disabled id="date" type="date" class="hidden" />
    <input disabled id="file" class="fileinput rounded hidden" type="file" />
    <textarea disabled class="questionTextinput rounded resize-none hidden"></textarea>
    <div class="flex flex-col hidden">
      <div>
        <input disabled id="rb1" type="radio" name="radiogrp" />
        <label for="rb1">Option 1</label>
      </div>
      <div>
        <input disabled id="rb2" type="radio" name="radiogrp" />
        <label for="rb2">Option 2</label>
      </div>
      <div>
        <input disabled id="rb3" type="radio" name="radiogrp" />
        <label for="rb3">Option 3</label>
      </div>
      <div>
        <input disabled id="rb4" type="radio" name="radiogrp" />
        <label for="rb4">Option 4</label>
      </div>
    </div>
    <div class="flex flex-col hidden">
      <div>
        <input disabled id="cb1" type="checkbox" />
        <label for="cb1">Option 1</label>
      </div>
      <div>
        <input disabled id="cb2" type="checkbox" />
        <label for="cb2">Option 2</label>
      </div>
      <div>
        <input disabled id="cb3" type="checkbox" />
        <label for="cb3">Option 3</label>
      </div>
      <div>
        <input disabled id="cb4" type="checkbox" />
        <label for="cb4">Option 4</label>
      </div>
    </div>
    </div>
</template>