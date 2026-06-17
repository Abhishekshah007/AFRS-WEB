// i want forensic related watermarks, background graphics, or ghost elements on my hero section or where i wanted to show it should be dynamic and should make ux better, how do i do that ,

// To create forensic-related watermarks, background graphics, or ghost elements in your hero section dynamically, you can follow these steps:
// 1. **Design the Graphics**: Create forensic-related graphics such as fingerprints, magnifying glasses, crime scene tape, or any other relevant icons. You can use graphic design tools like Adobe Illustrator, Photoshop, or free alternatives like GIMP or Canva.

const forensicGraphics = [
  {
    id: 1,
    src: '/assets/svg/chemistry-burner.svg',
    alt: 'Chemistry burner',
    className: 'forensic-graphic chemistry-burner',
  },
  {
    id: 2,
    src: '/assets/svg/criminal-posing-for-police.svg',
    alt: 'Criminal posing for police',
    className: 'forensic-graphic criminal-posing',
  },
]

export const ForensicBackground = () => {
  return (
    <div aria-hidden="true" className="forensic-background">
      <span className="forensic-watermark">Applied Forensic Research Sciences</span>
      <span className="forensic-watermark forensic-watermark--secondary">
        Expert Forensic Investigation
      </span>
      {forensicGraphics.map((graphic) => (
        <img key={graphic.id} src={graphic.src} alt={graphic.alt} className={graphic.className} />
      ))}
    </div>
  )
}
