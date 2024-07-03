const eye__icons = document.querySelectorAll('.fa-eye')

eye__icons.forEach(eye => {
    eye.addEventListener('click', e => {
        let input__pwd = e.target.previousElementSibling
        if (input__pwd.type === "password") {
            input__pwd.type = "text"
            e.target.classList.replace('fa-eye', 'fa-eye-slash')
            e.target.classList.add('active')
        }else{
            e.target.classList.replace('fa-eye-slash', 'fa-eye')
            input__pwd.type = "password"
            e.target.classList.remove('active')
        }
    })
});