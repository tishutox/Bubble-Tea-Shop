/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

    if(!toggle || !nav) return

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/*=============== MOBILE DROPDOWNS ===============*/
const isMobile = window.matchMedia('(max-width: 1118px)')

const closeMenuAfterLinkTap = () => {
    const navMenu = document.getElementById('nav-menu')
    const navToggle = document.getElementById('nav-toggle')
    // Only select real anchor links, not <div> submenu triggers
    const navLinks = document.querySelectorAll('a.dropdown__link, a.dropdown__sublink')

    if(!navMenu || !navToggle) return

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if(!isMobile.matches) return

            navMenu.classList.remove('show-menu')
            navToggle.classList.remove('show-icon')
        })
    })
}

const enableMobileDropdowns = () => {
    const dropdownItems = document.querySelectorAll('.dropdown__item')
    const subDropdownItems = document.querySelectorAll('.dropdown__subitem')

    dropdownItems.forEach((item) => {
        const trigger = item.querySelector(':scope > .nav__link')
        if(!trigger) return

        trigger.addEventListener('click', (event) => {
            if(!isMobile.matches) return

            event.preventDefault()
            item.classList.toggle('show-dropdown')
        })
    })

    subDropdownItems.forEach((item) => {
        const trigger = item.querySelector(':scope > .dropdown__link')
        if(!trigger) return

        trigger.addEventListener('click', (event) => {
            if(!isMobile.matches) return

            event.preventDefault()
            item.classList.toggle('show-submenu')
        })
    })
}

enableMobileDropdowns()
closeMenuAfterLinkTap()