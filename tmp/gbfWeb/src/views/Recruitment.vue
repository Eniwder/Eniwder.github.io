<template>
  <div>
    <p v-show="isMobile" class="buttons">
      <a class="button">
        <span class="icon">
          <i class="fas fa-plus-circle"></i>
        </span>
        <span @click="newpostM">新規投稿</span>
      </a>
      <a class="button">
        <span class="icon">
          <i class="fas fa-filter"></i>
        </span>
        <span @click="filterConfigM">フィルタ</span>
      </a>
    </p>
    <loading-animation v-if="this.recs.length===0"></loading-animation>
    <transition-group :name="recsTransName" class="columns is-multiline">
      <div v-show="!isMobile" class="column is-3" key="-1">
        <div class="newpost">
          <new-recruitment-post-card></new-recruitment-post-card>
        </div>
      </div>
      <div v-for="rec in recs" v-bind:key="rec.id" class="column is-3">
        <recruitment-card :contents="rec"></recruitment-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import RecruitmentCard from '@/components/RecruitmentCard.vue';
import NewRecruitmentPostCard from '@/components/NewRecruitmentPostCard.vue';
import _ from 'lodash';
const BulmaBreakpoint = 768;
export default {
  components: {
    RecruitmentCard,
    NewRecruitmentPostCard
  },
  computed: {
    isMobile() {
      return this.ww <= BulmaBreakpoint;
    },
    recsTransName() {
      return this.isMobile ? 'mobileRec' : 'otherRec';
    }
  },
  methods: {
    handleResize: _.throttle(function() {
      this.ww = window.innerWidth;
      this.wh = window.innerHeight;
    }, 200),
    newpostM() {
      alert('未定');
    },
    filterConfigM() {
      alert('未定');
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    if (this.recs.length === 0) {
      this.$store.dispatch('updateRecs', { maxId: -1 });
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setRecs') {
        this.recs = state.recs; // TODO データ無し時にもeventが起きてるなら修正
      }
    });
    this.intervalId = setInterval(
      function() {
        this.$store.dispatch('updateRecs', {
          maxId: _.maxBy(this.recs, r => r.id).id
        });
      }.bind(this),
      3000
    );
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.handleResize);
  },
  data() {
    return {
      recs: this.$store.getters.recs,
      maxId: -1,
      intervalId: undefined,
      ww: window.innerWidth,
      wh: window.innerHeight
    };
  }
};
</script>

<style scoped>
.buttons {
  margin-bottom: 0 !important;
}

.otherRec-enter-active,
.otherRec-leave-active,
.mobileRec-enter-active,
.mobileRec-leave-active {
  transition: all 2s;
}
.mobileRec-leave,
.mobileRec-leave-active {
  position: absolute;
  width: 90vw;
  transition: all 0.5s;
}
.otherRec-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.mobileRec-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.otherRec-leave-to,
.mobileRec-leave-to {
  transform: scaleY(0.5);
  opacity: 0;
}

.otherRec-move,
.mobileRec-move {
  transition: transform 1s;
}
</style>
