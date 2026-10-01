/**
 * Real project photos, downloaded and compressed from thesolarcoop.in's own
 * /gallery page (public/assets/img/gallery/). The original lists a
 * Gallery-01 and Gallery-02 that are byte-identical — only one kept here.
 *
 * Videos are NOT self-hosted (they're a real but heavy ~28MB across 6
 * files) — linked straight from the source site's own hosting instead of
 * duplicating that weight into this repo. Same company, same real footage,
 * just not copied.
 */

export const GALLERY_PHOTOS = [
  {
    src: "/assets/img/gallery/customer-piplav-rooftop.jpg",
    alt: "A customer standing on her terrace under her newly installed rooftop solar panels in Piplav, Gujarat",
  },
  {
    src: "/assets/img/gallery/rooftop-kaprupur.jpg",
    alt: "A completed rooftop solar structure above a home in Kaprupur, Gujarat",
  },
  {
    src: "/assets/img/gallery/rooftop-array-closeup.jpg",
    alt: "Close-up of a tilted rooftop solar array overlooking a Gujarat village",
  },
  {
    src: "/assets/img/gallery/rooftop-terrace-array.jpg",
    alt: "A rooftop solar array mounted beside a home's terrace in Gujarat",
  },
  {
    src: "/assets/img/gallery/rooftop-tinroof-angle.jpg",
    alt: "Solar panels angled above a tin roof on a rural Gujarat home",
  },
  {
    src: "/assets/img/gallery/rooftop-terrace-structure.jpg",
    alt: "A rooftop solar mounting structure over an empty terrace, overlooking a Gujarat town",
  },
  {
    src: "/assets/img/gallery/waaree-inverter-install.jpg",
    alt: "A Waaree solar inverter installed on a wall between two electrical distribution boxes",
  },
  {
    src: "/assets/img/gallery/net-meter-inverter-box.jpg",
    alt: "A net-metering box and solar inverter installed together on a wall",
  },
] as const;

export const GALLERY_VIDEOS = [
  { src: "https://www.thesolarcoop.in/image/video/video-01.mp4", label: "Site visit 01" },
  { src: "https://www.thesolarcoop.in/image/video/video-02.mp4", label: "Site visit 02" },
  { src: "https://www.thesolarcoop.in/image/video/video-03.mp4", label: "Site visit 03" },
  { src: "https://www.thesolarcoop.in/image/video/video-04.mp4", label: "Site visit 04" },
  { src: "https://www.thesolarcoop.in/image/video/video-05.mp4", label: "Site visit 05" },
  { src: "https://www.thesolarcoop.in/image/video/video-06.mp4", label: "Site visit 06" },
] as const;
