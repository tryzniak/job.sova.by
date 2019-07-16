<template>
  <Layout>
  <div class="vc-search">
    <div class="vc-search__header">
      <div class="vc-search__description">
        <h1>Вакансии для людей с инвалидностью</h1>
        <p>
          Наш ресурс разработан инклюзивной веб-студией
          <a class="vc-search__link" href="https://sova.by/">SovaTeam.by</a> под
          эгидой дистанционного образовательного проекта
          <a class="vc-search__link" href="https://sova.by/">«У Совы»</a>. Мы
          сотрудничаем с компаниями по всей Беларуси и предоставляем максимально
          полный объём вакансий, доступных для людей с различными формами
          инвалидности. Возможно именно у нас Вы найдёте то, что требуется
          именно Вам!
        </p>
      </div>
      <img
        src="@/assets/images/content.png"
        alt="Вакансии для людей с инвалидностью"
      />
    </div>
    <vc-filters
      v-if="dataDownloaded"
      :availableFilterValues="availableFilterValues"
      :allCheckboxValues="allCheckboxValues"
      @onSelect="onSelect"
      @onResetSelect="onResetSelect"
    ></vc-filters>
    <div class="vc-search__body">
      <div class="vc-search__panel">
        <div class="vc-search__counts">
          Количество фирм: {{ totalFilteredCompanies }}
        </div>
        <div class="vc-form__row">
          На странице
          <select class="vc-form__select" v-model="maxCompaniesPerPage">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
      </div>
      <vc-results v-if="dataDownloaded" :companies="companiesWithPage">
        <ClientOnly>
        <vc-paginate
          :totalPage="totalPages"
          prevText="Предыдущая"
          nextText="Следующая"
          :pageRange="3"
          :maxPageWithoutDots="8"
          @btnClick="changePage"
          slot="pagination"
        ></vc-paginate>
        </ClientOnly>
      </vc-results>
    </div>
    <ClientOnly>
    <vc-map
      v-if="dataDownloaded"
      :companies="resultCompanies"
      :mapOptions="mapOptions"
    ></vc-map>
    </ClientOnly>
    <vc-partners></vc-partners>
    <ClientOnly><button-top-page></button-top-page></ClientOnly>
  </div>
  </Layout>
</template>

<script>
import VcFilters from "@/components/VcFilters";
import VcResults from "@/components/VcResults";
//import VcMap from "@/components/VcMap";
import VcPartners from "@/components/VcPartners";
//import VcPaginate from "vue-paginate-al";
import axios from "axios";
import "normalize.css";
import initCompanies from "../data/initialCompanies";

