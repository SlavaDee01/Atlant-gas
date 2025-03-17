$('.order__slider').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});


//Review slider
  var swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        dots: true,
        coverflowEffect: {
          rotate: 40,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        },
          loop: true,
          pagination: {
         el: '.swiper-pagination',
        },
          navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
          scrollbar: {
          el: '.swiper-scrollbar',
        },
});

//Accordeon

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("accordion_active");
    
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
    
}

document.addEventListener("DOMContentLoaded", function(){
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');

    let getInputNumbersValue = function(input){
        return input.value.replace(/\D/g, "");
    }

    let onPhoneInput = function(e){
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputValue = "";
            selectionStart = input.selectionStart;
            
        if (!inputNumbersValue){
           return input.value = "";
        } 
        
        if (input.value.length != selectionStart){
          console.log('change middle of string', e);
          if (e.data && /\D/g.test(e.data)){
            input.value = inputNumbersValue;
          }
          return;
        }
        
        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1){
           //RN
           if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
           let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
           formattedInputValue = firstSymbols + " ";
           if (inputNumbersValue.length > 1){
               formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
           }
           if (inputNumbersValue.length >= 5){
               formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
           }
           if (inputNumbersValue.length >= 8){
               formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
           }
           if (inputNumbersValue.length >= 10){
               formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
           }
        } else {
          //NRN
          formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }

    let onPhoneKeyDown = function(e){
        let input = e.target;
        if (e.keyCode == 8 && getInputNumbersValue(input).length == 1){
            input.value = "";
        }
    }
    
    let onPhonePaste = function(e){
      let pasted = e.clipboardData || window.clipboardData;
          input = e.target,
          inputNumbersValue = getInputNumbersValue(input);
      if (pasted){
          let pastedText = pasted.getData("Text");
          if (/\D/g.test(pastedText)){
            input.value = inputNumbersValue;
          }
      }
    }

    for (i=0; i<phoneInputs.length; i++ ){
        let input = phoneInputs[i];
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("keydown", onPhoneKeyDown);
        input.addEventListener("paste", onPhonePaste);
    }
});

//Modal

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");
    
    modalCall.on("click", function(event) {
        event.preventDefault();
        
        let $this = $(this);
        let modalId = $this.data('modal');
        
        $(modalId).addClass('show');
        $("body").addClass('no-scroll');
        
        setTimeout(function(){
            $(modalId).find(".modal__dialog").css({
                transform: "scale(1)"
            });
        }, 300);
    });
    
    modalClose.on("click", function(event) {
        event.preventDefault();
        
        let $this = $(this);
        let modalParent = $this.parents('.modal');
            modalParent.find(".modal__dialog").css({
                transform: "scale(0)"
            });
        
        setTimeout(function() {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');          
        }, 300);          
    });
    
    $(".modal").on("click", function(event) {
        let $this = $(this);
           $this.find(".modal__dialog").css({
                transform: "scale(0)"
            });
        
       setTimeout(function() { 
           $this.removeClass('show');
           $("body").removeClass('no-scroll');
        }, 300);   
    });
    
    $(".modal__dialog").on("click", function(event) {
        event.stopPropagation(); 
    });

    
