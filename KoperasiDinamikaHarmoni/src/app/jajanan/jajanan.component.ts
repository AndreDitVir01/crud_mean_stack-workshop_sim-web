import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JajananService } from '../shared/jajanan.service';
import { Jajanan } from '../shared/jajanan.model';
import { PemasokService } from '../shared/pemasok.service';
import { Pemasok } from '../shared/pemasok.model';

declare var M: any;

@Component({
  selector: 'app-jajanan',
  templateUrl: './jajanan.component.html',
  styleUrls: ['./jajanan.component.css'],
  providers: [JajananService, PemasokService]
})
export class JajananComponent implements OnInit {

  constructor(public jajananService: JajananService, public pemasokService: PemasokService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshJajananList();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.jajananService.selectedJajanan = {
      _id: "",
      nama: "",
      harga_beli: null,
      harga_jual: null,
      pemasok: null
    };
    this.pemasokService.selectedPemasok = {
      _id: "",
      nama: "",
      nohp: null,
      pabrik: ""
    };
  }

  onSubmit(form: NgForm){
    if(form.value._id == null || form.value._id == ""){
      this.jajananService.postJajanan(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshJajananList();
        M.toast({ html: 'Data Jajanan berhasil tersimpan', classes: 'rounded'});
      });
    }else{
      this.jajananService.putJajanan(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshJajananList();
        M.toast({ html: 'Data Jajanan berhasil diperbaharui', classes: 'rounded'});
      });
    }
    
  }

  refreshJajananList(){
    this.jajananService.getJajananList().subscribe((res) => {
      this.jajananService.jajanan = res as Jajanan[];
    });
    this.pemasokService.getPemasokList().subscribe((res) => {
      this.pemasokService.pemasok = res as Pemasok[];
    });
  }

  onEdit(jajan: Jajanan){
    this.jajananService.selectedJajanan = jajan;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('Apakah kamu yakin akan menghapus data ini ?') == true){
      this.jajananService.deleteJajanan(_id).subscribe((res) => {
        this.refreshJajananList();
        this.resetForm();
        M.toast({ html: 'Data sudah berhasil dihapus', classes: 'rounded' })
      });
    }
  }
}