export default {
  name: "App",
  data() {
    return {
      initCompanies,
      templatePropForAllFilters: {
        region: [],
        disability: [],
        profession: [],
        education: [],
        recruitment: [],
        employment: [],
        place_work: [],
        working_conditions: [],
        experience: [],
        training: []
      },
      templatePropForCheckboxFilters: {
        recruitment: [],
        employment: [],
        place_work: [],
        working_conditions: [],
        experience: [],
        training: []
      },
      selectedFilters: {},
      currentPage: 1,
      maxCompaniesPerPage: 10,
      regionOptions: {
        Беларусь: { zoom: 7, coordinates: [53.870914, 27.702498] },
        Минск: { zoom: 11, coordinates: [53.902757, 27.543196] },
        "Минская область": { zoom: 8, coordinates: [53.870914, 27.702498] },
        "Брестская область": { zoom: 8, coordinates: [52.607137, 25.359578] },
        "Гродненская область": { zoom: 8, coordinates: [53.550373, 25.08917] },
        "Витебская область": { zoom: 8, coordinates: [55.207239, 29.372577] },
        "Могилевская область": { zoom: 8, coordinates: [53.894548, 30.330654] },
        "Гомельская область": { zoom: 8, coordinates: [52.439269, 30.1079] }
      },
      dataDownloaded: true
    };
  },
  computed: {
    resultCompanies() {
      if (this.dataDownloaded) {
        const selectedFilters = this.selectedFilters;
        let filteredCompanies = [];
        if (Object.keys(selectedFilters).length) {
          filteredCompanies = this.initCompanies.filter(companie => {
            const arrComparisonCompanies = [];
            for (let filter in selectedFilters) {
              let filterName = filter;
              if (/\d/.test(filterName)) {
                filterName = filter.slice(0, -1);
              }
              arrComparisonCompanies.push(
                ~companie[filterName].indexOf(selectedFilters[filter])
              );
            }
            if (~arrComparisonCompanies.indexOf(0)) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          filteredCompanies = this.initCompanies.filter(() => true);
        }
        return filteredCompanies;
      }
    },

    availableFilterValues() {
      if (this.dataDownloaded) {
        const resultFilters = JSON.parse(
          JSON.stringify(this.templatePropForAllFilters)
        );
        this.resultCompanies.forEach(companie => {
          for (let filter in resultFilters) {
            companie[filter].forEach(function(propertie) {
              if (
                !~resultFilters[filter].indexOf(propertie) &&
                propertie.length > 0
              ) {
                resultFilters[filter].push(propertie);
                resultFilters[filter].sort();
              }
            });
          }
        });
        return resultFilters;
      }
    },
    allCheckboxValues() {
      if (this.dataDownloaded) {
        const resultFilters = JSON.parse(
          JSON.stringify(this.templatePropForCheckboxFilters)
        );
        this.initCompanies.forEach(companie => {
          for (let filter in resultFilters) {
            companie[filter].forEach(function(propertie) {
              if (
                !~resultFilters[filter].indexOf(propertie) &&
                propertie.length > 0
              ) {
                resultFilters[filter].push(propertie);
                resultFilters[filter].sort();
              }
            });
          }
        });
        return resultFilters;
      }
    },
    totalFilteredCompanies() {
      if (this.dataDownloaded) {
        return this.resultCompanies.length;
      }
    },
    totalPages() {
      if (this.dataDownloaded) {
        return Math.ceil(
          this.totalFilteredCompanies / this.maxCompaniesPerPage
        );
      }
    },
    companiesWithPage() {
      if (this.dataDownloaded) {
        let fromCompanie = 0;
        if (this.currentPage > 1) {
          fromCompanie = this.maxCompaniesPerPage * (this.currentPage - 1);
        }
        const toCompanie = fromCompanie + this.maxCompaniesPerPage;
        return this.resultCompanies.slice(fromCompanie, toCompanie);
      }
    },
    mapOptions() {
      if (this.selectedFilters.region) {
        return this.regionOptions[this.selectedFilters.region];
      } else {
        return this.regionOptions["Беларусь"];
      }
    }
  },
  components: {
    VcFilters,
    VcResults,
    VcMap: () => import("@/components/VcMap").catch(),
    VcPaginate: () => import("vue-paginate-al").catch(),
    VcPartners,
    ButtonTopPage: () => import("@/components/ButtonTopPage").catch()
  },
  created() {
    this.getData();
  },
  mounted() {
    window.addEventListener("load", function() {
      document.body.style.opacity = 1;
    });
  },
  methods: {
    async getData() {
      const { data: arrCompanies } = await axios.get("api.php");
      arrCompanies.forEach(company => {
        company.recruitment = company.recruitment.split(",");
        company.region = company.region.split(",");
        company.coordinates = company.coordinates.split(", ");
        company.profession = company.profession.split(",").sort();
        company.training = company.training.split(",");
        company.disability = company.disability.split(",").sort();
        company.education = company.education.split(",");
        company.employment = company.employment.split(",");
        company.experience = company.experience.split(",");
        company.place_work = company.place_work.split(",");
        company.working_conditions = company.working_conditions.split(",");
      });

      this.initCompanies = arrCompanies;
      this.dataDownloaded = true;
    },
    onSelect(obj) {
      this.selectedFilters = Object.assign({}, this.selectedFilters, {
        [obj.name]: obj.value
      });
      this.resetPage();
    },
    onResetSelect(name) {
      delete this.selectedFilters[name];
      this.selectedFilters = Object.assign({}, this.selectedFilters);
      this.resetPage();
    },
    changePage(currenPage) {
      this.currentPage = currenPage;
    },
    resetPage() {
      this.currentPage = 1;
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto"),
    url("../assets/fonts/roboto_regular.woff2") format("woff2"),
    url("../assets/fonts/roboto_regular.woff") format("woff");
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: local("Roboto"), local("Roboto"),
    url("../assets/fonts/roboto_bold.woff2") format("woff2"),
    url("../assets/fonts/roboto_bold.woff") format("woff");
}

.vc-search__link {
  text-decoration: none;
  color: #3f5880;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
}

.vc-search__panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .vc-form__row {
    padding: 0;
    margin-bottom: -8px;
  }
  .vc-form__select {
    margin-left: 4px;
    width: 60px;
    background-position: 36px 7px;
  }
}

.vc-search {
  background-color: white;
  box-sizing: border-box;
  font-size: 16px;
  input,
  textarea,
  select,
  button {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
  .pagination {
    display: inline-block;
    padding-left: 20px;
    margin: 30px 0;
    border-radius: 4px;
    & > li {
      display: inline;
      & > a,
      & > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #3f5880;
        text-decoration: none;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        text-decoration: none;
      }
    }
  }
  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    z-index: 2;
    color: #23527c;
    background-color: #eeeeee;
    border-color: #dddddd;
  }
  a:hover {
    cursor: pointer;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    /*border-top-left-radius: 4px;*/
    /*border-bottom-left-radius: 4px;*/
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    /*border-top-right-radius: 4px;*/
    /*border-bottom-right-radius: 4px;*/
  }
  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: #777777;
    cursor: not-allowed;
    background-color: #ffffff;
    border-color: #dddddd;
  }
  .pagination .active a {
    z-index: 0;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 3;
    color: #ffffff;
    cursor: default;
    background-color: #3f5880;
    border-color: #3f5880;
  }
}

.vc-search__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
  box-sizing: border-box;
  min-height: 500px;
  margin-left: 295px;
  font-size: 18px;
  img {
    margin: 10px auto;
    max-height: 400px;
    max-width: 90%;
  }
}

