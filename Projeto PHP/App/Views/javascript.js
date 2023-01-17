function changeLayout(){
    let width = $(window).width();
    console.log(width);
    if (width<1200){
        $('.lado-esquerdo').width('8%')
        console.log(-1)
        $('#explorar').remove()
        $('#configuracao').remove()
        $('.lado-principal').css('left','10%')
        
        document.getElementById('nav').style.left='40%'
    }
}
$(function (){
    changeLayout();
});