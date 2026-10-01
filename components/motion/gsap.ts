"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ES module singleton — runs once. registerPlugin is idempotent.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
