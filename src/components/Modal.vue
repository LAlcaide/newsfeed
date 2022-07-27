<template>
<section v-if="showModal" class="u-align-center u-black u-clearfix u-container-style u-dialog-block u-opacity u-opacity-70 u-valign-middle u-dialog-section-7" id="sec-61c6">
    <div class="u-align-left u-border-2 u-border-grey-75 u-container-style u-dialog u-radius-5 u-shape-round u-white u-dialog-1">
      <div class="u-container-layout u-valign-middle u-container-layout-1">
        <div class="u-form u-form-1">
          <form action="#" autocomplete="off" method="POST" class="u-clearfix u-form-spacing-19 u-form-vertical u-inner-form" style="padding: 0px;" source="email" name="form">
            <div class="u-form-group u-form-name u-form-group-1">
              <input type="text" v-model="nameInput" placeholder="Enter your Name" id="name-3e72" name="name" class="has-validation u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5">
            </div>
            <div class="u-form-group u-form-group-2">
              <input type="text" v-model="titleInput" placeholder="Enter Title" id="message-3e72" name="title" class="has-validation u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5">
            </div>
            <div class="u-form-group u-form-message u-form-group-3">
              <textarea placeholder="Enter your message" v-model="messageInput" rows="4" cols="50" id="message-3e72" name="message" class="has-validation u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5"></textarea>
            </div>
            <div class="u-align-center u-form-group u-form-submit u-form-group-4">
              <p @click="publishPost(nameInput, titleInput, messageInput)" class="u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Publish<br>
              </p>
            </div>
          </form>
          <div v-if="errorpost"><br><br><br><div class="u-form-send-error u-form-send-message"> Unable to publish your post. Please fix errors then try again. </div></div>
          <div v-if="nochanges"><br><br><br><div class="u-form-send-error u-form-send-message"> No changes detected. Please make some changes to publish. </div></div>
        </div>
      </div><button @click="toggleModal" class="u-dialog-close-button u-icon u-text-grey-50 u-icon-1">
      <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 413.348 413.348" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-1ce9"></use></svg>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 413.348 413.348" id="svg-1ce9"><path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg>
      </button>
    </div>
  </section> 
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    emits: ["publish-post", "toggle-modal"],
    props: ["showModal","nameInput", "titleInput", "messageInput", "edit"],
    setup(props, {emit}) {
        const messageInput = ref<string>("");
        const nameInput = ref<string>("");
        const titleInput = ref<string>("")
        const errorpost = ref<boolean>(false)
        const nochanges = ref<boolean>(false)
        
        watch(
            () => props.edit, 
            (val, oldVal) => {
                if(val == true)
                {
                    nameInput.value = props.nameInput
                    titleInput.value = props.titleInput
                    messageInput.value = props.messageInput
                }
            }
        )
        const publishPost = (nameInputs: string, titleInputs: string, messageInputs: string) =>
        {
            if(props.edit)
            {
              if(nameInputs == props.nameInput && 
              titleInputs == props.titleInput && 
              messageInputs == props.messageInput)
              {
                nochanges.value = true
              }
              else
              {
                nochanges.value = false
              }
            }
            let forms = document.querySelectorAll('.has-validation')
            Array.prototype.slice.call(forms).forEach(function(form:any) {
                form.classList.remove("has-error")
                if(form.value.trim() == '' || nochanges.value)
                {
                    form.classList.add("has-error")
                }
            })
            if(nameInputs.trim() != '' && titleInputs.trim() != '' && messageInputs.trim() != '' && !nochanges.value)
            {
                emit("publish-post", nameInputs, titleInputs, messageInputs)
                nameInput.value = ""
                titleInput.value = ""
                messageInput.value = ""
            }
        }
        const toggleModal = () =>
        {
            nameInput.value = ""
            titleInput.value = ""
            messageInput.value = ""
            errorpost.value = false
            nochanges.value = false
            emit("toggle-modal")
        }
        return {messageInput, nameInput, titleInput, errorpost, publishPost, toggleModal, nochanges}
    },
})
</script>
