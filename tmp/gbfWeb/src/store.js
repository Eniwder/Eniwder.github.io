import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash'
import { basename } from 'path';

Vue.use(Vuex);

const Api = 'localhost:8080'

// for dev  /////////////////////////////
const Minutes = 1000 * 60;
const Hour = Minutes * 60;
const testTask = [
  {
    id: 1,
    name: '@えにたむ',
    start: Date.now(),
    duration: 30 * Minutes,
    type: 'task',
    label: 'アルバハH',
    style: {
      base: {
        fill: 'hsl(348, 100%, 61%)',
        stroke: 'none'
      }
    }
  },
  {
    id: 2,
    name: '@eniel',
    start: Date.now() + 5 * Hour,
    duration: 60 * Minutes,
    type: 'task',
    label: 'ルシH',
    style: {
      base: {
        fill: 'hsl(48, 100%, 67%)',
        stroke: 'none'
      }
    }
  }
];

axios.get = async url => {
  const api = _.last(url.split('/'));
  if (api === 'tasks') {
    return new Promise((rs, rj) => {
      setTimeout(() => rs(testTask), Math.random() * 2000)
    });
  } else {
    console.log('api is not found');
  }
}

/////////////////////////////////////////

export default new Vuex.Store({
  state: {
    user: '',
    tasks: [],
    reqruitment: []
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    reqruitment(state) {
      return state.reqruitment;
    },
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload.tasks;
    },
    setReqruitment(state, payload) {
      state.reqruitment = payload.reqruitment;
    },
  },
  actions: {
    async updateTasks({ commit }, context) {
      const tasks = await axios.get(`${Api}/tasks`)
      commit('setTasks', { tasks });
    },
  },
});
