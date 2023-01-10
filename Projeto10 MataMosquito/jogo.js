
function ajustaTamanho(){
    altura= window.innerHeight
    largura= window.innerWidth
    if(largura<900){
        document.body.style.backgroundSize='auto'
        console.log(-66)
    }else{
        console.log(-99)
        document.body.style.backgroundSize='cover'
    }
}
var vidas=99
var altura=0
var largura=0
var segundos=60
var criaMosquitoTempo=1500
var nivel = window.location.search
if(nivel=="?normal"){
    criaMosquitoTempo=1500
}else if(nivel=="?dificil"){
    criaMosquitoTempo=1000
}else if(nivel=="?chuckNoris"){
    criaMosquitoTempo=750
}
var cronometro=setInterval(function(){
    segundos-=1
    
    if(segundos<0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href='vitoria.html'
    }else{
        document.getElementById('tempo').innerHTML=segundos
        
    }
},1000)

function posicaoRandomica(){
    if(vidas<0){
        console.log(vidas)
        window.location.href='fim_de_jogo.html'
    }else if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        document.getElementById('v'+vidas).src='imagens/coracao_vazio.png'
        
        vidas--
    }
    var posicaoX=Math.floor(Math.random()*largura)-90
    var posicaoY=Math.floor(Math.random()*altura) -90
    posicaoX=posicaoX<0?0:posicaoX
    posicaoY=posicaoY<0?0:posicaoY
    var mosquito=document.createElement('img')
    mosquito.src='imagens/mosca.png'
    mosquito.className=tamanhoAletorio()
    mosquito.style.left=posicaoX+'px'
    mosquito.style.top=posicaoY+'px'
    mosquito.style.position='absolute'
    mosquito.style.transform=ladoMosquito()
    mosquito.id='mosquito'
    mosquito.onclick=function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAletorio(){
    var classe = Math.floor(Math.random()*3)
    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}
function ladoMosquito(){
    var lado = Math.floor(Math.random()*2)

    if(lado==0){
        return 
    }else{
        return 'scaleX(-1)'
    }
}
function criaVidas(){
    for(let i=0;i<vidas+1;i++){
        const img=document.createElement('img')
        let vida=document.getElementById('vidas').appendChild(img)
        vida.src='imagens/coracao_cheio.png'
        vida.id='v'+i
    }
}
