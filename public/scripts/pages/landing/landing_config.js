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
  });

//dismiss #notificationdiv after 7 seconds
window.setTimeout(() => {
    $("#notificationdiv").fadeTo(7000,0).slideUp(500, () => {
        $(this).remove();
    });
});

//animate logindiv on load
window.onload = () => {
    $('#logindiv').transition('pulse');
}; 