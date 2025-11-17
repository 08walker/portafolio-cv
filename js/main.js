$(document).ready(function() {
    // Smooth scrolling para links de navegación
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
            
            // Cerrar el menú móvil después de hacer clic
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Cambiar navbar al hacer scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('box-shadow', '0 5px 20px rgba(0,0,0,0.15)');
        } else {
            $('.navbar').css('box-shadow', '0 2px 10px rgba(0,0,0,0.1)');
        }
    });
    
    // Animación de aparición al hacer scroll
    function animateOnScroll() {
        $('.timeline-item, .project-card, .skill-item').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    // Inicializar elementos con opacidad 0
    $('.timeline-item, .project-card, .skill-item').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    animateOnScroll();
    $(window).on('scroll', animateOnScroll);
    
    // Formulario de contacto
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando AJAX para enviar a tu backend
        
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        this.reset();
    });
    
    // Efecto hover en las tarjetas de proyecto
    $('.project-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    // Agregar transición a las imágenes de proyectos
    $('.project-card img').css('transition', 'transform 0.3s ease');
    
    // Active link en navbar según scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });
    
    // Contador de habilidades (opcional - puedes agregar números)
    $('.skill-item').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });
    
    // Efecto parallax suave en hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });
});