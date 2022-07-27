<template>
<body class="u-body u-xl-mode">
  <section class="u-align-center u-clearfix u-image u-shading u-section-11" src="" data-image-width="2048" data-image-height="1291" id="sec-faee">
    <div class="u-align-center u-clearfix u-sheet u-sheet-1">
      <h2 class="u-custom-font u-text u-text-default u-text-font u-text-1">NewsFeed</h2>
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
                <router-link :to="{name: 'Home', params: {post: JSON.stringify(post)}}" class="u-blog-control u-btn u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1"><!--blog_post_readmore_content--><!--options_json--><!--{"content":"","defaultValue":"Read More"}--><!--/options_json-->&larr; Return<!--/blog_post_readmore_content--></router-link><!--/blog_post_readmore--><router-view />
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
import { defineComponent, PropType, ref, onMounted} from 'vue'
import Posts from '@/types/Posts';
import Comments from '@/components/Comments.vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
export default defineComponent({
  components: {Comments, Modal},
  props: ["posts"],
  setup(props)
  {
    
    const edit = ref(false);
    const DATE = ref<Date>();
    const editindex = ref<number>(0);
    const messageInput = ref<string>("");
    const nameInput = ref<string>("");
    const post = ref<Posts[]>([]);
    const route = useRoute()
    const router = useRouter()
    const showModal = ref(false);
    const strdate = ref<string>();
    const titleInput = ref<string>("");
    const userData = ref<string>();
    post.value =JSON.parse(props.posts)

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
      editindex.value - index
      edit.value = true
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

    const publishPost = (nameInput: string, titleInput: string, messageInput: string, nochanges: boolean) =>
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
          author: nameInput,
          title: titleInput,
          message: messageInput,
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
        edit.value = false
    }

    const removeComments = (index:number, comindex: number) =>
    {
      post.value[index].comments.splice(comindex, 1)
    }

    const removePost = (index:number) =>
    {
      post.value.splice(index,1)
      router.push({name: 'Home', params:{post: JSON.stringify(post.value)}})
    }

    const toggleModal = () =>
    {
      showModal.value = !showModal.value;
      edit.value = false
    }
    return{post, showModal, publishPost, nameInput, titleInput,
    messageInput, heartClicked, removePost, editPost, addComments, 
    removeComments, editComments, toggleModal, userData, edit}
  }
})
</script>

<style>

</style>