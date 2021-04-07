<template>
  <div class="telephon">
    <modal v-model="openFacePictureVisible" :footer="false">
      <span slot="title">{{getFIO(openEmployee)}}</span>
      <img
        :src="getFacePicture(openEmployee.ID)"
        alt="..."
        class="img-rounded"
        @error="imageUrlAlt(openEmployee, $event)"
        style="width:100%"
      />
    </modal>

    <div class="row">
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading">Телефонный справочник</div>

          <div class="panel-body">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Найти"
                v-model="employees_filter"
              />
              <div class="input-group-btn">
                <button class="btn btn-default" type="submit">
                  <i class="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </div>

          <affix :offset="0" @affix="affix_teltable">
            <!-- ;top:0;width:100%;z-index: 999;min-width:100%;max-width:100% -->
            <table ref="xs_teltitletable">
              <thead>
                <table style="width:100%;min-height:50px" class="visible-xs visible-sm fixed">
                  <tr>
                    <th style="width:30%;" class="titleTab">ФИО</th>
                    <th style="width:70%;" class="titleTab">
                      <div>Отдел / Сектор / Группа / Должность</div>
                      <div>Телефон</div>
                      <div>Email</div>
                    </th>
                  </tr>
                </table>
              </thead>
            </table>
            <table ref="lg_teltitletable">
              <thead>
                <table style="width:100%;min-height:50px" class="visible-md visible-lg fixed">
                  <tr>
                    <th style="width:15%" class="titleTab">Фото</th>
                    <th style="width:25%" class="titleTab">ФИО</th>
                    <th style="width:30%" class="titleTab">Отдел / Сектор / Группа / Должность</th>
                    <th style="width:15%" class="titleTab">Телефон</th>
                    <th style="width:15%" class="titleTab">Email</th>
                  </tr>
                </table>
              </thead>
            </table>
          </affix>

          <!--div ref="af_teltitletable" style="background:green;min-width:200px;min-height:200px;position: absolute;"></div-->

          <!-- small table -->
          <table
            ref="xs_telbodytable"
            class="table table-hover table-condensed visible-xs visible-sm fixed"
          >
            <!--thead>
                <affix :offset="0">
                  <table>
                      <tr>
                        <th>ФИО</th>
                        <th>
                          <div>Отдел / Сектор / Группа / Должность</div>
                          <div>Телефон</div>
                          <div>Email</div>
                        </th>
                      </tr>
                  </table>
                </affix>
            </thead-->
            <!--thead>
              <tr>
                <th style="width:150px">ФИО</th>
                <th>
                  <div>Отдел / Сектор / Группа / Должность</div>
                  <div>Телефон</div>
                  <div>Email</div>
                </th>
              </tr>
            </thead-->
            <tbody>
              <tr v-for="(employee, index) in displayedEmployees" :key="index">
                <td style="width:30%">
                  <img
                    :src="getFaceThumbPicture(employee.ID)"
                    alt="..."
                    class="img-circle"
                    style="width: 40px; height: 45px;"
                    @error="imageUrlAlt(employee, $event)"
                    @click="openFacePicture(employee)"
                  />
                  <div class="hover" @click="employee.NameSenameShow=!employee.NameSenameShow">
                    {{employee.Fname}}
                    <span v-if="!employee.NameSenameShow">{{getShortIO(employee)}}</span>
                  </div>
                  <div v-if="employee.NameSenameShow" class="small wrap">
                    <div>{{employee.Name}}</div>
                    <div>{{employee.Sname}}</div>
                  </div>
                </td>
                <td style="width:70%">
                  <div
                    class="hover"
                    @click="employee.OtdelInfoShow=!employee.OtdelInfoShow"
                  >{{employee.Dolzh}}</div>
                  <div v-if="employee.OtdelInfoShow" class="small wrap">
                    <div>{{employee.Otdel}}</div>
                    <div v-if="employee.Otdel!=employee.Sector">{{employee.Sector}}</div>
                    <div v-if="employee.Otdel!=employee.Group">{{employee.Group}}</div>
                  </div>
                  <div
                    v-for="(telefon, index) in employee.Telefons"
                    :key="'T'+ index"
                    class="small wrap"
                  >{{telefon}}</div>
                  <div
                    v-for="(email, index) in employee.Emails"
                    :key="'E'+ index"
                    class="small wrap"
                  >{{email}}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- big table -->
          <table ref="lg_telbodytable" class="table table-hover visible-md visible-lg fixed">
            <!--thead>
              <tr>
                <th>Фото</th>
                <th>ФИО</th>
                <th>Отдел / Сектор / Группа / Должность</th>
                <th>Телефон</th>
                <th>Email</th>
              </tr>
            </thead-->
            <tbody>
              <tr v-for="(employee, index) in displayedEmployees" :key="index">
                <td style="width:15%">
                  <img
                    :src="getFaceThumbPicture(employee.ID)"
                    alt="..."
                    class="img-circle"
                    style="width: 50px; height: 60px;"
                    @error="imageUrlAlt(employee, $event)"
                    @click="openFacePicture(employee)"
                  />
                </td>
                <td style="width:25%">
                  <div class="hover" @click="employee.NameSenameShow=!employee.NameSenameShow">
                    {{employee.Fname}}
                    <span v-if="!employee.NameSenameShow">{{getShortIO(employee)}}</span>
                  </div>
                  <div v-if="employee.NameSenameShow" class="small wrap">
                    <div>{{employee.Name}}</div>
                    <div>{{employee.Sname}}</div>
                  </div>
                </td>
                <td style="width:30%">
                  <div
                    class="hover"
                    @click="employee.OtdelInfoShow=!employee.OtdelInfoShow"
                  >{{employee.Dolzh}}</div>
                  <div v-if="employee.OtdelInfoShow" class="small wrap">
                    <div>{{employee.Otdel}}</div>
                    <div v-if="employee.Otdel!=employee.Sector">{{employee.Sector}}</div>
                    <div v-if="employee.Otdel!=employee.Group">{{employee.Group}}</div>
                  </div>
                </td>
                <td style="width:15%">
                  <div
                    v-for="(telefon, index) in employee.Telefons"
                    :key="index"
                    class="small wrap"
                  >{{telefon}}</div>
                </td>
                <td style="width:15%;">
                  <div
                    v-for="(email, index) in employee.Emails"
                    :key="index"
                    class="small wrap"
                  >{{email}}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="panel-footer text-center">
            <ul class="pagination" v-if="pages.length>1">
              <li class="page-item">
                <button type="button" class="page-link" v-if="page != 1" @click="page--">⬅️</button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  class="page-link"
                  :key="pageNumber"
                  v-for="pageNumber in pages.slice(page-1, page+5)"
                  @click="page = pageNumber"
                >{{pageNumber}}</button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  @click="page++"
                  v-if="page < pages.length"
                  class="page-link"
                >➡️</button>
              </li>
            </ul>
          </div>
        </div>

        <div class="panel panel-default small" style="min-height:200px">
          <div class="panel-heading">
            Могут быть проблемы с отображением фотографий, т.к. они находятся на разных серверах, браузер блокирует это содержимое по безопасности.
            Откройте ссылки ниже и примите риски.
          </div>
          <div class="panel-body">
            <a
              href="https://www/res/birthdays/foto_guid/thumbs/6a876036-6883-4e3a-930e-378af0c9f978.jpeg"
              target="_blank"
            >фото 1</a>
            |
            <a
              href="https://www.ungg.net/res/birthdays/foto_guid/6a876036-6883-4e3a-930e-378af0c9f978.jpeg"
              target="_blank"
            >фото 2</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">

