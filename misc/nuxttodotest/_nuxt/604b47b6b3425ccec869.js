(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{364:function(e,t,n){"use strict";n.r(t);var o={data:function(){return{type:"month",types:["month","week","day","4day"],mode:"stack",modes:["stack","column"],weekday:[0,1,2,3,4,5,6],weekdays:[{text:"Sun - Sat",value:[0,1,2,3,4,5,6]},{text:"Mon - Sun",value:[1,2,3,4,5,6,0]},{text:"Mon - Fri",value:[1,2,3,4,5]},{text:"Mon, Wed, Fri",value:[1,3,5]}],value:"",colors:["blue","indigo","deep-purple","cyan","green","orange","grey darken-1"]}},methods:{rnd:function(a,b){return Math.floor((b-a+1)*Math.random())+a},formatDate:function(a,e){return e?"".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-").concat(a.getDate()," ").concat(a.getHours(),":").concat(a.getMinutes()):"".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-").concat(a.getDate())}},computed:{todos:function(){var e=this;return this.$store.state.todo.list.map((function(t){return{name:t.title,start:e.formatDate(new Date(t.limit)),color:e.colors[e.rnd(0,e.colors.length-1)]}}))}}},r=n(57),c=n(79),l=n.n(c),d=n(130),v=n(362),h=n(115),m=n(363),f=n(29),y=n(273),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-sheet",{staticClass:"d-flex",attrs:{tile:"",height:"54",color:""}},[n("v-btn",{staticClass:"ma-2",attrs:{icon:""},on:{click:function(t){return e.$refs.calendar.prev()}}},[n("v-icon",[e._v("mdi-chevron-left")])],1),e._v(" "),n("v-select",{staticClass:"ma-2",attrs:{items:e.types,dense:"",outlined:"","hide-details":"",label:"type"},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{staticClass:"ma-2",attrs:{icon:""},on:{click:function(t){return e.$refs.calendar.next()}}},[n("v-icon",[e._v("mdi-chevron-right")])],1)],1),e._v(" "),n("v-sheet",{attrs:{height:"600"}},[n("v-calendar",{ref:"calendar",attrs:{weekdays:e.weekday,type:e.type,events:e.todos,"event-overlap-mode":e.mode,"event-overlap-threshold":30,"event-color":function(e){return e.color}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;l()(component,{VBtn:d.a,VCalendar:v.a,VIcon:h.a,VSelect:m.a,VSheet:f.a,VSpacer:y.a})}}]);