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
        'gojo satoru': 'assets/img/Gojo.png',
        'wade winston wilson': 'assets/img/Deadpool.png',
        'deadpool': 'assets/img/Deadpool.png',
        'asriel dreemurr': 'assets/img/Asriel.png',
        'harleen quinzel': 'assets/img/Harley.png',
        'harley quinn': 'assets/img/Harley.png',
        'kevin teller': 'assets/img/Papaplatte.png',
        'papaplatte': 'assets/img/Papaplatte.png',
        'kylo the doge': 'assets/img/Kylo.png',
        'erik range': 'assets/img/Gronkh.png',
        'gronkh': 'assets/img/Gronkh.png',
        'midoriya izuku': 'assets/img/Deku.png',
        'deku': 'assets/img/Deku.png'
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
        const normalizedName = reviewerName.toLowerCase()
        avatar.src = avatarByName[normalizedName] || 'assets/img/logo.png'
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

/*=============== CAPTCHA ===============*/
const initCaptcha = () => {
    const canvas = document.getElementById('captcha-canvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let currentCode = ''

    const generateCode = () => {
        currentCode = Array.from({ length: 6 }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
        drawCanvas(currentCode)
    }

    const drawCanvas = (code) => {
        const w = canvas.width
        const h = canvas.height

        ctx.clearRect(0, 0, w, h)

        // Background
        ctx.fillStyle = '#111827'
        ctx.fillRect(0, 0, w, h)

        // Noise lines
        for (let i = 0; i < 6; i++) {
            ctx.beginPath()
            ctx.moveTo(Math.random() * w, Math.random() * h)
            ctx.lineTo(Math.random() * w, Math.random() * h)
            ctx.strokeStyle = `rgba(65, 250, 142, ${0.15 + Math.random() * 0.25})`
            ctx.lineWidth = 1
            ctx.stroke()
        }

        // Noise dots
        for (let i = 0; i < 50; i++) {
            ctx.beginPath()
            ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + Math.random() * 0.2})`
            ctx.fill()
        }

        // Characters
        const charSlot = w / (code.length + 1)
        for (let i = 0; i < code.length; i++) {
            ctx.save()
            ctx.translate(charSlot * (i + 0.8), h / 2 + 4)
            ctx.rotate((Math.random() - 0.5) * 0.55)
            const size = 20 + Math.floor(Math.random() * 5)
            ctx.font = `bold ${size}px Montserrat, sans-serif`
            ctx.fillStyle = `hsl(${140 + Math.floor(Math.random() * 20)}, 95%, ${65 + Math.floor(Math.random() * 15)}%)`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(code[i], 0, 0)
            ctx.restore()
        }
    }

    // Refresh button
    const refreshBtn = document.getElementById('captcha-refresh')
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            generateCode()
            const input = document.getElementById('form-captcha')
            if (input) {
                input.value = ''
                input.focus()
            }
        })
    }

    // Form submit validation
    const form = document.getElementById('order-form')
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const captchaInput = document.getElementById('form-captcha')
            const statusEl = document.getElementById('form-status')

            if (!captchaInput || !statusEl) return

            if (captchaInput.value.trim().toLowerCase() !== currentCode.toLowerCase()) {
                statusEl.textContent = 'Sicherheitscode falsch. Bitte erneut versuchen.'
                statusEl.className = 'form__status form__status--error'
                generateCode()
                captchaInput.value = ''
                captchaInput.focus()
                return
            }

            // Simulate successful submission
            statusEl.textContent = 'Deine Bestellung wurde erfolgreich übermittelt. Wir melden uns bald bei dir!'
            statusEl.className = 'form__status form__status--success'
            form.reset()
            generateCode()
        })
    }

    generateCode()
}

initCaptcha()