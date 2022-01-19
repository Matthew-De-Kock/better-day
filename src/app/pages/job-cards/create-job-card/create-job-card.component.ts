import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';


interface Country {
  supplier: string;
  orderNum:number;
}

interface Storage {
  name: string;
  qty:number;
}

interface StorageMaterials {
  name: string;
  part_number: number;
  qty: number;
  description: string;
}
const ELEMENT_DATA: StorageMaterials[] = [
  { name: 'Relay', part_number: 10579, qty: 8,description:"Volts 2"},
  { name: 'VSD', part_number: 10879, qty: 5,description:""},
  { name: 'Nuts', part_number: 10979, qty: 150,description:" 5mm"},
  { name: 'Nuts', part_number: 19979, qty: 125,description:"8mm"},

];

@Component({
  selector: 'app-create-job-card',
  templateUrl: './create-job-card.component.html',
  styleUrls: ['./create-job-card.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CreateJobCardComponent implements OnInit {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

   closeResult = '';
   model!: NgbDateStruct;

   COUNTRIES: Country[]=[]
   countries:any;

   STORAGE: Storage[]=[]
   storages:any;

  displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];
  dataSource = ELEMENT_DATA;

  selection = new SelectionModel<StorageMaterials>(true,[])

  clickedRows = new Set<StorageMaterials>();

  partsArr:any[]=[]
  qtysArr:any=[]

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content, { size: 'md' });
  }

  openXl(content:any) {
    this.modalService.open(content, { size: 'xl' });
  }

  ngOnInit(){
}




onAddPurchaseOrder(form: NgForm){

  var supplier = form.value.supplier;
  var orderNum = form.value.mat_order_no;

  if(this.countries==null){
    this.COUNTRIES[0]=
      {
      supplier: supplier,
      orderNum: orderNum,
      }
    this.countries =  this.COUNTRIES
  }
  else{
var lengthArr = this.countries.length
console.log(lengthArr)

this.COUNTRIES[lengthArr]=
  {
  supplier: supplier,
  orderNum: orderNum,
  }
console.log(this.COUNTRIES)
  this.countries = this.COUNTRIES
}
}
onManualPartAdd(form: NgForm){

  var part_name = form.value.manual_part_name_add;
  var part_num = form.value.manual_part_num_add;
  var part_qty = form.value.manual_part_qty_add;
  var part_descr = form.value.manual_part_descr_add;

  if(this.storages==null){
    this.STORAGE[0]=
      {
      name: part_name,
      qty: part_qty,
      }
    this.storages =  this.STORAGE
  }
  else{
var lengthArr = this.storages.length

this.STORAGE[lengthArr] = {
  name: part_name,
  qty: part_qty
}

  this.storages = this.STORAGE
}
}

onAdd(form: NgForm){

this.STORAGE=[]
var i =0
this.qtysArr = []
// console.log("----------")
// console.log(this.partsArr)
// console.log("----------")
for (let partArr of this.partsArr) {
  this.qtysArr = form.value[partArr]
console.log(partArr)
  this.STORAGE[i] = {
    name: partArr,
    qty: form.value[partArr]
  }
  i++
}
// console.log("----------")
// console.log(this.STORAGE)
// console.log("----------")
this.storages = this.STORAGE
}


onRowToggled(storageItem:StorageMaterials){
  // this.storages=null
 // this.STORAGE=[]

this.selection.toggle(storageItem)
this.partsArr=[]
console.log(this.selection.selected )

for (let i = 0; i < this.selection.selected.length; i++) {
  this.partsArr[i] = this.selection.selected[i].name
}
console.log( this.partsArr )
}


}


