<script setup>
const store = useApplicationsStore();
const loader = useGlobalLoader();

let interval = null;

onMounted(async () => {
  loader.value = true;
  
  try {
    await store.fetchApplications();
  } finally {
    loader.value = false;
  }

  interval = setInterval(() => {
    store.fetchApplications();
  }, 3000);

  
});

onUnmounted(async () => {
  clearInterval(interval);
});

</script>

<template>
  <div class="mainContent">
    <section class="dashboardHead">
      <h1 tabindex="0" aria-hidden="true">Repository Tokens</h1>
      <p tabindex="0">Manage and track token access across all repositories</p>
    </section>

    <div class="row g-3 align-items-center filterBars">
      <div class="col-12 col-lg">
      <div class="searchBar">
        <span class="searchIcon">
          <img src="../assets/img/searchIcon.svg" aria-hidden="true" />
        </span>
        <input
          type="text"
          placeholder="Search repositories..."
          class="searchInput"
          v-model="store.search"
          aria-label="Enter the repository name to search"
        />
      </div>
      </div>

      <div class="col-12 col-md-6 col-lg-auto">
      <div class="dropdown customDropdown">
        <button class="btn dropdown-toggle filterBtn" type="button" data-bs-toggle="dropdown">
          {{ store.selectedType }}
          <img src="../assets/img/dropdown.svg" class="dropdownArrow" aria-hidden="true" />
        </button>

        <ul class="dropdown-menu customMenu">
          <li>
            <button class="dropdown-item" @click="store.selectedType = 'All Types'">
            All Types
            </button>
          </li>

          <li>
            <button class="dropdown-item" @click="store.selectedType = 'Applications'">
            Applications
            </button>
          </li>

          <li>
            <button class="dropdown-item" @click="store.selectedType = 'Stacks'">
            Stacks
            </button>
          </li>

          <li>
            <button class="dropdown-item" @click="store.selectedType = 'Library'">
            Library
            </button>
          </li>

        </ul>
      </div>
      </div>


      <div class="col-12 col-md-6 col-lg-auto">
      <div class="dropdown customDropdown">
        <button class="btn dropdown-toggle filterBtn" type="button" data-bs-toggle="dropdown">
          {{ store.selectedStatus }}
          <img src="../assets/img/dropdown.svg" class="dropdownArrow" aria-hidden="true" />
        </button>

        <ul class="dropdown-menu customMenu">

          <li>
            <button class="dropdown-item" @click="store.selectedStatus = 'All Status'">
            All Status
            </button>
          </li>

          <li>
            <button class="dropdown-item" @click="store.selectedStatus = 'Available'">
            Available
            </button>
          </li>

          <li>
            <button class="dropdown-item" @click="store.selectedStatus = 'Not Available'">
            Not Available
            </button>
          </li>
          
        </ul>
      </div>
      </div>

    </div>

    <ApplicationTableList :appsList="store.filteredApplications" />
  </div>
</template>

<style lang="scss" scoped>
.mainContent {
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.dashboardHead {
  text-align: left;
  margin-bottom: 40px;

  h1 {
    font-size: 28px;
  }
  p {
    color: gray;
  }
}

.filterBars {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;

  width: 100%;
}

.searchBar {
  flex: 1;
  max-width: 900px;
  min-width: 300px;
  position: relative;

  .searchIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;

    img {
      width: 16px;
      height: 16px;
    }
  }
  .searchInput {
    width: 100%;
    padding: 10px 12px 10px 35px;
    border-radius: 8px;
    border: none;
    background-color: rgba(223, 227, 230, 0.374);
    box-sizing: border-box;
  }
}


.customDropdown {
  width: 170px;
}

.filterBtn {
  width: 100%;
  background-color: rgba(223, 227, 230, 0.374);
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    display: none;
  }
  &:focus{
    outline:2px solid black;
  }
}

.dropdownArrow {
  width: 14px;
  height: 14px;
}

.customMenu {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  .dropdown-item {
    border-radius: 10px;
    padding: 10px 14px;
    cursor: pointer;

    &:hover {
      background-color: rgba(223, 227, 230, 0.5);
    }
  }
}
</style>
