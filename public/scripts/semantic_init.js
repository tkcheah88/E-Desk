$("#signupsidebar").sidebar({
    dimPage:true,
    transition: 'overlay',
    closable:true
});

toggleSignUpSidebar = () => {
    $("#signupsidebar").sidebar('show');
}

$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
