<template>
<body class="u-body u-xl-mode">
  <section class="u-align-center u-clearfix u-image u-shading u-section-11" src="" data-image-width="2048" data-image-height="1291" id="sec-faee">
    <div class="u-align-center u-clearfix u-sheet u-sheet-1">
      <h2 class="u-custom-font u-text u-text-default u-text-font u-text-1">NewsFeed</h2>
      <p @click="toggleModal" class="u-border-none u-btn u-button-style u-dialog-link u-hover-palette-1-dark-1 u-palette-1-base u-btn-1"><span class="u-file-icon u-icon u-text-white u-icon-1"><img src="@/assets/992651.png" alt="" ></span>&nbsp;Create Post
      </p>
      <p class="u-text u-text-default u-text-2"><span class="u-file-icon u-icon u-text-white u-icon-2"><img src="@/assets/833593.png" alt=""></span>&nbsp;{{new Date().toDateString()}}
      </p>
    </div>
  </section>
  <section v-if="showModal" class="u-align-center u-black u-clearfix u-container-style u-dialog-block u-opacity u-opacity-70 u-valign-middle u-dialog-section-7" id="sec-61c6">
    <div class="u-align-left u-border-2 u-border-grey-75 u-container-style u-dialog u-radius-5 u-shape-round u-white u-dialog-1">
      <div class="u-container-layout u-valign-middle u-container-layout-1">
        <div class="u-form u-form-1">
          <form action="#" autocomplete="off" method="POST" class="u-clearfix u-form-spacing-19 u-form-vertical u-inner-form" style="padding: 0px;" source="email" name="form">
            <div class="u-form-group u-form-name u-form-group-1">
              <input type="text" v-model="nameInput" placeholder="Enter your Name" id="name-3e72" name="name" class="u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5">
            </div>
            <div class="u-form-group u-form-group-2">
              <input type="text" v-model="titleInput" placeholder="Enter Title" id="message-3e72" name="title" class="u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5">
            </div>
            <div class="u-form-group u-form-message u-form-group-3">
              <textarea placeholder="Enter your message" v-model="messageInput" rows="4" cols="50" id="message-3e72" name="message" class="u-border-2 u-border-grey-25 u-input u-input-rectangle u-radius-5"></textarea>
            </div>
            <div class="u-align-center u-form-group u-form-submit u-form-group-4">
              <p @click="publishPost" class="u-btn u-btn-submit u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Publish<br>
              </p>
            </div>
          </form>
        </div>
      </div><button @click="toggleModal" class="u-dialog-close-button u-icon u-text-grey-50 u-icon-1">
      <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 413.348 413.348" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-1ce9"></use></svg>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 413.348 413.348" id="svg-1ce9"><path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg>
      </button>
    </div>
  </section> 
  <PostsList 
    :posts ="posts" 
    @heart-clicked="heartClicked" 
    @remove-post="removePost" 
    @edit-post="editPost" 
    @show-comments="showComments" 
    @add-comments="addComments" 
    @remove-comments="removeComments" 
    @edit-comments="editComments" 
    @save-data="saveData"/>
</body>
</template>
<script lang="ts">
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';
import Posts from '@/types/Posts'
import PostsList from '@/components/PostsList.vue'
import { isPromise } from '@vue/shared';

export default defineComponent({
  name: 'HomeView',
  components: {PostsList},
  setup() {
    const DATE = ref<Date>();
    const edit = ref(false);
    const editindex = ref<number>(0);
    const error = ref(null)
    const messageInput = ref<string>("");
    const nameInput = ref<string>("");
    const posts = ref<Posts[]>([])
    const showModal = ref(false);
    const strdate = ref<string>();
    const titleInput = ref<string>("");
    const error1= ref("")

    const saveData = () =>
    {
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(posts.value)
        })
    }

    const addComments = (index:number, commentInput: string) =>
    {
      posts.value[index].comments.unshift(commentInput)
      saveData()
    }

    const editComments = (index:number, editcomindex: number, commentEdit: string) =>
    {
      posts.value[index].comments.splice(editcomindex, 1, commentEdit)
      saveData()
    }

    const editPost = (index:number) =>
    {
      edit.value = true
      showModal.value = !showModal.value
      nameInput.value = posts.value[index].author
      titleInput.value = posts.value[index].title
      messageInput.value = posts.value[index].message
      editindex.value = index
      saveData()
    }
    
    const heartClicked = (index: number) =>
    {
      if(posts.value[index].liked == 0)
      {
        posts.value[index].heart++
        posts.value[index].liked = 1;
      }
      else
      {
        posts.value[index].heart--
        posts.value[index].liked = 0;
      }
    saveData()
    }

    const load = async() => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        error1.value = await data.json()
        console.log(JSON.stringify(error1.value))
        if(!data.ok || JSON.stringify(error1.value) == "{}"){
          throw Error('no data available')
        }
        let data1 = await fetch('http://localhost:3000/posts')
        posts.value = await data1.json()
      }
      catch(err: any) {
        error.value = err.message
        console.log(error.value)
      }
    }
    load()

     const publishPost = () =>
    {
      DATE.value = new Date()
      strdate.value = DATE.value.toDateString()
      if(DATE.value.getHours() >= 12)
      {
        strdate.value += " " + (DATE.value.getHours()-12) + ":" + DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " +
        "PM"
      }
      else
      {
        strdate.value += " " + DATE.value.getHours() + ":" + DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " +
        "AM"
      }
      posts.value.unshift({
      author: nameInput.value,
      title: titleInput.value,
      message: messageInput.value,
      heart: 0,
      liked: 0,
      date: strdate.value,
      showcoms: 0,
      comments: []
      })
      if(edit.value)
      {
        posts.value[0].heart = posts.value[editindex.value+1].heart
        posts.value[0].liked = posts.value[editindex.value+1].liked
        posts.value[0].showcoms = posts.value[editindex.value+1].showcoms
        posts.value[0].comments = posts.value[editindex.value+1].comments
        posts.value.splice(editindex.value+1, 1)
      }
      showModal.value = !showModal.value;
      edit.value = false
      saveData()
    }

    const removeComments = (index:number, comindex: number) =>
    {
      posts.value[index].comments.splice(comindex, 1)
      saveData()
    }

    const removePost = (index:number) =>
    {
      posts.value.splice(index,1)
      saveData()
    }

    const showComments = (index:number) =>
    {
      if(posts.value[index].showcoms == 0)
      {
        posts.value[index].showcoms = 1
      }
      else
      {
        posts.value[index].showcoms = 0
      }
      saveData()
    }

    const toggleModal = () =>
    {
      showModal.value = !showModal.value;
      nameInput.value = ""
      titleInput.value = ""
      messageInput.value = ""
    }

    return{posts, toggleModal, showModal, publishPost, nameInput, titleInput,messageInput, heartClicked, removePost, editPost, edit, showComments, addComments, removeComments, editComments, saveData}
  }
})
</script>
