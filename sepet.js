const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi  = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku)

function gorevSilTamamla(e) {
const tiklananEleman = e.target;
if (tiklananEleman.classList.contains('btn-gorev-tamamlandi')) {

tiklananEleman.parentElement.classList.toggle('gorev-tamamlandi');

} 
if (tiklananEleman.classList.contains('btn-gorev-sil')) {

if(confirm('Silmek istediğinizden emin misiniz?')) {

    tiklananEleman.parentElement.classList.toggle('kaybol'); 
    
    const silinecekGorev = tiklananEleman.parentElement.parentElement.children[0].innerText;
    localStorageSil(silinecekGorev);
    
    tiklananEleman.parentElement.addEventListener('transitionend',()=> { 
    tiklananEleman.parentElement.remove(); 
 } );
}
}
}


function gorevEkle(e) {
    e.preventDefault();
  if(yeniGorev.value.length >1){
    gorevItemOlustur(yeniGorev.value);
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = ''; 

    }else{
        alert('Gorev adi boş olamaz');
  

  } 
};

 function localStorageArrayeDonustur() {
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
}else{
    gorevler = JSON.parse(localStorage.getItem('gorevler'));
}

return gorevler;

 };


function localStorageKaydet(yeniGorev){
    let gorevler = localStorageArrayeDonustur();
gorevler.push(yeniGorev);
localStorage.setItem('gorevler', JSON.stringify(gorevler)); 
}

function localStorageOku(){
    let gorevler= localStorageArrayeDonustur();
gorevler.forEach( function (gorev) {
 gorevItemOlustur(gorev);
    
});
 
};

function gorevItemOlustur(gorev){

    // div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item'); 
    
    // li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim')
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);
    
    // tamamlandı butunu ekle 
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('btn-gorev-tamamlandi');
    gorevTamamBtn.innerHTML='<i class="fa-regular fa-square-check"></i>'; 
    gorevDiv.appendChild(gorevTamamBtn); 
    
    // sil butunu ekle 
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('btn-gorev-sil');
    gorevSilBtn.innerHTML='<i class="fa-solid fa-trash"></i>'; 
    gorevDiv.appendChild(gorevSilBtn); 
   
    // ul' ye oluşturduğumuz divi ekleme
    gorevListesi.appendChild(gorevDiv);
}

// silinen gorevleri localstrageden silme
function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();

const  silinecekElemanIndex = gorevler.indexOf(gorev);
console.log(silinecekElemanIndex);
gorevler.splice(silinecekElemanIndex, 1);
 localStorage.setItem('gorevler', JSON.stringify(gorevler));
};


