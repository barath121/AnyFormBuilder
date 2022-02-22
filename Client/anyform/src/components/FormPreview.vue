<script setup>
import FormPageContent from "./FormPageContent.vue"
</script>
<template>
    <div class="flex border">
                <div class="flex flex-col">
                    <div class="flex text-center justify-between p-2 borderBottom ">
                        <h1>Questions</h1>
                        <i class="fa-regular fa-square-plus fa-2x"></i>
                    </div>
                    <div class="flex flex-col overflow-y-auto colorWhite">
                        <a href="#">
                        <div class="flex flex-row borderBottom ">
                            <div class=" flex flex-row">
                                <div class="divpreview ">
                                    <div class="h-60 w-64 rounded questionpagepreview">
                                        <div class="flex flex-col h-full rounded justify-center items-center">
                                            <FormPageContent/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>    
                        
                    </div>
                </div>
            </div>
</template>