<template>
      <section class="u-clearfix u-section-3" id="sec-1c7c">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-container-style u-expanded-width u-grey-5 u-group u-radius-30 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <div class="u-form u-form-1">
              <form action="#" autocomplete="off" method="POST" class="u-clearfix u-form-horizontal u-form-spacing-10 u-inner-form" source="custom" name="form" style="padding: 10px;">
                <div class="u-form-group u-form-group-1">
                  <label for="text-511b" class="u-form-control-hidden u-label"></label>
                  <input v-if="!emptycomment" type="text" v-model="commentInput" placeholder="" id="text-511b" name="text" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white">
                  <input v-if="emptycomment" type="text" v-model="commentInput" placeholder="" id="text-511b" name="text" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" style="border-color: red">
                </div>
                <div class="u-align-center u-form-group u-form-submit">
                  <a @click="addComment(index, commentInput)" class="u-btn u-btn-submit u-button-style">Send</a>
                  <input type="submit" value="submit" class="u-form-control-hidden">
                </div>
                <input type="hidden" value="" name="recaptchaResponse">
              </form>
            </div>
            <div v-for="(comment, comindex) in comments" :key="comindex" class="u-container-style u-expanded-width u-group u-radius-10 u-shape-round u-white u-group-2" style="margin-bottom: 15px;">
              <div class="u-container-layout u-container-layout-2">
                <p class="u-text u-text-1" style="font-size: 15px">{{comment}}<br>
                </p><span @click="removeComment(index, comindex)" class="u-custom-color-1 u-file-icon u-hover-feature u-icon u-icon-circle u-text-white u-icon-1"><img src="@/assets/1665612.png" alt=""></span><span @click="togglecoms(comment, comindex)" class="u-file-icon u-hover-feature u-icon u-icon-rectangle u-icon-2"><img src="@/assets/1159633.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </section>
    <section v-if="editcoms" class="u-align-center u-black u-clearfix u-container-style u-dialog-block u-opacity u-opacity-70 u-dialog-section-8" id="sec-2e25">
      <div class="u-container-style u-dialog u-grey-5 u-dialog-1">
        <div class="u-container-layout u-container-layout-1">
          <div class="u-form u-form-1">
            <form action="#" method="POST" class="u-clearfix u-form-horizontal u-form-spacing-10 u-inner-form" style="padding: 10px" source="email" name="form">
              <div class="u-form-group u-form-message">
                <textarea v-if="!nochanges" v-model="commentEdit" id="email-8999" name="text" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"></textarea>
                <textarea v-if="nochanges" v-model="commentEdit" id="email-8999" name="text" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" style="border-color: red"></textarea>
              </div>
              <div class="u-align-left u-form-group u-form-submit">
                <a @click="updateComment(index, editcomindex, commentEdit, comments[editcomindex])" class="u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Submit</a>
                <input type="submit" value="submit" class="u-form-control-hidden">
              </div>
            </form>
          </div>
        </div><button @click="togglecoms('', 0)" class="u-dialog-close-button u-icon u-text-grey-40 u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 348.333 348.334" style="margin-top: 55px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-9711"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 348.333 348.334" x="0px" y="0px" id="svg-9711" style="enable-background:new 0 0 348.333 348.334;"><g><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"></path>
</g></svg></button>
      </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
export default defineComponent({
    emits: ["add-comment", "remove-comment", "edit-comment"],
    props: {
        comments: {
            required: true,
            type: Array as PropType<string[]>
        },
        index: {
            required: true,
            type: Number
        }
    },
    setup(props, {emit}) {
        const commentInput = ref<string>("");
        const commentEdit = ref<string>("");
        const editcoms = ref<boolean>(false);
        const emptycomment = ref<boolean>(false);
        const nochanges = ref<boolean>(false);
        const editcomindex = ref<number>(0);
        const addComment = (index: number, commentInputs: string) => {
          if(commentInputs.trim() == '')
          {
            emptycomment.value = true
          }
          else
          {
            emptycomment.value = false
            emit("add-comment", index, commentInputs)
          }
          commentInput.value = ""
        }
        const removeComment = (index: number, comindex: number) => {
          emit("remove-comment", index, comindex)
        }
        const togglecoms = (comment: string, comindex: number) => {
          editcoms.value = !editcoms.value
          commentEdit.value = comment 
          editcomindex.value = comindex
        }
        const updateComment = (index: number, editcomindex: number, commentEdits: string, comment: string) => {
          if(commentEdits.trim() == '' || commentEdits == comment)
          {
            nochanges.value = true
          }
          else
          {
            nochanges.value = false
            emit("edit-comment", index, editcomindex, commentEdits)
            editcoms.value = false
          }
        }
        return{addComment, commentInput, removeComment, editcoms, togglecoms, commentEdit, editcomindex, updateComment, emptycomment, nochanges}
    },
})
</script>
