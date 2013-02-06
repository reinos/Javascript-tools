//trick the placeholder in CrossBrowser
if(!$.support.placeholder) { 
  var active = document.activeElement;
    $(':text').focus(function () {
      if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('hasPlaceholder');
      }
      }).blur(function () {
      if ($(this).attr('placeholder') != undefined && $(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
        $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
      }
    });
    $(':text').blur();
    $(active).focus();
    $('form').submit(function () {
    $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
  });
} 