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

const recsTest = [
  {
    id: 1,
    rescueId: '384A38B',
    name: '@えにたむ',
    start: Date.now(),
    title: 'アルバハH　180↑',
    content: '条件あるよ'
  },
  {
    id: 2,
    rescueId: '0F9457X',
    name: '@eniel',
    start: Date.now(),
    title: 'ルシH',
    content: '誰でも'
  }
];

const randomRec = nextId => ({
  id: nextId,
  rescueId: _.take(_.shuffle('123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('')), 7).join(''),
  name: '@' + _.take(_.shuffle('123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('')), parseInt(Math.random() * 3 + 4)).join(''),
  start: Date.now() + Math.random() * 5 * Hour,
  title: 'テストデータ',
  content: 'ほそくじこう'
})

axios.get = async url => {
  const api = _.last(url.split('/'));
  if (api.startsWith('tasks')) {
    return new Promise((rs, rj) => {
      setTimeout(() => rs(testTask), Math.random() * 2000)
    });
  } else if (api.startsWith('recs')) {
    const nid = parseInt(api.split('=')[1]);
    const ret = nid <= 0
      ? recsTest : _.range(nid, nid + parseInt(Math.random() * 3)).map(nid => randomRec(nid))
    return new Promise((rs, rj) => {
      setTimeout(() => rs(ret), Math.random() * 2000)
    });
  } else {
    console.log('api is not found');
  }
}

/////////////////////////////////////////
const MaxRecs = 100
export default new Vuex.Store({
  state: {
    user: '',
    tasks: [],
    recs: []
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    recs(state) {
      return state.recs;
    },
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload.tasks;
    },
    setRecs(state, payload) {
      state.recs.splice(0, 0, ...payload.recs);
      if (state.recs.length > MaxRecs) {
        state.recs.length = MaxRecs
      }
    },
  },
  actions: {
    async updateTasks({ commit }, context) {
      const tasks = await axios.get(`${Api}/tasks`)
      commit('setTasks', { tasks });
    },
    async updateRecs({ commit }, context) {
      const recs = await axios.get(`${Api}/recs?nid=${context.maxId + 1}`)
      commit('setRecs', { recs });
    },
  },
});