@import '/src/variables.scss';

/*https://stackoverflow.com/questions/21168521/table-fixed-header-and-scrollable-body*/
/*.tableFixHead          { overflow-y: auto; height: 100px; }
.tableFixHead thead th { position: sticky; top: 0; }
table  { border-collapse: collapse; width: 100%; }
th, td { padding: 8px 16px; }
th     { background:slategray; }*/

/*.tableFixHead,
.tableFixHead td {
  box-shadow: inset 1px -1px #000;
}
.tableFixHead th {
  box-shadow: inset 1px 1px #000, 0 1px #000;
}*/

/*.affix {
  background: red;
 position: fixed !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  top:0;
  width: inherit !important;  

    z-index: 999;

}*/

.titleTab {
  border: 2px double $title-foreground;
  background: $title-background;
  color: $title-foreground;
}

table.fixed {
  table-layout: fixed;
}
div.wrap {
  word-wrap: break-word;
}
thead tr th {
  text-align: center;
  vertical-align: middle;
}

button.page-link {
  /*display: inline-block;*/
  font-size: 16px;
  color: #327896;
  font-weight: 500;
  min-width: 35px;
  min-height: 35px;
}
.hover:hover {
  color: green;
  background: lightcyan;
  /*font-weight: bold;*/
  cursor: pointer;
}
/*.hover:after {
  color: lightgray;
  font-family: 'Glyphicons Halflings';
  content: "\e114";
}*/
/*.hover:hover:after {
  color: green;
  font-family: 'Glyphicons Halflings';
  content: "\e080";
}*/
/*.offset {
  width: 500px !important;
  margin: 20px auto;
}*/
</style>

