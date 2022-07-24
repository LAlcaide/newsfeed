<template>
<section class="u-align-center u-clearfix u-section-2" id="carousel_b3c0" v-for="(post, index) in posts" :key="index">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1"><!--blog--><!--blog_options_json--><!--{"type":"Recent","source":"","tags":"","count":""}--><!--/blog_options_json-->
        <div class="u-blog u-expanded-width u-pagination-center u-blog-1">
          <div class="u-repeater u-repeater-1"><!--blog_post-->
            <div class="u-blog-post u-border-2 u-border-black u-container-style u-radius-39 u-repeater-item u-shape-round u-repeater-item-1">
              <div class="u-container-layout u-similar-container u-container-layout-1"><!--blog_post_header-->
                <h2 class="u-blog-control u-text u-text-1">
                  <a class="u-post-header-link" href="blog/my-first-day.html"><!--blog_post_header_content-->{{post.title}}<!--/blog_post_header_content--></a>
                </h2><!--/blog_post_header--><!--blog_post_metadata-->
                <div class="u-blog-control u-metadata u-metadata-1"><!--blog_post_metadata_date-->
                  <span class="u-meta-date u-meta-icon"><!--blog_post_metadata_date_content-->{{post.author}} | {{post.date}}<!--/blog_post_metadata_date_content--></span><!--/blog_post_metadata_date-->
                </div><!--/blog_post_metadata--><span @click="removePost(index)" class="u-custom-color-1 u-file-icon u-hover-feature u-icon u-icon-circle u-text-white u-icon-1"><img src="@/assets/1665612.png" alt=""></span><span @click="editPost(index)" class="u-file-icon u-hover-feature u-icon u-icon-rectangle u-icon-2"><img src="@/assets/1159633.png" alt=""></span><!--blog_post_content-->
                <div class="u-blog-control u-post-content u-text u-text-2"><!--blog_post_content_content-->{{post.message}}<!--/blog_post_content_content--></div><!--/blog_post_content--><span @click="showComments(index)" class="u-border-2 u-border-black u-file-icon u-hover-feature u-icon u-icon-circle u-text-black u-icon-3"><img src="@/assets/1450338.png" alt=""></span><span @click="heartClicked(index)" class="u-border-2 u-border-black u-file-icon u-hover-feature u-icon u-icon-circle u-text-black u-icon-4"><img src="@/assets/833300.png" alt=""></span><span v-if="post.liked == 1" @click="heartClicked(index)" class="u-border-2 u-border-black u-file-icon u-icon u-icon-circle u-palette-2-base u-text-black u-icon-5"><img src="@/assets/833300.png" alt=""></span><!--blog_post_readmore-->
                <router-link :to="{name: 'Post', params: {index:index, name: JSON.stringify(posts)}}" class="u-blog-control u-btn u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1"><!--blog_post_readmore_content--><!--options_json--><!--{"content":"","defaultValue":"Read More"}--><!--/options_json-->Read More<!--/blog_post_readmore_content--></router-link><!--/blog_post_readmore--><router-view />
                <p class="u-align-center u-text u-text-3">{{post.heart}}</p>
                <p class="u-align-center u-text u-text-4">{{post.comments.length}}</p>
              </div>
            </div><!--/blog_post-->
          </div>
          <div class="u-list-control"></div>
        </div><!--/blog-->
        <Comments v-if="post.showcoms == 1" :comments="post.comments" :index="index" @add-comment="addComments" @remove-comment="removeComments" @edit-comment="editComments"/>
      </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import Posts from '@/types/Posts'
import Comments from '@/components/Comments.vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
    emits: ["heart-clicked", "remove-post", "edit-post", "show-comments", "add-comments", "remove-comments", "edit-comments", "show-post", "save-data", "share-data"],
    components: {Comments},
    props: {
        posts: {
            required: true,
            type: Array as PropType<Posts[]>
        }
    },
    setup(props, {emit}) {
        const router = useRouter()
        const route = useRoute()
        const shareData = (index: number) => {
            emit("share-data", index)
        }
        const heartClicked = (index:number) => {
            emit("heart-clicked", index)
        }
        const removePost = (index: number) => {
          emit("remove-post", index)
        }
         const editPost = (index: number) => {
          emit("edit-post", index)
        }
        const showComments = (index: number) => {
          emit("show-comments", index)
        }
        const addComments = (index: number, commentInput: string) => {
          emit("add-comments", index, commentInput)
        }
        const removeComments = (index: number, comindex: number) => {
          emit("remove-comments", index, comindex)
        }
        const editComments = (index: number, editcomindex: number, commentEdit: string) => {
          emit("edit-comments", index, editcomindex, commentEdit)
        }
        const showPost = (index: number, editcomindex: number, commentEdit: string) => {
          emit("show-post", index, editcomindex, commentEdit)
        }
        return{heartClicked, removePost, editPost, showComments, addComments, removeComments, editComments, shareData}
    }
})
</script>

<style>

</style>