
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

let sortDirection=false;
// let personData=[];
window.onload= () => {
    if (localStorage.getItem("hasCodeRunBefore"===null)){
        let personData=[];
        localStorage.setItem("personData",JSON.stringify(personData));
        localStorage.setItem("hasCodeRunBefore", true);
    }
    
};
let personData=JSON.parse(localStorage.getItem("personData")|| "[]");
function guard(){
            
    var name = document.getElementById('name').value;
    var id = document.getElementById('empid').value;
    var age= document.getElementById('age').value;
    if(name!=null && id !=null && age !=null){
        let eminfo={
            name:name, empid:id, age:age
        };
        
          sessionStorage.setItem("curr_imp",JSON.stringify(eminfo));
    
          
          personData.push(eminfo);
          localStorage.setItem("personData",JSON.stringify(personData));
    }
    
 
      
   

}


// function loadTableData(){
//     var data = pagination(state.querySet, state.page, state.rows)
//     console.log('Data:', data)
//     var myList = data.querySet
//     const tableBody = document.getElementById('tableData');
//     let dataHtml= '';
//    let temp=localStorage.getItem("personData");
//    let personData=JSON.parse(temp)|| [];
//    if(personData){
//     for(let person of personData){
//         dataHtml +=`<tr><td>${person.name}</td><td>${person.empid}</td><td>${person.age}</td></tr>` ;
//     }
//    }
//     console.log(dataHtml)
//     tableBody.innerHTML=dataHtml;

// }





function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  var state = {
    'querySet': personData,

    'page': 1,
    'rows': 5,
    'window': 5,
}
function loadTableData() {
    var tb = document.getElementById('tableData')

      var data = pagination(state.querySet, state.page, state.rows)
      console.log('Data:', data)
      var myList = data.querySet
      var dataHtml=''

      for (var i = 1 in myList) {
          //Keep in mind we are using "Template Litterals to create rows"
          dataHtml += `<tr>
                    <td>${myList[i].name}</td>
                    <td>${myList[i].empid}</td>
                    <td>${myList[i].age}</td>
                    <td><input type="button" value="Edit" onclick="editTable()" class="button4">
                        <input type="button" value="Delete" onclick="deleteRecord(this)" class="button3"></td>
                    `
                    tb.innerHTML=dataHtml
      }
      
                pageButtons(data.pages)
      
  }



window.onload= () =>{
    loadTableData();
};

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart,trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn">Last &#187;</button>`
    }
    
    $('.page').on('click', function()  {
        // document.getElementById('tableData').empty()
        $('#table-body').empty()

        state.page = Number($(this).val())
    // $('.page').on('click', function() {
    //     $('#table-body').empty()

    //     state.page = Number($(this).val())

        loadTableData()
    })

}
function deleteRecord(obj){
    var confirmed = confirm("Do you want to delete this record?");
    if(confirmed){
        var idx = obj.parentNode.parentNode.rowIndex;
        var emp_id = obj.parentNode.parentNode.children[1].innerText;
        let emp_arr = JSON.parse(localStorage.getItem("personData",) || "[]");
        let filtered_arr = emp_arr.filter(ob => ob.empid !== emp_id);
        console.log(filtered_arr);
        localStorage.setItem("personData", JSON.stringify(filtered_arr));
        state.querySet = JSON.parse(localStorage.getItem("personData") || "[]");
        loadTableData();
    }
}
table = document.getElementById("myTable");
var rIndex;
function editTable() {
  objIndex = personData.findIndex((obj => obj.id == 1));
  console.log("Before update: ", personData[objIndex])
}