
class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor,pago){
        this.ano=ano
        this.mes=mes
        this.dia=dia
        this.tipo=tipo
        this.descricao=descricao
        this.valor=valor
        this.pago=pago
    }
    validarDados(){
        // console.log(-1)
        console.log(this)
        for(let i in this){
            console.log(this[i])
            if(!this[i]){
                return false
            }
        }
        return true
    }
    
}

class Bd{

    constructor(){
        let id=localStorage.getItem('id')

        if(!id){
            localStorage.setItem('id',-1)
        }
        
    }

    getNextId(){
        let nextId = localStorage.getItem('id')
        return parseInt(nextId)+1
    }

    gravar(d){
        let id =this.getNextId()
        localStorage.setItem('id',id)

        localStorage.setItem(id,JSON.stringify(d))
    }
    recuperarTodosRegistros(){
        let id=localStorage.getItem('id')
        let despesas=[]
        for(let i=0;i<=id;i++){
            let despesa=JSON.parse(localStorage.getItem(i))
            if(despesa){
                despesa.id=i
                despesas.push(despesa)
            }

        }
        return despesas
    }
    pesquisar(despesa){
        let despesasFiltradas =this.recuperarTodosRegistros()
        if(despesa.ano){
            despesasFiltradas=despesasFiltradas.filter(d=> d.ano==despesa.ano)
        }if(despesa.mes){
            despesasFiltradas=despesasFiltradas.filter(d=> d.mes==despesa.mes)
        }if(despesa.dia){
            despesasFiltradas=despesasFiltradas.filter(d=> d.dia==despesa.dia)
        }if(despesa.tipo){
            despesasFiltradas=despesasFiltradas.filter(d=> d.tipo==despesa.tipo)
        }if(despesa.descricao){
            despesasFiltradas=despesasFiltradas.filter(d=> d.descricao==despesa.descricao)
        }if(despesa.valor){
            despesasFiltradas=despesasFiltradas.filter(d=> d.valor==despesa.valor)
        }if(despesa.pago=='on'){
            despesasFiltradas=despesasFiltradas.filter(d=> d.pago==despesa.pago)
        }
        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd= new Bd()

function checkBox(){
    let check =document.getElementById('flexCheckDefault')
    if(check.value=='on'){
        check.value='off'
    }else{
        check.value='on'
    }
}

function cadastrarDespesa(){
    let dia= document.getElementById('dia')
    let mes=document.getElementById('mes')
    let ano=document.getElementById('ano')
    let tipo=document.getElementById('tipo')
    let descricao=document.getElementById('descricao')
    let valor=document.getElementById('valor')
    let pago=document.getElementById('flexCheckDefault')
    console.log(pago)
    let despesa= new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,
        pago.value
    )
    // console.log(despesa.validarDados())
    if(despesa.validarDados()){
        let modalH1=document.getElementById("modal-tittle")
        modalH1.className='modal-title fs-5 text-success'
        modalH1.innerHTML='Registro inserido com sucesso'
        let modalBtn=document.getElementById("modal-btn")
        modalBtn.className='btn-success btn'
        modalBtn.innerHTML='Voltar'
        document.getElementById('modal-p').innerHTML="Despesa foi cadastrada com sucesso"
        limpaDados()
        const myModal = new bootstrap.Modal('#modalRegistroDespesa', {
            keyboard: false
          })
        const modalToggle = document.getElementById('modalRegistroDespesa'); 
        myModal.show(modalToggle)
        
        bd.gravar(despesa)
    }else{
        let modalH1=document.getElementById("modal-tittle")
        modalH1.className='modal-title fs-5 text-danger'
        modalH1.innerHTML='Você não inseriu os dados completos'
        let modalBtn=document.getElementById("modal-btn")
        modalBtn.className='btn-danger btn'
        modalBtn.innerHTML='Voltar e corrigir'
        document.getElementById('modal-p').innerHTML="Erro de gravação, verifique se todos os campos foram prenchidos corretamente"


        const myModal = new bootstrap.Modal('#modalRegistroDespesa', {
            keyboard: false
          })
        const modalToggle = document.getElementById('modalRegistroDespesa'); 
        myModal.show(modalToggle)
    }
    console.log(despesa)
}

function carregaListaDespesa(despesas=bd.recuperarTodosRegistros()){
    let sum=0
    let listaDespesas =document.getElementById('listaDespesas')
    listaDespesas.innerHTML=''
    for(let i=despesas.length-1;i>-1;i--){
        let d=despesas[i]
        sum+=parseInt(d.valor)
        let linha=listaDespesas.insertRow()
        linha.insertCell(0).innerHTML=`${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML=d.tipo
        linha.insertCell(2).innerHTML=d.descricao
        linha.insertCell(3).innerHTML=d.valor
        linha.insertCell(4).innerHTML= d.pago=="on"? 'Sim': 'Não'
        let btn=document.createElement("button")
        btn.type='button'
        btn.className='btn btn-primary btn-close'
        btn.id= `id_despesa${d.id}`
        btn.onclick=function(){
            let id=this.id.replace("id_despesa","")
           
            const myModal2 = new bootstrap.Modal('#modalConfirmacaoExclusao', {
                keyboard: false
              })
            const modalToggle = document.getElementById('modalConfirmacaoExclusao'); 
            myModal2.show(modalToggle)

            const checkAnswer = document.getElementById('remover')
            checkAnswer.onclick=function(){
                bd.remover(id)
                carregaListaDespesa()
            }
            
        }
        
        
        linha.insertCell(5).append(btn)
        
    };

    let linha=listaDespesas.insertRow()
    let total=linha.insertCell(0)
    total.innerHTML='Total'
    total.className='fw-bold'
    linha.insertCell(1).innerHTML=''
    linha.insertCell(2).innerHTML=''
    linha.insertCell(3).innerHTML=sum
    linha.insertCell(4).innerHTML=''
    linha.insertCell(5).innerHTML=''
}

function pesquisarDespesa(){
    let dia=document.getElementById('dia').value
    let mes=document.getElementById('mes').value
    let ano=document.getElementById('ano').value
    let tipo=document.getElementById('tipo').value
    let descricao=document.getElementById('descricao').value
    let valor=document.getElementById('valor').value
    let pago=document.getElementById('flexCheckDefault').value
    limpaDados()
    
    
    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor,pago)

    despesa=bd.pesquisar(despesa)
    carregaListaDespesa(despesa)
}
function limpaDados(){
    document.getElementById('dia').value=''
    document.getElementById('mes').value=''
    document.getElementById('ano').value=''
    document.getElementById('tipo').value=''
    document.getElementById('descricao').value=''
    document.getElementById('valor').value=''
}