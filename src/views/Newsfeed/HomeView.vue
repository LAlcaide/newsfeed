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
  <Modal
    :showModal="showModal"
    :nameInput="nameInput"
    :titleInput="titleInput"
    :messageInput="messageInput"
    :edit="edit"
    @publish-post="publishPost"
    @toggle-modal="toggleModal"/>
  <PostsList 
    :posts ="posts" 
    @heart-clicked="heartClicked" 
    @remove-post="removePost" 
    @edit-post="editPost" 
    @show-comments="showComments" 
    @add-comments="addComments" 
    @remove-comments="removeComments" 
    @edit-comments="editComments"/>
</body>
</template>
<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import Posts from '@/types/Posts'
import PostsList from '@/components/PostsList.vue'
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'HomeView',
  components: {PostsList, Modal},
  props: ["post"],
  setup(props) {

    const DATE = ref<Date>();
    const edit = ref(false);
    const editindex = ref<number>(0);
    const messageInput = ref<string>("");
    const nameInput = ref<string>("");
    const posts = ref<Posts[]>([])
    const showModal = ref(false);
    const strdate = ref<string>();
    const titleInput = ref<string>("");
       try
      {
        posts.value = JSON.parse(props.post)
      }
      catch(err)
      {
        console.log("no data available")
      }
    const addComments = (index:number, commentInput: string) =>
    {
      posts.value[index].comments.unshift(commentInput)
    }

    const editComments = (index:number, editcomindex: number, commentEdit: string) =>
    {
      posts.value[index].comments.splice(editcomindex, 1, commentEdit)
    }

    const editPost = (index:number) =>
    {
      edit.value = true
      showModal.value = !showModal.value
      nameInput.value = posts.value[index].author
      titleInput.value = posts.value[index].title
      messageInput.value = posts.value[index].message
      editindex.value = index
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
    }

     const publishPost = (nameInput: string, titleInput: string, messageInput: string) =>
    {
        DATE.value = new Date()
        strdate.value = DATE.value.toDateString()
        if(DATE.value.getHours() >= 12)
        {
          strdate.value += " " + (DATE.value.getHours()-12) + ":" + 
          DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " +
          "PM"
        }
        else
        {
          strdate.value += " " + DATE.value.getHours() + ":" + 
          DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " +
          "AM"
        }
        posts.value.unshift({
        author: nameInput,
        title: titleInput,
        message: messageInput,
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
        showModal.value = !showModal.value
        edit.value = false
    }

    const removeComments = (index:number, comindex: number) =>
    {
      posts.value[index].comments.splice(comindex, 1)
    }

    const removePost = (index:number) =>
    {
      posts.value.splice(index,1)
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
    }

    const toggleModal = () =>
    {
      showModal.value = !showModal.value;
      edit.value = false
    }

    return{posts, toggleModal, showModal, publishPost, nameInput, 
    titleInput,messageInput, heartClicked, removePost, editPost, 
    edit, showComments, addComments, removeComments, editComments}
  }
})
</script>
