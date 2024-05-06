import LocomotiveScroll from 'locomotive-scroll';
import bootstrap from 'bootstrap';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});