<script setup>

const store = useApplicationsStore()
const {user} = useUserSession()

const props = defineProps({
  appsList:{
    type: Array,
  }
})

const { showMsg, message, isError, showSuccess, showError, closeNotification } = useNotification()

const handleMerge = async (applicationName) =>{
  try{
    const response = await store.mergeApplication(applicationName);

    showSuccess(response.message)

  } catch(err){

    showError(err?.data?.statusMessage)
    
  }

}

const formatDateTime = (date) => {
  if (!date) return null

  const dt = new Date(date)

  return {
    date: dt.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }),

    time: dt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }
}

const formattedApplications = computed(() =>
  props.appsList.map(app => ({
    ...app,
    formattedDateTime: formatDateTime(app.mergedAt)
  }))
)


</script>


<template>
  <div class="tableContainer" >
  <table class="applicationTable" >

    <thead class="tableHead">
       <tr>
        <th>Repository Name</th>
        <th>Type</th>
          <th>Description</th>
          <th>Token Status</th>
          <th>Token Holder</th>
          <th>Taken At</th>
          <th>Actions</th>
          <th>Repository Link</th>
       </tr>
    </thead>

    <tbody class="tableBody">
       <tr v-for="application in formattedApplications" :key="application.name">
        <td>{{ application.name }}</td>
        <td>
            <span class="typeBadge" :class="application.type.toLowerCase()">{{ application.type}}</span>
          </td>
        <td> {{ application.description }}</td>
        <td> <span class="statusBadge" :class="application.status.toLowerCase().replace(' ', '-')">{{ application.status }} </span>
          
        </td>
        <td> {{ application.mergedBy || '-'}}</td>

        <td> 
          <div v-if="application.formattedDateTime" class="dateTimeBox">
    
            <span class="dateText">
              {{ application.formattedDateTime.date }}
            </span>

            <span class="timeText">
              {{ application.formattedDateTime.time }}
            </span>

          </div>

          <span v-else>-</span>
        </td>

        <td><button @click="handleMerge(application.name,application)" :disabled="application.merged && application.mergedBy !== user.name"  :class="application.merged ? 'mergedBtn' : 'mergeBtn'" role="button" :aria-label= "application.merged ? 'Token is taken' : 'Click to take token'" >
          <div class="btnContent">
            <img src="../assets/img/lock.svg" aria-hidden = "true"/>
            <span>{{ application.merged ? 'Taken' : 'Take' }}</span>
          </div> </button>
        </td>

        <td>
          <div class="repoLinkColumn">

          <a :href="application.repositoryLink" target="_blank" rel="noopener noreferrer" aria-label="Open repository">
            <img src="../assets/img/redirectLinkIcon.svg" class="repoLinkIcon" aria-hidden="true"/>

          </a>
          </div>
        </td>

        
       </tr>
    </tbody>
  </table>
  <p v-if="formattedApplications.length === 0">No such repository is there !!!</p>
  </div>
   <div v-if="showMsg" class="alert notification d-flex justify-content-between align-items-center"
  :class="isError ? 'alert-danger' : 'alert-success'">
     <span>{{ message }}</span>
     <button type="button" class="closeBtn" @click="closeNotification" aria-label="Close Notification"><img src="../assets/img/crossIcon.svg" aria-hidden="true" />
     </button>
   </div>

</template>


<style lang ="scss" scoped >
 
 .tableContainer{
  width:100%;
  border-radius: $border-radius-lg;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: $box-shadow-primary;
  margin: 20px auto;
  
}

.applicationTable{
  width:100%;
  min-width: 1000px;
  border-collapse: collapse;

}

.tableHead{
  
  text-align: left;
  border-bottom: 1px solid black;
}
th{
  padding: 16px;

}
td{
  padding:12px;
  border-bottom: 1px solid rgb(224, 222, 222);
}
/* tbody tr:nth-child(odd){
  background-color: rgb(211, 210, 210);
} */


.dateTimeBox{
  display:flex;
  flex-direction:column;
  gap:1px;
  color:black;
}

.dateText{
  font-size:14px;
  
}

.timeText{
  font-size:12px;
}

.mergeBtn, .mergedBtn{
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: $border-radius-lg;
  width: 64px;
  font-size:13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnContent{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:4px;
}

.mergeBtn{
  background-color: black;
}
.mergedBtn{
  background-color: $bgcolor-unavailableBadges;
}

p{
  padding:12px;
}

.repoLinkColumn{
  display: flex;
  align-items: center;
  justify-content: center;
}

.repoLinkIcon {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.notification{
  position:absolute;
  min-width: 320px;
  right:8px;
  top: 4px;
  border-radius: $border-radius-lg;
  padding: 12px 16px;
  box-shadow: $box-shadow-notiBox;

  .closeBtn{
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin-left:12px;

    border: none;
    background:none;
    

    img{
      width:14px;
      height:14px;
    }
  }
}




.typeBadge {
  padding: 4px 8px;
  border-radius: $border-radius-lg;
  font-size:12px;
  
  &.applications {
    background-color: $bgcolor-appBadge;
    color: $textcolor-appBadge;
  }
  &.stacks {
    background-color: $bgcolor-stackBadge;
    color: $textcolor-stackBadge;
  }
  &.library {
    background-color: $bgcolor-libBadge;
    color:$textcolor-libBadge;
  }
}

.statusBadge {
  padding: 4px 8px;
  border-radius: $border-radius-lg;
  font-size:12px;

  &.available {
    background-color: black;
    color:white;
  }
  &.not-available {
    background-color: $bgcolor-unavailableBadges;
    color:white;
  }
}




</style>