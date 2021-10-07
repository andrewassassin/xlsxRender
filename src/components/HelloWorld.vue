/* eslint-disable vue/no-unused-vars */
<template>
  <div id="app container">
    <input class="mb-4" type="file" @change="onChange" />
    <div class="row justify-content-center">
      <table class=" table table-border col-md-6">
        <thead >
            <tr>
              <th v-for="item in columnCnt" :key="item.key" class="text-right">{{item}}</th>
            </tr>
        </thead>
         <tbody id="cartTableBody" v-for="(item) in itemList" :key="item.key">
                  <tr>
                      <td>                    
                        <div>
                            <p class="m-0 text-right">{{item}}</p>
                        </div>
                      </td>
                      <td class="text-right m-0">{{item[keys[1]]}}</td>
                      <td class="text-right">         
                         $ {{item[keys[2]]}}
                      </td>
                      <td class="text-right">{{item[keys[3]]}}</td>
                      <td class="text-right">{{item[keys[4]]}}</td>
                  </tr>
                </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx"
import axios from 'axios'
export default {
  data(){
    return{
      productList:[],
      columnCnt:[],
      itemList:[],
      keys:[]
    }
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          console.log(data)
          this.productList = data
          this.toTable()
        }

        reader.readAsBinaryString(this.file);
      }
    },
    toTable(){
      this.columnCnt = this.productList[0]
      this.productList.splice(0,1)

        var result = {};
        this.productList.forEach(item=>{
              for (var i = 0; i < item.length; i++){
              result[this.columnCnt[i]] = item[i];
              }
            this.itemList.push(result)
        })
            console.log('this.itemList',this.itemList)
           this.itemList.forEach(item=>{
             console.log('表頭',Object.keys(item))
           })
          
          this.keys=Object.keys(this.itemList[0])
// console.log('表頭',Object.keys(this.itemList[0]))
       this.productList = JSON.stringify( this.productList)
        axios.post("https://x-home.pcpogo.com/homex/tab.php?RDEBUG=andrewc", this.productList)
          .then(res => {
                console.log(res)
                this.productList = res.data
              })
          .catch(error => {
            console.log('err',error);
          });
    },
    mounted(){
  
    }
  }
};
</script>
