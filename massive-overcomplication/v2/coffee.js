console.clear();

import gsap from "https://esm.sh/gsap";
import { vec2 } from "https://esm.sh/vecteur";

import gsap from "https://esm.sh/gsap";
import { vec2 } from "https://esm.sh/vecteur";

class Cursor {
    constructor(targetEl) {
        this.el = targetEl;

        this.position = {
            previous: vec2(-100, -100),
            current: vec2(-100, -100),
            target: vec2(-100, -100),
            lerpAmount: 0.1
        };

        this.scale = {
            previous: 1,
            current: 1,
            target: 1,
            lerpAmount: 0.1
        };

        this.isHovered = false;
        this.hoverEl = null;

        this.addListeners();
    }

    update() {
        this.position.current.lerp(this.position.target, this.position.lerpAmount);
        this.scale.current = gsap.utils.interpolate(
            this.scale.current,
            this.scale.target,
            this.scale.lerpAmount
        );

        const delta = this.position.current.clone().sub(this.position.previous);

        this.position.previous.copy(this.position.current);
        this.scale.previous = this.scale.current;

        gsap.set(this.el, {
            x: this.position.current.x,
            y: this.position.current.y
        });

        if (!this.isHovered) {
            const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
            const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;

            gsap.set(this.el, {
                rotate: angle,
                scaleX: this.scale.current + Math.min(distance, 1),
                scaleY: this.scale.current - Math.min(distance, 0.3)
            });
        }
    }

    updateTargetPosition(x, y) {
        if (!this.isHovered) {
            this.position.target.x = x;
            this.position.target.y = y;
            this.scale.target = 1;
        }
    }

    addListeners() {
        window.addEventListener("pointermove", (event) => {
            const { clientX: x, clientY: y } = event;
            this.updateTargetPosition(x, y);
        });

        gsap.ticker.add(() => this.update());
    }
}

const cursor = new Cursor(document.querySelector(".cursor"));

const cta = document.querySelector(".cta");
const menuBtn = document.querySelector(".menu-btn");

onResize();

function update() {
    cursor.update();
}

function onMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY;

    cursor.updateTargetPosition(x, y);
}

function onResize() {
    const { x, y, width, height } = menuBtn.getBoundingClientRect();

    gsap.set(cta, {
        left: x - width,
        top: y + height
    });
}

gsap.ticker.add(update);
window.addEventListener("pointermove", onMouseMove);
window.addEventListener("resize", onResize);