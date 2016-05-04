(function(){
    //ͼƬ��Դ
    var dataAry = ["img/M.jpg","img/A.jpg","img/D.jpg","img/E.jpg"];
    //��ȡԪ��
    var outer = document.getElementById("outer");
    var inner = document.getElementById("inner");
    var imgList = inner.getElementsByTagName("div");//ͼƬ����div�У�û��ʹ��img��ǩ
    var tips = document.getElementById("tips");
    var tipList = tips.getElementsByTagName("li");
    var bannerLeft = document.getElementById("bannerLeft");
    var bannerRight = document.getElementById("bannerRight");
    var outerW = utils.getCss(outer,"width");//outer��ͼƬ���
    var count = dataAry.length+2;//��¼һ���м���ͼƬ
    //�����ݣ�ͼƬ��tip
    var bindData = function(){
        var str = "";
        str+="<div trueImg = '"+dataAry[dataAry.length-1]+"'></div>";//����ǰ��������һ��ͼƬ
        for(var i=0;i<dataAry.length;i++){
            str+="<div trueImg = '"+dataAry[i]+"'></div>";
        }
        str+="<div trueImg = '"+dataAry[0]+"'></div>";//���������ӵ�һ��ͼƬ
        inner.innerHTML=str;

        //���¼���inner�Ŀ�ȣ�
        utils.setCss(inner,"width",(dataAry.length+2)*outerW);

        //��tip
        var str = "";
        for(var i=0;i<dataAry.length;i++){
            i===0?str+="<li class='select'></li>":str+="<li></li>";
        }
        tips.innerHTML=str;
    }
    bindData();

    //ͼƬ�ӳټ���
    var delayImg = function(){
        for(var i=0;i<imgList.length;i++){
            ~function(i){
                var curImg = imgList[i];
                if(curImg.isLoad)return;
                var trueImg =curImg.getAttribute("trueImg");
                var newImg = new Image;//����һ��img��ǩ����document.createElement("")һ���Ĺ���
                newImg.src=trueImg;
                newImg.onload=function(){//�첽���͵���¼����ƣ�curImg = imgList[i],i�����һ��ѭ��������һ��ʼ������ַ���
                    curImg.appendChild(newImg);
                    curImg.isLoad=true;
                }
            }(i);

        }
    }
    window.setTimeout(delayImg,500);
    //ͼƬ�л�
    var step = 1;//��¼ͼƬ��1�����һ��ͼƬ
    var move = function(event){
        if(typeof event==="undefined" || event==="right"){//�����������Զ��л�
            step++;
            if(step>dataAry.length+1){
                utils.setCss(inner,"left",-outerW);
                step=2;
            }
        }
        if(event==="left"){
            step--;
            if(step<0){
                utils.setCss(inner,"left",-dataAry.length*outerW);
                step=3;
            }
        }
        if(event==="tip"){
            if(step>dataAry.length){
               this.i===1||this.i===0? utils.setCss(inner,"left",-outerW):null;
                step=this.i+1;
                /*if(this.i===1){
                    utils.setCss(inner,"left",-outerW);
                    step=2;
                }else if(this.i===0){
                    utils.setCss(inner,"left",-outerW);
                    step=1;
                }else{
                    step=this.i+1;
                }*/
            }else if(step<=0){
                this.i===dataAry.length-1||this.i===dataAry.length-2?utils.setCss(inner,"left",-dataAry.length*outerW):null;
                step=this.i+1;
                /*if(this.i===dataAry.length-1){
                    utils.setCss(inner,"left",-dataAry.length*outerW);
                    step=4;
                }else if(this.i===dataAry.length-2){
                    utils.setCss(inner,"left",-dataAry.length*outerW);
                    step=3;
                }else{
                    step=this.i+1;
                }*/

            }else{
                step=this.i+1;
            }
        }
        animate(inner,{left:-step*outerW},500);
        changeTip(step-1);
    }
    inner.autoTimer= window.setInterval(move,3000);//inner.timer�����ԣ���Ϊ����inner���õ��������У����ͻ

    //�����л�
    var changeTip = function(step){
        step = step<0?3:step;
        step = step>=dataAry.length?0:step;
        for(var i=0;i<tipList.length;i++){
            tipList[i].className= step===i?"select":null;
        }
    }
    //�������¼�
    for(var i=0;i<tipList.length;i++){
        tipList[i].i=i;
        tipList[i].onclick=function(){
            move.call(this,"tip");
        }
    }
    //�����л�
    outer.onmouseenter=function(){
        window.clearInterval(inner.autoTimer);
        bannerLeft.style.display=bannerRight.style.display="block";
    }
    outer.onmouseleave=function(){
        bannerLeft.style.display=bannerRight.style.display="none";
        inner.autoTimer= window.setInterval(move,3000);
    }
    //�����л�����¼�
    bannerLeft.onclick=function(){
        move("left");
    }
    bannerRight.onclick=function(){
        move("right");
    }
})();
