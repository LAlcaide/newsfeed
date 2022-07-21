<template>
<body class="u-body u-xl-mode">
  <section class="u-align-center u-clearfix u-image u-shading u-section-11" src="" data-image-width="2048" data-image-height="1291" id="sec-faee">
    <div class="u-align-center u-clearfix u-sheet u-sheet-1">
      <h2 class="u-custom-font u-text u-text-default u-text-font u-text-1">NewsFeed</h2>
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
<div v-for="(postt, postindex) in post" :key="postindex">
<section class="u-align-center u-clearfix u-section-2" v-if="postindex.toString() == userData">
      <div  class="u-clearfix u-sheet u-valign-middle u-sheet-1"><!--blog--><!--blog_options_json--><!--{"type":"Recent","source":"","tags":"","count":""}--><!--/blog_options_json-->
        <div class="u-blog u-expanded-width u-pagination-center u-blog-1">
          <div class="u-repeater u-repeater-1"><!--blog_post-->
            <div class="u-blog-post u-border-2 u-border-black u-container-style u-radius-39 u-repeater-item u-shape-round u-repeater-item-1">
              <div class="u-container-layout u-similar-container u-container-layout-1"><!--blog_post_header-->
                <h2 class="u-blog-control u-text u-text-1">
                  <a class="u-post-header-link" href="blog/my-first-day.html"><!--blog_post_header_content-->{{postt.title}}<!--/blog_post_header_content--></a>
                </h2><!--/blog_post_header--><!--blog_post_metadata-->
                <div class="u-blog-control u-metadata u-metadata-1"><!--blog_post_metadata_date-->
                  <span class="u-meta-date u-meta-icon"><!--blog_post_metadata_date_content-->{{postt.author}} | {{postt.date}}<!--/blog_post_metadata_date_content--></span><!--/blog_post_metadata_date-->
                </div><!--/blog_post_metadata--><span @click="removePost(postindex)" class="u-custom-color-1 u-file-icon u-hover-feature u-icon u-icon-circle u-text-white u-icon-1"><img src="@/assets/1665612.png" alt=""></span><span @click="editPost(postindex)" class="u-file-icon u-hover-feature u-icon u-icon-rectangle u-icon-2"><img src="@/assets/1159633.png" alt=""></span><!--blog_post_content-->
                <div class="u-blog-control u-post-content u-text u-text-2"><!--blog_post_content_content-->{{postt.message}}<!--/blog_post_content_content--></div><!--/blog_post_content--><span class="u-border-2 u-border-black u-file-icon u-hover-feature u-icon u-icon-circle u-text-black u-icon-3"><img src="@/assets/1450338.png" alt=""></span><span @click="heartClicked(postindex)" class="u-border-2 u-border-black u-file-icon u-hover-feature u-icon u-icon-circle u-text-black u-icon-4"><img src="@/assets/833300.png" alt=""></span><span v-if="postt.liked == 1" @click="heartClicked(postindex)" class="u-border-2 u-border-black u-file-icon u-icon u-icon-circle u-palette-2-base u-text-black u-icon-5"><img src="@/assets/833300.png" alt=""></span><!--blog_post_readmore-->
                <p class="u-align-center u-text u-text-3">{{postt.heart}}</p>
                <p class="u-align-center u-text u-text-4">{{postt.comments.length}}</p>
              </div>
            </div><!--/blog_post-->
          </div>
          <div class="u-list-control"></div>
        </div><!--/blog-->
        <Comments :comments="postt.comments" :index="postindex" @add-comment="addComments" @remove-comment="removeComments" @edit-comment="editComments"/>
      </div>
    </section>
</div>
</body>
</template>
<script lang="ts">
import { defineComponent, ref} from 'vue'
import Posts from '@/types/Posts';
import Comments from '@/components/Comments.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: {Comments},
  setup()
  {
    const DATE = ref<Date>();
    const editindex = ref<number>(0);
    const error = ref("")
    const messageInput = ref<string>("");
    const nameInput = ref<string>("");
    const post = ref<Posts[]>([]);
    const route = useRoute()
    const showModal = ref(false);
    const strdate = ref<string>();
    const titleInput = ref<string>("");
    const userData = ref<string>();
    userData.value = route.params.index.toString()
    
    const addComments = (index:number, commentInput: string) =>
    {
      post.value[index].comments.unshift(commentInput)
    }
    
    const editComments = (index:number, editcomindex: number, commentEdit: string) =>
    {
      post.value[index].comments.splice(editcomindex, 1, commentEdit)
    }

    const editPost = (index:number) =>
    {
      showModal.value = !showModal.value
      nameInput.value = post.value[index].author
      titleInput.value = post.value[index].title
      messageInput.value = post.value[index].message
      editindex.value = index
    }

    const heartClicked = (index: number) =>
    {
      if(post.value[index].liked == 0)
      {
        post.value[index].heart++
        post.value[index].liked = 1;
      }
      else
      {
        post.value[index].heart--
        post.value[index].liked = 0;
      }
    }

    const publishPost = () =>
    {
      DATE.value = new Date()
      strdate.value = DATE.value.toDateString()
      if(DATE.value.getHours() >= 12)
      {
        strdate.value += " " + (DATE.value.getHours()-12) + ":" + 
        DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " + "PM"
      }
      else
      {
        strdate.value += " " + DATE.value.getHours() + ":" + 
        DATE.value.getMinutes() + ":" + DATE.value.getSeconds() + " " + "AM"
      }
      post.value.unshift({
        author: nameInput.value,
        title: titleInput.value,
        message: messageInput.value,
        heart: 0,
        liked: 0,
        date: strdate.value,
        showcoms: 0,
        comments: []
      })
      post.value[0].heart = post.value[editindex.value+1].heart
      post.value[0].liked = post.value[editindex.value+1].liked
      post.value[0].showcoms = post.value[editindex.value+1].showcoms
      post.value[0].comments = post.value[editindex.value+1].comments
      post.value.splice(editindex.value+1, 1)
      showModal.value = !showModal.value;
      userData.value = '0'
    }

    const removeComments = (index:number, comindex: number) =>
    {
      post.value[index].comments.splice(comindex, 1)
    }

    const removePost = (index:number) =>
    {
      post.value.splice(index,1)
    }

    const toggleModal = () =>
    {
      showModal.value = !showModal.value;
      nameInput.value = ""
      titleInput.value = ""
      messageInput.value = ""
    }
    return{post, showModal, publishPost, nameInput, titleInput,
    messageInput, heartClicked, removePost, editPost, addComments, 
    removeComments, editComments, toggleModal, userData}
  }
})
</script>

<style>

</style>