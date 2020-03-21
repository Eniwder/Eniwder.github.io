<template>
  <div class="card" :class="getColorClass" @click="copyRescueId()">
    <transition name="flowEff">
      <div v-show="this.flowEffFlg" class="flowEff"></div>
    </transition>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="icon" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ title }}</p>
          <p class="subtitle is-6">{{ name }} | {{ rescueId }}</p>
        </div>
      </div>

      <div class="columns is-multiline is-mobile">
        <div class="column">{{ startTimeText }}</div>
        <div class="column">{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'bulma-toast';

const Hour = 1000 * 60 * 60;
export default {
  props: ['contents'],
  mounted() {
    this.icon = 'https://bulma.io/images/placeholders/96x96.png'; // for dev
  },
  computed: {
    getColorClass() {
      const classes = ['danger', 'warn', 'normal', 'easy'];
      return _.shuffle(classes)[0];
    },
    startTimeText() {
      const d = new Date(this.start);
      const text =
        Math.abs(d.getTime() - Date.now()) < Hour
          ? '今から！'
          : `${d.getHours()}～`;
      return text;
    }
  },
  methods: {
    copyRescueId() {
      this.$clipboard(this.rescueId);
      toast({
        message: `Copied ID[${this.rescueId}]`,
        type: 'is-info',
        opacity: 0.8,
        duration: 800,
        position: 'bottom-right',
        animate: { in: 'fadeIn', out: 'fadeOut' }
      });
      this.showFlowEeffect();
    },
    showFlowEeffect() {
      this.flowEffFlg = true;
      this.$nextTick(function() {
        this.flowEffFlg = false;
      });
    }
  },
  data() {
    return {
      flowEffFlg: false,
      name: this.contents.name,
      icon: this.contents.icon,
      rescueId: this.contents.rescueId,
      start: this.contents.start,
      title: this.contents.title,
      content: this.contents.content
    };
  }
};
</script>

<style scoped>
.card::before {
  content: ' ';
  width: 100%;
  top: 0px;
  height: 6px;
  position: absolute;
}
.danger::before {
  background-color: hsl(348, 100%, 61%);
}
.warn::before {
  background-color: hsl(48, 100%, 67%);
}
.normal::before {
  background-color: hsl(141, 71%, 48%);
}
.easy::before {
  background-color: hsl(204, 86%, 53%);
}
.flowEff {
  height: 6px;
  width: 32px;
  position: absolute;
  top: 0;
  background-color: white;
}
.flowEff-enter-active,
.flowEff-leave-active {
  transition: all 1.5s;
}
.flowEff-enter {
  opacity: 0;
  transform: translate(-40px, 0px);
}
.flowEff-enter-active {
  opacity: 1;
}
.flowEff-leave-to {
  opacity: 0;
  transform: translateX(100vw);
}
.card {
  overflow: hidden;
}
</style>
