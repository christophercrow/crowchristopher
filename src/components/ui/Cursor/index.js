import { useEffect, useRef } from "react";
import './cursor.css';
import DescCard from '../../features/DescCard';

export default function Cursor({ project }) {
    const delay = 18;

    const dot = useRef(null);
    const dotOutline = useRef(null);
    const card = useRef(null);

    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', mouseOverEvent);
        document.addEventListener('mouseup', mouseOutEvent);
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);
        document.addEventListener('mouseover', guardedToggleFromHover);

        animateDotOutline();

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseenter', mouseEnterEvent);
            document.removeEventListener('mouseleave', mouseLeaveEvent);
            document.removeEventListener('mouseover', guardedToggleFromHover);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const guardedToggleFromHover = (e) => {
        if (!dot.current || !dotOutline.current || !card.current) return;

        const shouldEnlarge = e.target.closest('a, svg, span, input');
        cursorEnlarged.current = !!shouldEnlarge;
        toggleCursorSize();
    };

    const toggleCursorVisibility = () => {
        if (!dot.current || !dotOutline.current || !card.current) return;
        if (cursorVisible.current) {
            dot.current.style.opacity = 1;
            dotOutline.current.style.opacity = 1;
            card.current.style.opacity = 1;
        } else {
            dot.current.style.opacity = 0;
            dotOutline.current.style.opacity = 0;
            card.current.style.opacity = 0;
        }
    };

    const toggleCursorSize = () => {
        if (!dot.current || !dotOutline.current || !card.current) return;
        if (cursorEnlarged.current) {
            dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            card.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
            card.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };

    const mouseOverEvent = () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
    };

    const mouseOutEvent = () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
    };

    const mouseEnterEvent = () => {
        cursorVisible.current = true;
        toggleCursorVisibility();
    };

    const mouseLeaveEvent = () => {
        cursorVisible.current = false;
        toggleCursorVisibility();
    };

    const mouseMoveEvent = (e) => {
        cursorVisible.current = true;
        toggleCursorVisibility();

        endX.current = e.pageX;
        endY.current = e.pageY;

        if (dot.current) {
            dot.current.style.top = endY.current + 'px';
            dot.current.style.left = endX.current + 'px';
        }
    };

    const animateDotOutline = () => {
        _x.current += (endX.current - _x.current) / delay;
        _y.current += (endY.current - _y.current) / delay;

        if (dotOutline.current) {
            dotOutline.current.style.top = _y.current + 'px';
            dotOutline.current.style.left = _x.current + 'px';
        }
        if (card.current) {
            card.current.style.top = _y.current + 'px';
            card.current.style.left = _x.current + 'px';
        }

        requestRef.current = requestAnimationFrame(animateDotOutline);
    };

    return (
        <>
            <div ref={dotOutline} className="cursor-dot-outline"></div>
            <div ref={dot} className="cursor-dot"></div>
            <DescCard cardRef={card} project={project} />
        </>
    );
}