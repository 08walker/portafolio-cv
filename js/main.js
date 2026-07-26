/* ============================================================
   David Cruz López — CV
   Interacciones y animaciones
   ============================================================ */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- Navbar: sombra al hacer scroll + progreso ---------- */
        var nav = document.getElementById('mainNav');
        var bar = document.getElementById('scrollBar');
        var toTop = document.getElementById('backToTop');
        var ticking = false;

        function onScroll() {
            var y = window.scrollY || document.documentElement.scrollTop;

            if (nav) {
                nav.classList.toggle('scrolled', y > 40);
            }

            if (bar) {
                var height = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = (height > 0 ? (y / height) * 100 : 0) + '%';
            }

            if (toTop) {
                toTop.classList.toggle('show', y > 500);
            }

            setActiveLink(y);
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });

        /* ---------- Link activo en el navbar ---------- */
        var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"]'));
        var sections = links
            .map(function (link) { return document.querySelector(link.getAttribute('href')); })
            .filter(Boolean);

        function setActiveLink(y) {
            var pos = y + 120;
            var current = null;

            sections.forEach(function (section) {
                if (section.offsetTop <= pos) {
                    current = section.id;
                }
            });

            links.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        }

        /* ---------- Cerrar el menú móvil al navegar ---------- */
        document.querySelectorAll('#navbarNav .nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                var collapse = document.getElementById('navbarNav');
                if (collapse && collapse.classList.contains('show') && window.bootstrap) {
                    window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
                }
            });
        });

        /* ---------- Volver arriba ---------- */
        if (toTop) {
            toTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
        }

        /* ---------- Aparición al hacer scroll ---------- */
        var revealables = document.querySelectorAll('.reveal');

        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealables.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    var el = entry.target;
                    var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
                    var delay = Math.min(siblings.indexOf(el), 4) * 90;

                    setTimeout(function () { el.classList.add('is-visible'); }, delay);
                    observer.unobserve(el);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

            revealables.forEach(function (el) { observer.observe(el); });
        }

        /* ---------- Contadores ---------- */
        var counters = document.querySelectorAll('.stat-num');

        function runCounter(el) {
            var target = parseInt(el.getAttribute('data-count'), 10) || 0;

            if (reduceMotion) {
                el.textContent = target;
                return;
            }

            var duration = 1200;
            var start = null;

            function step(timestamp) {
                if (start === null) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                // easeOutCubic
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) window.requestAnimationFrame(step);
            }

            window.requestAnimationFrame(step);
        }

        if ('IntersectionObserver' in window) {
            var counterObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    runCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                });
            }, { threshold: 0.5 });

            counters.forEach(function (el) { counterObserver.observe(el); });
        } else {
            counters.forEach(runCounter);
        }

        /* ---------- Efecto de escritura en el subtítulo ---------- */
        var typedEl = document.getElementById('typed');
        var roles = [
            'Full Stack Developer',
            'Especialista en Laravel / PHP',
            'Arquitectura Backend & REST APIs',
            'E-commerce y Sistemas Administrativos'
        ];

        if (typedEl) {
            if (reduceMotion) {
                typedEl.textContent = roles[0];
            } else {
                var roleIndex = 0;
                var charIndex = 0;
                var deleting = false;

                (function type() {
                    var word = roles[roleIndex];

                    charIndex += deleting ? -1 : 1;
                    typedEl.textContent = word.substring(0, charIndex);

                    var delay = deleting ? 35 : 70;

                    if (!deleting && charIndex === word.length) {
                        deleting = true;
                        delay = 1800;
                    } else if (deleting && charIndex === 0) {
                        deleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        delay = 350;
                    }

                    setTimeout(type, delay);
                })();
            }
        }
    });
})();
