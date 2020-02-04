<template>
  <div class="wrapper">
    <div class="posts">
      <div class="post-wrapper" v-for="p in filteredPosts" :key="p.id">
        <div class="post">
          <div class="avatar">
            <img src="http://placekitten.com/100/100" alt="">
          </div>
          <div class="user">{{ users[p.userId].name }}</div>
          <div class="title">{{ p.title }}</div>
          <div class="text">{{ p.body }}</div>
          <div class="open-comment" v-show="!comments[p.id] || !comments[p.id].commentsOpened">
            <a href="" @click.prevent="showComments(p.id)">Открыть комментарии</a>
          </div>
        </div>
        <div class="comments" v-if="comments[p.id] && comments[p.id].commentsOpened">
          <div class="comment" v-for="c in comments[p.id].comments" :key="c.id">
            <div class="avatar">
              <img src="http://placekitten.com/40/60" alt="">
            </div>
            <div class="body">
              <div class="title">{{ c.name }} <span class="talked">промурчал</span></div>
              <div class="text">{{ c.body }}</div>
            </div>
          </div>
          <div class="hide-comment">
            <a href="" @click.prevent="closeComments(p.id)">Скрыть комментарии</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <h3 class="filter-title">Фильтры</h3>
      <div class="input-wrap">
        <label for="name">Имя/Название</label>
        <input type="text" id="name" v-model="name">
        <label for="content">Контент</label>
        <input type="text" id="content" v-model="text">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Forum',
    data:() =>({
      users: {},
      posts: [],
      comments: {},
      name: null,
      text: null
    }),
    computed: {
      filteredPosts() {
        let filtered = this.posts;

        if (this.name) {
          filtered = filtered.filter((i) => {
            if (this.users[i.userId].name.includes(this.name) || i.title.includes(this.name)) {
              return true
            }
          })
        }

        if (this.text) {
          filtered = filtered.filter((i) => {
            if (i.body.includes(this.text)) {
              return true
            }
          })
        }

        return filtered;
      }
    },
    async mounted () {
      const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
      users.forEach((item)=>
        this.users[item.id] = item
      )
      this.posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
    },
    methods: {
      async showComments(postId) {
        if (!this.comments[postId]) {
          let comments = await (await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId)).json()
          this.comments = Object.assign({}, this.comments, {[postId]: {comments, commentsOpened: true}})
        } else {
          this.comments[postId].commentsOpened = true;
        }
      },
      closeComments(postId) {
        this.comments[postId].commentsOpened = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  %user {
    margin: 11px 0;
    color: #b9bfc4;
    font-size: 14px;
  }
  %link {
    text-decoration: none;
    color: #54a8ff;
    &:link, &:visited {
      color: #54a8ff;
    }
    &:visited {
      color: #54a8ff;
    }
  }
  .wrapper {
    display: flex;
    width: 1065px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .posts {
    margin-top: 24px;
    width: 100%;
    margin-right: 17px;
  }
  .post-wrapper {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .sidebar {
    padding: 18px 0 18px 16px;
    margin-top: 8px;
    width: 284px;
    background-color: #cccccc;
    box-shadow: -1px 0 #dadada;
    min-height: 140px;
    label {
      padding-top: 9px;
      padding-bottom: 2px;
      padding-left: 4px;
      display: block;
    }
    input {
      border: 1px #dbdbdb solid;
    }
  }
  .filter-title {
    margin: 0;
    font-weight: normal;
    font-size: 20px;
  }
  .post {
    background-color: #e6f5ff;
    border: 1px #d6e5ef solid;
    box-shadow: 1px 0 #f2f7fa;
    padding-right: 30px;
    position: relative;
  }
  .avatar {
    padding: 9px 8px 9px 18px;
    float: left;
  }
  .user {
    @extend %user;
  }
  .title {
    color: #333;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 7px;
  }
  .text {
    margin-bottom: 60px;
  }
  .open-comment {
    text-align: right;
    position: absolute;
    right: 18px;
    bottom: 14px;
    a {
      @extend %link;
    }
  }
  .comments {
    margin: 0 30px;
    .title {
      margin-top: 12px;
    }
    .talked {
      @extend %user;
      font-weight: normal;
    }
    .text {
      margin-bottom: 14px;
    }
  }
  .comment {
    background-color: #e6f5ff;
    display: flex;
    border: 1px #d6e5ef solid;
    border-top: none;
    box-shadow: 1px 0 #f2f7fa;
  }
  .hide-comment {
    text-align: right;
    padding: 6px 0;
    margin-bottom: 50px;
    a {
      @extend %link;
      background-color: #e6f5ff;
      padding: 6px 9px;
    }
  }

  @media screen and (min-width: 1080px) {
    .input-wrap {
      position: fixed;
    }
  }

  @media all and (max-width: 1080px){
    .wrapper {
      width: 720px;
      justify-content: space-around;
      flex-flow: row-reverse wrap-reverse;
    }
    .posts {
      margin-top: 18px;
      margin-right: 0;
    }
  }

  @media all and (max-width: 840px){
    .wrapper {
      width: 432px;
      justify-content: space-around;
      flex-flow: row-reverse wrap-reverse;
    }
    .posts {
      margin-top: 16px;
    }
    .post {
      padding-right: 20px;
    }
    .text {
      clear: both;
      padding-left: 18px;
      margin-bottom: 36px;
    }
    .comments .text {
      padding-left: 0;
    }
  }
</style>