<script>
import employees_json from "../assets/json/employees.json";

/*const Vue = window.Vue;
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
    console.log('Vue.directive scroll');
  }
})*/

export default {
  name: "PageTelephone",
  data() {
    return {
      show: true,
      openFacePictureVisible: false,
      openEmployee: { ID: "" },
      //info: null,
      employees: [], //employees_json,
      employees_filter: "",
      page: 1,
      perPage: 8,
      pages: [],
      empltable: [
        { name: "Name", label: "Имя", field: "Name" },
        { name: "Fname", label: "Фамилия", field: "Fname" },
        { name: "Sname", label: "Отчество", field: "Sname" },
        { name: "Dolzh", label: "Должность", field: "Dolzh" },
        { name: "Group", label: "Группа", field: "Group" },
      ],
    };
  },

  //рендер темплате
  //https://vuejs.org/v2/api/#updated
  updated: function () {
    this.affixUpdate();
  },

  /*directives:{
    scroll: {
      inserted: function (el){
        console.log("scroll");
        console.log(el);
        console.log(window.scrollY);
      }
    }
  },*/
  methods: {
    /*handleScroll: function (evt, el) {//handleScroll: function (evt, el)
      console.log(window.scrollY);
      console.log(evt);
      console.log(el);
      return true;
    },*/
    /*visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      console.log(entry)
    },*/
    affix_teltable() {
      /*console.log("->> affix_teltable");
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
        console.log("->> scroll");
        console.log("scrollTop="+document.documentElement.scrollTop);
        console.log("innerHeight="+window.innerHeight);
        console.log("offsetHeight="+document.documentElement.offsetHeight);
        console.log(bottomOfWindow);*/
    },
    load() {
      window.onload = () => {
        //console.log("->> load");
        this.affixUpdate();
      };
    },
    resize() {
      window.onresize = () => {
        //console.log("->> resize");
        this.affixUpdate();
      };
    },
    scroll() {
      window.onscroll = () => {
        //event
        //console.log(event);
        /*let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        console.log("->> scroll");
        console.log("scrollTop="+document.documentElement.scrollTop);
        console.log("innerHeight="+window.innerHeight);
        console.log("offsetHeight="+document.documentElement.offsetHeight);
        console.log(bottomOfWindow);*/
        //this.affixUpdate();
      };
    },

    affixUpdate() {
      if (
        this.$refs.xs_teltitletable != null &&
        this.$refs.xs_telbodytable != null
      ) {
        this.$refs.xs_teltitletable.setAttribute(
          "width",
          this.$refs.xs_telbodytable.clientWidth
        );
      }
      if (
        this.$refs.lg_teltitletable != null &&
        this.$refs.lg_telbodytable != null
      ) {
        this.$refs.lg_teltitletable.setAttribute(
          "width",
          this.$refs.lg_telbodytable.clientWidth
        );
      }
    },

    openFacePicture(empl) {
      this.openFacePictureVisible = true;
      this.openEmployee = empl;
    },
    setPages() {
      let numberOfPages = Math.ceil(
        this.filteredEmployees.length / this.perPage
      );
      this.pages = [];
      this.page = 1;
      //console.log("numberOfPages=" + numberOfPages + " this.pages="+this.pages.length);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
      // проверка watch this.employees.push({});
    },

    paginate(employees) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      //console.log("paginate from=" + from + " to=" + to);
      return employees.slice(from, to);
    },

    employeeCollection(empls) {
      for (var index = 0; index < empls.length; index++) {
        // empls[index].par1 = '123'
        this.$set(empls[index], "OtdelInfoShow", false);
        this.$set(empls[index], "NameSenameShow", false);
      }
      this.employees = empls;
    },

    getFIO(empl) {
      return empl.Fname + " " + empl.Name + " " + empl.Sname;
    },
    getShortIO(empl) {
      return empl.Name.substr(0, 1) + ". " + empl.Sname.substr(0, 1) + ".";
    },

    getFaceThumbPicture(id) {
      var url = "https://www/res/birthdays/foto_guid/thumbs/" + id + ".jpeg";
      return url;
    },
    getFacePicture(id) {
      var url = "https://www.ungg.net/res/birthdays/foto_guid/" + id + ".jpeg";
      return url;
    },
    //https://www.ungg.net/res/birthdays/foto_guid/ba65ff4b-d532-41e2-8fdd-02263f281db9.jpeg

    //ошибочное изображение
    imageUrlAlt(empl, event) {
      event.target.src = require(empl.Pol === "М"
        ? "../assets/no-foto-m.png"
        : "../assets/no-foto-w.png");
    },
    /*imageUrlAlt(empl, event) {
      event.target.src = require(empl.Pol === "М"
        ? "../assets/no-foto-m.png"
        : "../assets/no-foto-w.png").substr(1);
    },*/
  },

  mounted() {
    this.scroll();
    this.resize();
    this.load();
  },

  computed: {
    filteredEmployees() {
      //console.log("displayedEmployees employees_filter="+this.employees_filter);
      let empl = this.employees.filter(
        (empl) =>
          empl.Name.toUpperCase().includes(
            this.employees_filter.toUpperCase()
          ) ||
          empl.Fname.toUpperCase().includes(
            this.employees_filter.toUpperCase()
          ) ||
          empl.Sname.toUpperCase().includes(
            this.employees_filter.toUpperCase()
          ) ||
          this.getFIO(empl)
            .toUpperCase()
            .includes(this.employees_filter.toUpperCase())
      );
      return empl;
    },
    displayedEmployees() {
      //console.log("displayedEmployees employees_filter="+this.employees_filter);
      /*let empl = this.employees.filter(empl => 
        (
          empl.Name.toUpperCase().includes(this.employees_filter.toUpperCase()) ||
          empl.Fname.toUpperCase().includes(this.employees_filter.toUpperCase()) ||
          empl.Sname.toUpperCase().includes(this.employees_filter.toUpperCase()) ||
          this.getFIO(empl).toUpperCase().includes(this.employees_filter.toUpperCase())
        )
      );*/
      return this.paginate(this.filteredEmployees);
    },
  },

  watch: {
    //не работает???
    employees() {
      //console.log("watch employees length="+this.employees.length);
      this.setPages();
    },
    employees_filter() {
      //console.log("watch employees_filter="+this.employees_filter);
      this.setPages();
    },
  },

  created() {
    this.employeeCollection(employees_json);
    this.setPages();
  },

  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>