<template>
  <div>
    <div class="config">
      <span>
        <button class="button" @click="resetPosition()">Now!</button>
      </span>
      <span>
        <label class="sliderLabel">Zoom</label>
        <input
          class="slider"
          v-model="ganttOptions.times.timeZoom"
          step="1"
          min="2"
          max="22"
          type="range"
        />
      </span>
    </div>
    <transition name="gantt">
      <loading-animation v-if="this.tasks.length===0"></loading-animation>
      <gantt-elastic
        v-else
        @chart-task-click="showDetail($event)"
        :tasks="tasks"
        :options="ganttOptions"
        ref="gantt"
      ></gantt-elastic>
    </transition>
  </div>
</template>

<script>
import GanttElastic from 'gantt-elastic';
import _ from 'lodash';

function getDate(hours) {
  const now = new Date();
  const [year, month, day] = [now.getFullYear(), now.getMonth(), now.getDay()];
  const timeStamp = new Date(year, month, day, 0, 0, 0).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}

export default {
  components: {
    GanttElastic
  },
  mounted() {
    if (this.tasks.length === 0) {
      this.$store.dispatch('updateTasks');
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setTasks') {
        this.tasks = state.tasks;
      }
    });
  },
  methods: {
    resetPosition() {
      this.$refs.gantt.scrollToTime(Date.now());
    },
    showDetail(e) {
      alert('追加で表示すべき情報があるならなにか実装');
    }
  },
  data() {
    return {
      tasks: this.$store.getters.tasks,
      ganttOptions: {
        taskList: {
          expander: {
            straight: false
          },
          columns: [
            {
              id: 1,
              label: 'ID',
              value: 'name',
              width: 110
            }
          ]
        },
        locale: {
          name: 'ja',
          Now: 'Asia/Tokyo',
          weekdays: ['日', '月', '火', '水', '木', '金', '土'].map(
            _ => `(${_})`
          ),
          months: _.range(1, 12)
        },
        times: {
          timeZoom: 2
        },
        scope: {
          after: 7
        }
      }
    };
  }
};
</script>

<style>
.config {
  margin-bottom: 1rem;
}

.config > span {
  margin-right: 1.5rem;
}

.slider {
  vertical-align: middle;
}
.sliderLabel {
  padding-bottom: calc(0.375em - 1px);
  padding-top: calc(0.375em - 1px);
}

.gantt-enter-active {
  transition: opacity 0.5s;
}
.gantt-leave-active {
  position: absolute;
}
.gantt-enter-enter,
.gantt-leave-to {
  opacity: 0;
}
</style>
