$("#signupsidebar").sidebar({
    dimPage:true,
    transition: 'overlay',
    closable:true
});

toggleSignUpSidebar = () => {
    $("#signupsidebar").sidebar('show');
}