.vc-search__counts {
  font-size: 30px;
}

.vc-search__body {
  margin-left: 295px;
}

.vc-search__description {
  margin: 40px 40px 40px 0;
  line-height: 1.4;
  max-width: 800px;
  h1 {
    margin: 0;
    padding: 0;
    line-height: 1;
    color: #3f5880;
    font-size: 42px;
  }
  p {
    font-size: 20px;
    line-height: 1.55;
  }
}

@media (max-width: 1200px) {
  .vc-search__body,
  .vc-search__header {
    margin-left: 0;
  }
}

@media (max-width: 900px) {
  .vc-search__header {
    flex-direction: column;
  }
  .vc-search__description {
    margin: 20px 0 0 0;
  }
}

@media (max-width: 600px) {
  .vc-search__header {
    h1 {
      font-size: 38px;
      line-height: 0.95;
    }
    p {
      font-size: 18px;
      line-height: 1.3;
    }
  }
  .vc-search {
    .pagination {
      li {
        &:first-of-type,
        &:last-of-type {
          a {
            font-size: 0;
            width: 35px;
            height: 36px;
            box-sizing: border-box;
            background: url(../assets/images/paginate-left.svg) no-repeat 9px 6px /
              auto 60%;
          }
        }
        &:last-of-type {
          a {
            background: url(../assets/images/paginate-right.svg) no-repeat 11px 6px /
              auto 60%;
          }
        }
      }
    }
  }
  .vc-search__panel {
    flex-direction: column;
    align-items: flex-start;
  }
  .vc-search__counts {
    font-size: 25px;
    margin-bottom: 5px;
  }
}
</style>
