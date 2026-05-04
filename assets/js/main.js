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

/*=============== REVIEW CARDS ===============*/
const enhanceReviewCards = () => {
    const reviewCards = document.querySelectorAll('.review-card')
    const avatarByName = {
        'Gojo Satoru': 'assets/img/Gojo.png',
        'Deadpool': 'assets/img/Deadpool.png',
        'Asriel Dreemurr': 'assets/img/Asriel.png',
        'Harley Quinn': 'assets/img/Harley.png',
        'Papaplatte': 'assets/img/Papaplatte.png',
        'Kylo The Doge': 'assets/img/Kylo.png',
        'Gronkh': 'assets/img/Gronkh.png',
        'Deku': 'assets/img/Deku.png'
    }
    const starVariants = [
        { value: '5', icons: ['ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-fill'] },
        { value: '4.5', icons: ['ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-half-line'] },
        { value: '4', icons: ['ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-line'] },
        { value: '3.5', icons: ['ri-star-fill', 'ri-star-fill', 'ri-star-fill', 'ri-star-half-line', 'ri-star-line'] }
    ]

    reviewCards.forEach((card, index) => {
        if(card.querySelector('.review-card__header')) return

        const nameEl = card.querySelector('.review-card__name')
        if(!nameEl) return

        const header = document.createElement('div')
        header.className = 'review-card__header'

        const avatar = document.createElement('img')
        avatar.className = 'review-card__avatar'
        const reviewerName = nameEl.textContent.trim()
        avatar.src = avatarByName[reviewerName] || 'assets/img/logo.png'
        avatar.alt = `Profilbild von ${reviewerName}`
        avatar.loading = 'lazy'
        avatar.decoding = 'async'

        const info = document.createElement('div')
        const rating = document.createElement('div')
        const variant = starVariants[index % starVariants.length]
        rating.className = 'review-card__rating'
        rating.setAttribute('aria-label', `${variant.value} von 5 Sternen`)

        variant.icons.forEach((iconClass) => {
            const star = document.createElement('i')
            star.className = iconClass
            star.setAttribute('aria-hidden', 'true')
            rating.appendChild(star)
        })

        nameEl.parentNode.insertBefore(header, nameEl)
        info.appendChild(nameEl)
        info.appendChild(rating)
        header.appendChild(avatar)
        header.appendChild(info)
    })
}

enhanceReviewCards()