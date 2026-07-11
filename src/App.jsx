import { useState } from "react";

const WebIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const IGIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);
const FBIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#F5A623", fontSize: "0.82rem" }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

const iconStyle = { color: "#666", textDecoration: "none", display: "flex", alignItems: "center" };

function badgeStyle(badge) {
  const map = {
    "badge-dance": { background: "#FDE8F6", color: "#A0277A" },
    "badge-swim": { background: "#E0F0FF", color: "#1A6FAD" },
    "badge-gym": { background: "#FFF0E0", color: "#B05800" },
    "badge-martial": { background: "#FFE8E8", color: "#B02020" },
    "badge-fencing": { background: "#E8EAF6", color: "#3949AB" },
    "badge-golf": { background: "#E8F5E0", color: "#2E7D32" },
    "badge-sailing": { background: "#E0F4FF", color: "#0277BD" },
    "badge-music": { background: "#E8F5E9", color: "#2A7A35" },
    "badge-art": { background: "#EDE8FF", color: "#5B3EAC" },
    "badge-stem": { background: "#E8F5FF", color: "#1A5FAD" },
    "badge-sport": { background: "#E8FFE8", color: "#1A7A35" },
    "badge-drama": { background: "#FFF8E0", color: "#8A6200" },
    "badge-language": { background: "#FFE8F5", color: "#9A2065" },
  };
  return map[badge] || {};
}

const catBlogStyle = {
  "cat-parenting": { background: "#FDE8F6", color: "#A0277A" },
  "cat-education": { background: "#E0F0FF", color: "#1A6FAD" },
  "cat-health": { background: "#E8F5E9", color: "#2A7A35" },
  "cat-development": { background: "#FFF0E0", color: "#B05800" },
  "cat-activities": { background: "#EDE8FF", color: "#5B3EAC" },
};

const activities = [
  { title: "Sydney Dance Academy", suburb: "Chatswood", cat: "Dance", age: "4-16", price: "$$", rating: 4.8, reviews: 24, desc: "Ballet, jazz, hip hop and contemporary for all ages and levels.", badge: "badge-dance", web: "https://www.sydneydancecompany.com/classes/", instagram: "https://www.instagram.com/sydneydanceco/", facebook: "https://www.facebook.com/sydneydanceco/" },
  { title: "Sydney Dance Co — Open Classes", suburb: "Walsh Bay", cat: "Dance", age: "5+", price: "$$", rating: 4.9, reviews: 67, desc: "Contemporary and youth dance at one of Australia's most acclaimed companies.", badge: "badge-dance", web: "https://www.sydneydancecompany.com/classes/", instagram: "https://www.instagram.com/sydneydanceco.classes/", facebook: "https://www.facebook.com/sydneydanceco/" },
  { title: "Teresa Johnson Ballet", suburb: "Paddington", cat: "Dance", age: "3-18", price: "$$", rating: 4.9, reviews: 44, desc: "Classical ballet in the RAD tradition. Warm, nurturing environment.", badge: "badge-dance", web: "https://teresajohnsonballet.com", instagram: "https://www.instagram.com/teresajohnsonballet/", facebook: "https://www.facebook.com/theteresajohnsonballetschool/" },
  { title: "The Ballet Class Rose Bay", suburb: "Rose Bay", cat: "Dance", age: "3-16", price: "$$", rating: 4.8, reviews: 31, desc: "Boutique ballet studio with RAD-certified teachers. Small class sizes.", badge: "badge-dance", web: "https://www.theballetclass.net.au", instagram: "https://www.instagram.com/theballetclass/", facebook: "https://www.facebook.com/theballetclassrosebay/" },
  { title: "Expression Dance School", suburb: "Bondi Junction", cat: "Dance", age: "4-18", price: "$$", rating: 4.8, reviews: 63, desc: "RAD ballet, hip hop, musical theatre, jazz, acrobatics and contemporary.", badge: "badge-dance", web: "https://www.expressiondanceschool.com", instagram: "https://www.instagram.com/expressiondanceschool/", facebook: "https://www.facebook.com/expressiondanceschool/" },
  { title: "Alegria Dance Studios", suburb: "Bondi Junction", cat: "Dance", age: "3-18", price: "$$", rating: 4.8, reviews: 47, desc: "RAD classical ballet, contemporary and jazz. Bondi Junction and Newtown.", badge: "badge-dance", web: "https://www.alegria.com.au", instagram: "https://www.instagram.com/alegriadancestudios/", facebook: "https://www.facebook.com/AlegriadancestudiosAustralia/" },
  { title: "Dance B.A.N", suburb: "Frenchs Forest", cat: "Dance", age: "3-18", price: "$", rating: 4.7, reviews: 38, desc: "RAD ballet, jazz, contemporary and acrobatics across Northern Beaches.", badge: "badge-dance", web: "https://www.danceban.com.au", instagram: "https://www.instagram.com/danceban/", facebook: "https://www.facebook.com/danceban/" },
  { title: "McDonald College After Hours Dance", suburb: "North Strathfield", cat: "Dance", age: "3-18", price: "$$", rating: 4.8, reviews: 54, desc: "RAD ballet, pointe, contemporary, musical theatre, jazz and hip hop since 1926.", badge: "badge-dance", web: "https://www.mcdonald.edu.au/after-hours", instagram: "https://www.instagram.com/mcdonaldcollege/", facebook: "https://www.facebook.com/TheMcDonaldCollege/" },
  { title: "Malabar Dance Crew", suburb: "Maroubra", cat: "Dance", age: "18m-18", price: "$$", rating: 4.7, reviews: 41, desc: "Fun, welcoming dance school for all ages. Ballet, tap, jazz, hip hop, contemporary.", badge: "badge-dance", web: "https://www.malabardancecrew.com.au", instagram: "https://www.instagram.com/malabardancecrew/", facebook: "https://www.facebook.com/malabardancecrew/" },
  { title: "Brent Street", suburb: "Moore Park", cat: "Dance", age: "4-18", price: "$$$", rating: 4.9, reviews: 89, desc: "Australia's Home of Performing Arts. Dance, drama and musical theatre.", badge: "badge-dance", web: "https://brentstreet.com.au", instagram: "https://www.instagram.com/brentstreet/", facebook: "https://www.facebook.com/brentstreetstudios/" },
  { title: "Pretty Little Ballerinas", suburb: "Bondi Beach", cat: "Dance", age: "2-12", price: "$", rating: 4.8, reviews: 52, desc: "Ballet and jazz for 2–12 year olds across Inner City and Eastern Suburbs.", badge: "badge-dance", web: "https://www.prettylittleballerinas.com.au", instagram: "https://www.instagram.com/prettylittleballerinas/", facebook: "https://www.facebook.com/PrettyLittleBallerinas/" },
  { title: "Little Dippers Swim School", suburb: "Mosman", cat: "Swimming", age: "0-5", price: "$$", rating: 4.9, reviews: 63, desc: "Parent-and-baby through to preschool confident swimmers.", badge: "badge-swim", web: "https://littledippers.com.au", instagram: "https://www.instagram.com/littledippersswimschool/", facebook: "https://www.facebook.com/littledippersswimschool/" },
  { title: "Carlile Swim — Lane Cove", suburb: "Lane Cove", cat: "Swimming", age: "0-16", price: "$$", rating: 4.9, reviews: 78, desc: "World-renowned learn-to-swim with 80 years of excellence.", badge: "badge-swim", web: "https://www.carlile.com.au/sydney/", instagram: "https://www.instagram.com/carlileswim/", facebook: "https://www.facebook.com/carlileswimming/" },
  { title: "JUMP! Swim Schools", suburb: "Various (Sydney-wide)", cat: "Swimming", age: "0-12", price: "$$", rating: 4.8, reviews: 91, desc: "Australia's leading boutique learn-to-swim franchise. 60+ locations.", badge: "badge-swim", web: "https://jumpswimschools.com.au", instagram: "https://www.instagram.com/jumpswimschools/", facebook: "https://www.facebook.com/JUMPSwimSchools/" },
  { title: "In2Swim Northern Beaches", suburb: "Allambie Heights", cat: "Swimming", age: "0-18", price: "$$", rating: 4.9, reviews: 62, desc: "Award-winning swim school with heated 25m indoor pool. Babies to squads.", badge: "badge-swim", web: "https://www.in2swim.com.au", instagram: "https://www.instagram.com/in2swimswimschool/", facebook: "https://www.facebook.com/in2swimschool/" },
  { title: "Sutherland Shire Swim School", suburb: "Sutherland", cat: "Swimming", age: "0-16", price: "$", rating: 4.6, reviews: 44, desc: "Learn-to-swim at Sutherland Leisure Centre's Olympic pool.", badge: "badge-swim", web: "https://www.sutherlandshire.nsw.gov.au/residents/leisure-centres", facebook: "https://www.facebook.com/sutherland.leisure/" },
  { title: "Carlile Swim — Chatswood", suburb: "Chatswood", cat: "Swimming", age: "0-16", price: "$$", rating: 4.8, reviews: 55, desc: "One of 13 Sydney Carlile locations. Babies to squads.", badge: "badge-swim", web: "https://www.carlile.com.au/sydney/", instagram: "https://www.instagram.com/carlileswim/", facebook: "https://www.facebook.com/carlileswimming/" },
  { title: "Ian Thorpe Aquatic Centre Swim School", suburb: "Ultimo", cat: "Swimming", age: "0-16", price: "$$", rating: 4.7, reviews: 38, desc: "Learn-to-swim at Sydney's iconic inner-city aquatic centre.", badge: "badge-swim", web: "https://ianthorpeaquaticcentre.com.au", instagram: "https://www.instagram.com/ianthorpeaquaticcentre/", facebook: "https://www.facebook.com/IanThorpeAquaticCentre/" },
  { title: "KICK Swim", suburb: "Various (Sydney-wide)", cat: "Swimming", age: "0-12", price: "$$", rating: 4.9, reviews: 56, desc: "Premium swim school exclusively for kids. Small classes, heated pools.", badge: "badge-swim", web: "https://www.kickswim.com.au", instagram: "https://www.instagram.com/kickswim/", facebook: "https://www.facebook.com/kickswim/" },
  { title: "Rouse Hill Swim School", suburb: "Rouse Hill", cat: "Swimming", age: "0-12", price: "$$", rating: 4.7, reviews: 29, desc: "Modern learn-to-swim in the north-west growth corridor.", badge: "badge-swim", web: "https://www.aquabliss.com.au", instagram: "https://www.instagram.com/aquablissswimschool/", facebook: "https://www.facebook.com/AquablissSwimSchool/" },
  { title: "Gymnastics NSW", suburb: "Sydney Olympic Park", cat: "Gymnastics", age: "3-18", price: "$$", rating: 4.8, reviews: 71, desc: "Artistic, rhythmic and acrobatic gymnastics at the state's premier facility.", badge: "badge-gym", web: "https://www.gymnsw.org.au", instagram: "https://www.instagram.com/gymnastics_nsw/", facebook: "https://www.facebook.com/GymnasticsNSW/" },
  { title: "Sydney Gymnastics & Aquatic Centre", suburb: "Rooty Hill", cat: "Gymnastics", age: "3-16", price: "$", rating: 4.6, reviews: 44, desc: "Club of the Year 2016–2025. Recreational to advanced squad.", badge: "badge-gym", web: "https://www.sgac.com.au", instagram: "https://www.instagram.com/sgac_sydney/", facebook: "https://www.facebook.com/SGACSydney/" },
  { title: "AAGI Gymnastics", suburb: "Brookvale", cat: "Gymnastics", age: "18m-18", price: "$$", rating: 4.8, reviews: 44, desc: "Northern Beaches gymnastics and acrobatics. Kindy gym, artistic and acro.", badge: "badge-gym", web: "https://www.aagigym.com.au", instagram: "https://www.instagram.com/aagigym/", facebook: "https://www.facebook.com/aagigym/" },
  { title: "Modbod Kids Gymnastics", suburb: "Ashfield", cat: "Gymnastics", age: "2-14", price: "$$", rating: 4.8, reviews: 37, desc: "Non-competitive gymnastics with small class sizes. Registered Gymnastics NSW club.", badge: "badge-gym", web: "https://www.modbodkids.com.au", instagram: "https://www.instagram.com/modbodkids/", facebook: "https://www.facebook.com/modbodkids/" },
  { title: "East Gymnastics", suburb: "Edgecliff", cat: "Gymnastics", age: "2-18", price: "$$", rating: 4.8, reviews: 41, desc: "Eastern Suburbs gymnastics. Recreational and competitive from toddlers to advanced squads.", badge: "badge-gym", web: "https://www.eastgymnastics.com.au", instagram: "https://www.instagram.com/eastgymnastics/", facebook: "https://www.facebook.com/eastgymnastics/" },
  { title: "SXL Gymnastics", suburb: "Hornsby", cat: "Gymnastics", age: "3-18", price: "$$", rating: 4.7, reviews: 28, desc: "North Shore gymnastics with 25+ years' excellence. Recreational to advanced squad.", badge: "badge-gym", web: "https://www.sxlgymnastics.com.au", instagram: "https://www.instagram.com/sxlgymnastics/", facebook: "https://www.facebook.com/sxlgymnastics/" },
  { title: "Pinnacle Martial Arts", suburb: "Marrickville", cat: "Martial Arts", age: "3-18", price: "$", rating: 4.8, reviews: 61, desc: "Taekwondo, karate, kung fu and kickboxing for kids and teens.", badge: "badge-martial", web: "https://www.pinnaclemartialarts.com.au", instagram: "https://www.instagram.com/pinnaclemartialarts/", facebook: "https://www.facebook.com/pinnaclemartialarts/" },
  { title: "Gracie Barra BJJ", suburb: "Bondi Junction", cat: "Martial Arts", age: "3-16", price: "$$", rating: 4.9, reviews: 78, desc: "Kids Brazilian Jiu-Jitsu. Tiny Champions from age 3. Safe, inclusive culture.", badge: "badge-martial", web: "https://graciebarrabondi.com", instagram: "https://www.instagram.com/gbbondi/", facebook: "https://www.facebook.com/graciebarra.bondi/" },
  { title: "Mosman Martial Arts Academy", suburb: "Neutral Bay", cat: "Martial Arts", age: "4-18", price: "$$", rating: 4.8, reviews: 57, desc: "Kids karate, kickboxing and capoeira. Little Ninjas from age 4.", badge: "badge-martial", web: "https://www.martialartsacademy.com.au", instagram: "https://www.instagram.com/mosmanmartialarts/", facebook: "https://www.facebook.com/MosmanMartialArtsAcademy/" },
  { title: "Australian Taekwondo", suburb: "Strathfield", cat: "Martial Arts", age: "5-18", price: "$", rating: 4.7, reviews: 41, desc: "Olympic-style Taekwondo. State and national competition pathways.", badge: "badge-martial", web: "https://www.australiantaekwondo.com.au", instagram: "https://www.instagram.com/australiantaekwondo/", facebook: "https://www.facebook.com/AustralianTaekwondo/" },
  { title: "Marconi Fencing Academy", suburb: "Bossley Park", cat: "Martial Arts", age: "5-18", price: "$", rating: 4.7, reviews: 31, desc: "Western Sydney fencing academy. Safe, fun for all ages.", badge: "badge-martial", web: "https://marconifa.org.au", instagram: "https://www.instagram.com/marconifencingacademy/", facebook: "https://www.facebook.com/marconifencingacademy/" },
  { title: "Sydney Academy of Fencing", suburb: "Sydenham", cat: "Fencing", age: "7-18", price: "$$", rating: 4.8, reviews: 31, desc: "Olympic and national coaches. All 3 weapons across 16 dedicated pistes.", badge: "badge-fencing", web: "https://www.sydneyacademyoffencing.com.au", instagram: "https://www.instagram.com/saf_fencing/", facebook: "https://www.facebook.com/SydneyAcademyofFencing" },
  { title: "Sydney Beyond Fencing", suburb: "Artarmon", cat: "Fencing", age: "8+", price: "$$", rating: 4.8, reviews: 26, desc: "2025 NSW Club of the Year. Australia's first FIE Junior World Cup gold medallist coach.", badge: "badge-fencing", web: "https://sydneybeyondfencing.com.au", instagram: "https://www.instagram.com/sydneybeyondfencingclub/" },
  { title: "Hills Athletic Fencing Club", suburb: "Castle Hill", cat: "Fencing", age: "6-18", price: "$$", rating: 4.7, reviews: 18, desc: "#1 ranked youth fencing club in NSW. Club of the Year. All abilities.", badge: "badge-fencing", web: "https://www.hillsfencingclub.com.au", instagram: "https://www.instagram.com/hillsathleticfencing/", facebook: "https://www.facebook.com/hillsathleticfencing/" },
  { title: "K Fencing Club", suburb: "North Rocks", cat: "Fencing", age: "6+", price: "$$", rating: 4.7, reviews: 15, desc: "Sydney's largest private sabre fencing club. Australia's #1 ranked sabre coach.", badge: "badge-fencing", web: "https://www.kfencingclub.com.au", instagram: "https://www.instagram.com/k_fencing_club/" },
  { title: "Youth Fencing Academy Sydney", suburb: "Various", cat: "Fencing", age: "4.5-18", price: "$$", rating: 4.8, reviews: 22, desc: "Little Stars from age 4.5. Building skills, character and love of fencing.", badge: "badge-fencing", web: "https://youthfencingacademy.com.au", instagram: "https://www.instagram.com/youthfencingacademy/", facebook: "https://www.facebook.com/p/Youth-Fencing-Academy-61568898197299/" },
  { title: "UNSW Fencing Club", suburb: "Kensington", cat: "Fencing", age: "14+", price: "$", rating: 4.7, reviews: 18, desc: "One of Sydney's oldest fencing clubs. All three weapons. Beginner-friendly.", badge: "badge-fencing", web: "https://www.unswfencing.com", instagram: "https://www.instagram.com/unswfencing/", facebook: "https://www.facebook.com/unswfencing/" },
  { title: "Fencing NSW Junior Development", suburb: "Sydney Olympic Park", cat: "Fencing", age: "8-18", price: "$$", rating: 4.8, reviews: 34, desc: "State peak body junior development. All weapons, beginner to representative.", badge: "badge-fencing", web: "https://fencingnsw.com.au", instagram: "https://www.instagram.com/fencing_nsw/", facebook: "https://www.facebook.com/FencingNSW/" },
  { title: "Sydney University Fencing Club", suburb: "Camperdown", cat: "Fencing", age: "15+", price: "$", rating: 4.7, reviews: 22, desc: "Community-open club. Foil, épée and sabre on weekday evenings.", badge: "badge-fencing", web: "https://www.sufc.org.au", instagram: "https://www.instagram.com/sufencingclub/", facebook: "https://www.facebook.com/sydneyuniversityfencingclub/" },
  { title: "PGA Golf Academy — Junior", suburb: "Moore Park", cat: "Golf", age: "5-18", price: "$$", rating: 4.8, reviews: 41, desc: "PGA-qualified coaches. Structured junior programs from beginner to advanced.", badge: "badge-golf", web: "https://www.pga.org.au/junior-golf/", instagram: "https://www.instagram.com/pgaofaustralia/", facebook: "https://www.facebook.com/PGAofAustralia/" },
  { title: "Golf Australia — Junior Golf", suburb: "Various", cat: "Golf", age: "5-17", price: "$", rating: 4.7, reviews: 38, desc: "National junior development pathway. Beginner clinics to national competition.", badge: "badge-golf", web: "https://www.golf.org.au/juniors/", instagram: "https://www.instagram.com/golfaustralia/", facebook: "https://www.facebook.com/GolfAustralia/" },
  { title: "The Australian Golf Club Juniors", suburb: "Rosebery", cat: "Golf", age: "7-18", price: "$$$", rating: 4.8, reviews: 19, desc: "Junior programs at one of Australia's most prestigious private clubs.", badge: "badge-golf", web: "https://www.theaustralian.com.au", instagram: "https://www.instagram.com/theaustraliangolfclub/", facebook: "https://www.facebook.com/theaustraliangolfclub/" },
  { title: "The Lakes Golf Club Juniors", suburb: "Eastlakes", cat: "Golf", age: "7-18", price: "$$$", rating: 4.8, reviews: 17, desc: "Junior membership and coaching at one of Sydney's finest golf clubs.", badge: "badge-golf", web: "https://www.thelakes.com.au", instagram: "https://www.instagram.com/thelakesgolfclub/", facebook: "https://www.facebook.com/TheLakesGolfClub/" },
  { title: "Bondi Golf Club Juniors", suburb: "Bondi", cat: "Golf", age: "7-18", price: "$$", rating: 4.7, reviews: 22, desc: "Junior clinics at Sydney's iconic beachside course. Saturday morning programs.", badge: "badge-golf", web: "https://bondigolf.com.au", instagram: "https://www.instagram.com/bondigolfclub/", facebook: "https://www.facebook.com/bondigolfclub/" },
  { title: "Castle Hill Country Club Juniors", suburb: "Castle Hill", cat: "Golf", age: "6-18", price: "$$", rating: 4.6, reviews: 28, desc: "Full junior membership, coaching and competitions. 18-hole course.", badge: "badge-golf", web: "https://www.castlehillcountryclub.com.au", instagram: "https://www.instagram.com/castlehillcc/", facebook: "https://www.facebook.com/CastleHillCountryClub/" },
  { title: "Eastern Creek Golf & Toptracer Range", suburb: "Eastern Creek", cat: "Golf", age: "5-16", price: "$", rating: 4.8, reviews: 36, desc: "Tech-driven range with Toptracer ball-tracking. Junior clinics every weekend.", badge: "badge-golf", web: "https://www.easterncreekgolf.com.au", instagram: "https://www.instagram.com/easterncreekgolf/", facebook: "https://www.facebook.com/easterncreekgolf/" },
  { title: "Prof. Shixiang Zhang — Violin", suburb: "Private Tuition", cat: "Music", age: "5-18", price: "$$$", rating: 5.0, reviews: 18, desc: "Private violin lessons. Classical training.", badge: "badge-music", web: "https://zhangviolin.org/ZhangMethod/ProfessorZhang" },
  { title: "School of Rock Sydney", suburb: "Newtown", cat: "Music", age: "5-18", price: "$$", rating: 4.8, reviews: 74, desc: "One-on-one lessons plus band rehearsals and live gigs.", badge: "badge-music", web: "https://www.schoolofrock.com/locations/sydney", instagram: "https://www.instagram.com/schoolofrocksydney/", facebook: "https://www.facebook.com/schoolofrocksydney/" },
  { title: "Musica Viva Little Stars", suburb: "CBD", cat: "Music", age: "3-6", price: "$$", rating: 4.7, reviews: 38, desc: "Early childhood music through play and song.", badge: "badge-music", web: "https://www.musicaviva.com.au/education/early-learning/", instagram: "https://www.instagram.com/musicaviva/" },
  { title: "Forte School of Music", suburb: "Various (Sydney-wide)", cat: "Music", age: "3-18", price: "$$", rating: 4.7, reviews: 88, desc: "Australia's largest music school network. Piano, guitar, violin, voice.", badge: "badge-music", web: "https://www.fortemusic.com.au", instagram: "https://www.instagram.com/forteschoolofmusic/", facebook: "https://www.facebook.com/ForteSchoolOfMusic/" },
  { title: "Sydney Conservatorium Junior Program", suburb: "Sydney CBD", cat: "Music", age: "3-18", price: "$$$", rating: 4.9, reviews: 66, desc: "Junior music at Australia's most prestigious conservatorium.", badge: "badge-music", web: "https://www.sydney.edu.au/music/study/junior-conservatorium.html", instagram: "https://www.instagram.com/sydneyconservatorium/", facebook: "https://www.facebook.com/sydneyconservatorium/" },
  { title: "Australian Institute of Music Junior", suburb: "Sydney CBD", cat: "Music", age: "6-18", price: "$$$", rating: 4.8, reviews: 44, desc: "Junior programs at Australia's leading contemporary music college.", badge: "badge-music", web: "https://www.aim.edu.au", instagram: "https://www.instagram.com/aimusicaus/", facebook: "https://www.facebook.com/AIMAustralia/" },
  { title: "Drumtek School of Drumming", suburb: "Waterloo", cat: "Music", age: "5-18", price: "$$", rating: 4.8, reviews: 33, desc: "Sydney's dedicated drum school. Private and group classes for all styles.", badge: "badge-music", web: "https://www.drumtek.com.au/lessons", instagram: "https://www.instagram.com/drumteksydney/", facebook: "https://www.facebook.com/drumteksydney/" },
  { title: "Randwick Music Centre", suburb: "Randwick", cat: "Music", age: "4-18", price: "$$", rating: 4.7, reviews: 29, desc: "Piano, guitar, violin, flute and theory. AMEB exam preparation.", badge: "badge-music", web: "https://www.randwickmusiccentre.com.au", instagram: "https://www.instagram.com/randwickmusiccentre/", facebook: "https://www.facebook.com/randwickmusiccentre/" },
  { title: "Music Box Studios", suburb: "Leichhardt", cat: "Music", age: "4-14", price: "$", rating: 4.7, reviews: 22, desc: "Inner West music studio. Ukulele, guitar, piano and voice.", badge: "badge-music", web: "https://www.musicboxstudios.com.au", instagram: "https://www.instagram.com/musicboxstudios/", facebook: "https://www.facebook.com/musicboxstudios/" },
  { title: "Art House Kids", suburb: "Balmain", cat: "Art", age: "5-14", price: "$$", rating: 4.8, reviews: 47, desc: "Drawing, painting, ceramics and mixed media in the Inner West.", badge: "badge-art", web: "https://www.arthousekids.com.au", instagram: "https://www.instagram.com/arthousekids/", facebook: "https://www.facebook.com/arthousekids/" },
  { title: "Art Gallery NSW Art Classes", suburb: "Sydney CBD", cat: "Art", age: "5-16", price: "$$", rating: 4.8, reviews: 52, desc: "Art classes at the Art Gallery of NSW. Drawing, painting and creative exploration.", badge: "badge-art", web: "https://www.artgallery.nsw.gov.au/whats-on/programs/kids/", instagram: "https://www.instagram.com/artgallerynsw/", facebook: "https://www.facebook.com/artgallerynsw/" },
  { title: "Sydney Ceramic Arts", suburb: "Rozelle", cat: "Art", age: "4-14", price: "$$", rating: 4.8, reviews: 41, desc: "Kids ceramics. Hand-building, wheel-throwing and glazing.", badge: "badge-art", web: "https://www.sydneyceramicarts.com.au", instagram: "https://www.instagram.com/sydneyceramicarts/", facebook: "https://www.facebook.com/sydneyceramicarts/" },
  { title: "Bankstown Arts Centre", suburb: "Bankstown", cat: "Art", age: "5-17", price: "$", rating: 4.6, reviews: 34, desc: "Community arts hub. Printmaking, sculpture and visual art workshops.", badge: "badge-art", web: "https://www.bankstownarts.com.au", instagram: "https://www.instagram.com/bankstownartscentre/", facebook: "https://www.facebook.com/BankstownArtsCentre/" },
  { title: "Powerhouse Museum Kids Workshops", suburb: "Ultimo", cat: "Art", age: "5-14", price: "$", rating: 4.7, reviews: 39, desc: "Hands-on art and making at Sydney's iconic Powerhouse Museum.", badge: "badge-art", web: "https://www.maas.museum/powerhouse/whats-on/workshops/", instagram: "https://www.instagram.com/powerhousemuseum/", facebook: "https://www.facebook.com/powerhousemuseum/" },
  { title: "Shillington College Junior", suburb: "Surry Hills", cat: "Art", age: "10-18", price: "$$$", rating: 4.8, reviews: 22, desc: "Graphic design and digital illustration for teens at Sydney's leading design school.", badge: "badge-art", web: "https://www.shillingtoneducation.com", instagram: "https://www.instagram.com/shillingtoncollege/", facebook: "https://www.facebook.com/ShillingtonCollege/" },
  { title: "CoderDojo Sydney", suburb: "CBD", cat: "STEM", age: "7-17", price: "Free", rating: 4.9, reviews: 82, desc: "Free volunteer-led coding club. Scratch, HTML, Python and game design.", badge: "badge-stem", web: "https://coderdojosydney.wordpress.com", instagram: "https://www.instagram.com/coderdojo/", facebook: "https://www.facebook.com/CoderDojoSydney/" },
  { title: "iD Tech Camps", suburb: "UNSW Kensington", cat: "STEM", age: "8-18", price: "$$$", rating: 4.8, reviews: 54, desc: "Coding, robotics, AI and game development holiday camps at UNSW.", badge: "badge-stem", web: "https://www.idtech.com", instagram: "https://www.instagram.com/idtech/" },
  { title: "Robogals Sydney", suburb: "Ultimo", cat: "STEM", age: "8-15", price: "$", rating: 4.7, reviews: 31, desc: "Robotics workshops encouraging girls into engineering.", badge: "badge-stem", web: "https://robogals.org/chapters/sydney/", instagram: "https://www.instagram.com/robogals/", facebook: "https://www.facebook.com/RobogalsSydney/" },
  { title: "Robokids Australia", suburb: "Macquarie Park", cat: "STEM", age: "5-14", price: "$$", rating: 4.7, reviews: 33, desc: "Robotics, electronics and coding. LEGO Mindstorms, Arduino and Scratch.", badge: "badge-stem", web: "https://www.robokids.com.au", instagram: "https://www.instagram.com/robokidsaustralia/", facebook: "https://www.facebook.com/robokidsaustralia/" },
  { title: "Little Scientists Australia", suburb: "Inner West", cat: "STEM", age: "3-6", price: "$", rating: 4.8, reviews: 48, desc: "Early childhood STEM play through experiments, building and nature.", badge: "badge-stem", web: "https://www.littlescientists.com.au", instagram: "https://www.instagram.com/littlescientistsaustralia/", facebook: "https://www.facebook.com/LittleScientistsAustralia/" },
  { title: "Code Camp", suburb: "Various (Sydney-wide)", cat: "STEM", age: "6-14", price: "$$", rating: 4.7, reviews: 82, desc: "Australia's largest kids coding program. Game design, apps and web development.", badge: "badge-stem", web: "https://www.codecamp.com.au", instagram: "https://www.instagram.com/codecampau/", facebook: "https://www.facebook.com/CodeCampAu/" },
  { title: "Manly Marlins Junior Rugby League", suburb: "Manly", cat: "Sport", age: "5-16", price: "$", rating: 4.7, reviews: 44, desc: "Junior rugby league on the Northern Beaches. Mini League to under-18.", badge: "badge-sport", web: "https://www.manlymarlins.com.au", instagram: "https://www.instagram.com/manlymarlins/", facebook: "https://www.facebook.com/manlymarlins/" },
  { title: "Baulkham Hills FC", suburb: "Baulkham Hills", cat: "Sport", age: "4-18", price: "$", rating: 4.6, reviews: 51, desc: "One of Sydney's largest football clubs. Mini Roos to NPL-level junior comp.", badge: "badge-sport", web: "https://www.bhillsfc.com.au", instagram: "https://www.instagram.com/baulkhamhillsfc/", facebook: "https://www.facebook.com/baulkhamhillsfc/" },
  { title: "Sydney Swans Auskick", suburb: "Various", cat: "Sport", age: "5-12", price: "$", rating: 4.8, reviews: 61, desc: "AFL skills and games for young footy fans across Sydney.", badge: "badge-sport", web: "https://www.sydneyswans.com.au/community/auskick", instagram: "https://www.instagram.com/sydneyswans/", facebook: "https://www.facebook.com/sydneyswans/" },
  { title: "Inner West Little Athletics", suburb: "Tempe", cat: "Sport", age: "5-16", price: "$", rating: 4.7, reviews: 52, desc: "Saturday morning track and field. Sprints, jumps, throws and cross-country.", badge: "badge-sport", web: "https://www.littleathletics.com.au", instagram: "https://www.instagram.com/littleathletics_nsw/", facebook: "https://www.facebook.com/LittleAthleticsNSW/" },
  { title: "St George District Cricket Juniors", suburb: "Hurstville", cat: "Sport", age: "6-18", price: "$", rating: 4.6, reviews: 37, desc: "Junior cricket from Milo Cricket through to premier competition.", badge: "badge-sport", web: "https://www.stgeorgecricket.com.au", instagram: "https://www.instagram.com/stgeorgedistrict/", facebook: "https://www.facebook.com/StGeorgeDistrictCricket/" },
  { title: "Penrith Netball Association", suburb: "Penrith", cat: "Sport", age: "7-18", price: "$", rating: 4.6, reviews: 33, desc: "Junior netball competition and development in Western Sydney.", badge: "badge-sport", web: "https://www.penrithnetball.com.au", instagram: "https://www.instagram.com/penrithnetball/", facebook: "https://www.facebook.com/penrithnetball/" },
  { title: "North Shore Tennis", suburb: "Gordon", cat: "Sport", age: "4-18", price: "$$", rating: 4.7, reviews: 41, desc: "Hot Shots programs through to competitive pathways on the North Shore.", badge: "badge-sport", web: "https://www.tennisaustralia.com.au/play/hot-shots", instagram: "https://www.instagram.com/tennisaustralia/", facebook: "https://www.facebook.com/TennisAustralia/" },
  { title: "Waverley College FC", suburb: "Waverley", cat: "Sport", age: "5-18", price: "$", rating: 4.6, reviews: 29, desc: "Eastern Suburbs football. Mini Roos to NPL-pathway competition.", badge: "badge-sport", web: "https://www.waverleyfootball.com.au", instagram: "https://www.instagram.com/waverleyfc/", facebook: "https://www.facebook.com/waverleyfc/" },
  { title: "Ryde Basketball Association", suburb: "Ryde", cat: "Sport", age: "6-18", price: "$", rating: 4.6, reviews: 34, desc: "Junior basketball development and competition. Basketball NSW pathways.", badge: "badge-sport", web: "https://www.rydebasketball.com.au", instagram: "https://www.instagram.com/rydebasketball/", facebook: "https://www.facebook.com/rydebasketball/" },
  { title: "Box Hill United FC", suburb: "Box Hill", cat: "Sport", age: "5-18", price: "$", rating: 4.5, reviews: 21, desc: "Northwest Sydney football with strong junior development culture.", badge: "badge-sport", web: "https://www.boxhillunited.com.au", instagram: "https://www.instagram.com/boxhillunited/", facebook: "https://www.facebook.com/boxhillunited/" },
  { title: "Northern Suburbs Touch Football", suburb: "Pymble", cat: "Sport", age: "5-16", price: "$", rating: 4.6, reviews: 27, desc: "Touch football for kids and families. All ages and abilities.", badge: "badge-sport", web: "https://www.northernsuburbs.touch.asn.au", instagram: "https://www.instagram.com/touchfootball_nsw/", facebook: "https://www.facebook.com/touchfootball.nsw/" },
  { title: "North Shore Sailing Club", suburb: "Mosman", cat: "Sailing", age: "8-17", price: "$$$", rating: 4.8, reviews: 22, desc: "Learn to sail on Sydney Harbour. Cadet dinghy programs and junior competitive pathways.", badge: "badge-sailing", web: "https://www.northshoresailing.com.au", instagram: "https://www.instagram.com/northshoresailingclub/", facebook: "https://www.facebook.com/northshoresailingclub/" },
  { title: "Woollahra Sailing Club", suburb: "Rose Bay", cat: "Sailing", age: "7-18", price: "$$", rating: 4.8, reviews: 28, desc: "Optimist, Laser and dinghy classes on Sydney Harbour. Beginner to competitive.", badge: "badge-sailing", web: "https://www.wsc.com.au", instagram: "https://www.instagram.com/woollahrasailingclub/", facebook: "https://www.facebook.com/WoollahraYachtClub/" },
  { title: "Pacific Sailing School — Youth Academy", suburb: "Rushcutters Bay", cat: "Sailing", age: "8-18", price: "$$", rating: 4.8, reviews: 22, desc: "Youth sailing on Sydney Harbour. Learn to Sail, keelboat and dinghy for beginners to racing.", badge: "badge-sailing", web: "https://www.pacificsailing.com.au", instagram: "https://www.instagram.com/pacificsailingsydney/", facebook: "https://www.facebook.com/pacificsailingsydney/" },
  { title: "Brent Street", suburb: "Moore Park", cat: "Drama", age: "4-18", price: "$$$", rating: 4.9, reviews: 89, desc: "Australia's Home of Performing Arts. Dance, drama and musical theatre.", badge: "badge-drama", web: "https://brentstreet.com.au", instagram: "https://www.instagram.com/brentstreet/", facebook: "https://www.facebook.com/brentstreetstudios/" },
  { title: "NIDA Kids Drama", suburb: "Kensington", cat: "Drama", age: "6-17", price: "$$$", rating: 4.9, reviews: 94, desc: "Australia's premier drama school. Acting, musical theatre and screen.", badge: "badge-drama", web: "https://www.open.nida.edu.au/for-young-people/", instagram: "https://www.instagram.com/nidacommunity/", facebook: "https://www.facebook.com/NIDAopen/" },
  { title: "Flying Penguin Performing Arts", suburb: "Drummoyne", cat: "Drama", age: "4-16", price: "$$", rating: 4.8, reviews: 47, desc: "Musical theatre, improvisation and confidence-building workshops.", badge: "badge-drama", web: "https://www.flyingpenguin.com.au", instagram: "https://www.instagram.com/flyingpenguinperformingarts/", facebook: "https://www.facebook.com/flyingpenguinperformingarts/" },
  { title: "Improv Theatre Sydney", suburb: "Newtown", cat: "Drama", age: "8-18", price: "$$", rating: 4.7, reviews: 38, desc: "Teen improv classes: funny, fearless and freeing.", badge: "badge-drama", web: "https://www.improvtheatresydney.com.au", instagram: "https://www.instagram.com/improvtheatresydney/", facebook: "https://www.facebook.com/improvtheatresydney/" },
  { title: "Riverside Theatres Drama Programs", suburb: "Parramatta", cat: "Drama", age: "6-17", price: "$$", rating: 4.7, reviews: 36, desc: "Term-based drama at Western Sydney's professional performing arts centre.", badge: "badge-drama", web: "https://www.riversideparramatta.com.au", instagram: "https://www.instagram.com/riversideparramatta/", facebook: "https://www.facebook.com/RiversideParramatta/" },
  { title: "Monkey Baa Theatre", suburb: "Pyrmont", cat: "Drama", age: "5-14", price: "$$", rating: 4.7, reviews: 29, desc: "Sydney's leading theatre for young audiences. Drama workshops blending story and play.", badge: "badge-drama", web: "https://www.monkeybaa.com.au", instagram: "https://www.instagram.com/monkeybaa/", facebook: "https://www.facebook.com/monkeybaa/" },
  { title: "AFTRS Open Kids & Teens", suburb: "Moore Park", cat: "Drama", age: "8-18", price: "$$$", rating: 4.8, reviews: 33, desc: "Screen acting and filmmaking at the Australian Film Television and Radio School.", badge: "badge-drama", web: "https://www.aftrs.edu.au/open/kids-and-teens/", instagram: "https://www.instagram.com/aftrssydney/", facebook: "https://www.facebook.com/AFTRS/" },
  { title: "Alliance Française Kids", suburb: "CBD", cat: "Language", age: "3-15", price: "$$", rating: 4.8, reviews: 44, desc: "French immersion classes, songs and cultural activities.", badge: "badge-language", web: "https://www.afsydney.com.au", instagram: "https://www.instagram.com/alliancefrancaisesydney/", facebook: "https://www.facebook.com/AllianceFrancaiseDeSydney/" },
  { title: "Berlitz Kids Japanese", suburb: "CBD", cat: "Language", age: "5-14", price: "$$$", rating: 4.7, reviews: 27, desc: "Conversational Japanese through play, anime and stories.", badge: "badge-language", web: "https://www.berlitz.com/en-au/language-schools/sydney", instagram: "https://www.instagram.com/berlitz/", facebook: "https://www.facebook.com/berlitz/" },
  { title: "Sydney Mandarin School", suburb: "Chatswood", cat: "Language", age: "4-16", price: "$$", rating: 4.8, reviews: 52, desc: "HSK-aligned Mandarin from preschool to HSC level.", badge: "badge-language", web: "https://sydneymandarinschool.com.au", instagram: "https://www.instagram.com/sydneymandarinschool/", facebook: "https://www.facebook.com/sydneymandarinschool/" },
  { title: "Instituto Cervantes Sydney Kids", suburb: "CBD", cat: "Language", age: "4-16", price: "$$", rating: 4.7, reviews: 31, desc: "Spanish and Latin American culture at Spain's official cultural institute.", badge: "badge-language", web: "https://sydney.cervantes.es/en/spanish_language_courses_sydney.htm", instagram: "https://www.instagram.com/cervantes_sydney/", facebook: "https://www.facebook.com/institutocervantessydney/" },
  { title: "Korean School of Sydney", suburb: "Strathfield", cat: "Language", age: "5-18", price: "$$", rating: 4.7, reviews: 44, desc: "Korean from beginner to advanced. TOPIK prep and K-culture activities.", badge: "badge-language", web: "https://www.koreansydney.com.au", instagram: "https://www.instagram.com/koreansydney/", facebook: "https://www.facebook.com/koreansydney/" },
  { title: "Goethe Institut Kids", suburb: "CBD", cat: "Language", age: "6-14", price: "$$", rating: 4.7, reviews: 22, desc: "German language and culture at Germany's official cultural institute.", badge: "badge-language", web: "https://www.goethe.de/ins/au/en/index.html", instagram: "https://www.instagram.com/goetheinstitut_australien/", facebook: "https://www.facebook.com/goetheinstitut.australien/" },
  { title: "Istituto Italiano di Cultura Kids", suburb: "Sydney CBD", cat: "Language", age: "3-14", price: "$", rating: 4.8, reviews: 29, desc: "Italian through songs, stories, cooking and play at Italy's official cultural institute.", badge: "badge-language", web: "https://www.iicsydney.esteri.it", instagram: "https://www.instagram.com/iicsydney/", facebook: "https://www.facebook.com/IstitutoItalianodiCulturaSydney/" },
  { title: "Arabic Language School NSW", suburb: "Lakemba", cat: "Language", age: "4-16", price: "$", rating: 4.7, reviews: 27, desc: "Community Arabic classes. Modern Standard Arabic, calligraphy and storytelling.", badge: "badge-language", web: "https://www.arabicschoolnsw.com.au", instagram: "https://www.instagram.com/arabicschoolnsw/", facebook: "https://www.facebook.com/arabicschoolnsw/" },
];

const blogPosts = [
  // ✅ LIVE — published articles
  { cat: "Parenting", catClass: "cat-parenting", emoji: "💬", title: "How to talk so kids will listen — and listen so kids will talk", excerpt: "A summary of the classic by Adele Faber & Elaine Mazlish. Practical, empathy-centred tools for transforming how you communicate with your child.", read: "6 min", source: "Book summary", live: true, body: [
    { type: "intro", text: "First published in 1980, this international bestseller is a practical, empathy-centred guide to transforming parent-child communication. Its core premise: children cooperate better when they feel understood, respected and valued — not when they are lectured, shamed or ordered around." },
    { type: "h2", text: "1. Accept and validate feelings" },
    { type: "p", text: "Feelings are never wrong — only actions can be. Dismissing emotions ('It\'s not a big deal,' 'Stop crying') makes kids shut down or act out. Instead:" },
    { type: "ul", items: ["Listen fully — give your attention without interrupting", "Acknowledge simply: 'I see you\'re upset' or 'That sounds frustrating'", "Name the feeling: 'You look disappointed'", "Grant in fantasy: 'I wish we could stay longer too!'"] },
    { type: "p", text: "Validating feelings calms children and helps them regulate emotions." },
    { type: "h2", text: "2. Speak to encourage cooperation" },
    { type: "p", text: "Replace commands, blame and criticism with language that invites collaboration:" },
    { type: "ul", items: ["Describe what you see: 'Milk spilled on the table' instead of 'You made a mess!'", "Say what you need: 'I need the floor clear so I can walk safely'", "Give information: 'Wet shoes can make the floor slippery'", "Use I-statements: 'I get worried when you run near the road'", "Offer choices: 'Would you like to put on your coat first or your hat?'"] },
    { type: "p", text: "This reduces defensiveness and turns resistance into willingness." },
    { type: "h2", text: "3. Set limits without harshness" },
    { type: "p", text: "Firm boundaries are essential — but they don\'t require harshness:" },
    { type: "ul", items: ["State the rule clearly: 'No hitting. People are not for hurting'", "Express your feelings: 'I feel frustrated when toys are left all over the house'", "Show how to make amends: 'Let\'s get a cloth and clean it up together'", "Use natural consequences: 'If you leave your bike out, it may get wet' — rather than arbitrary punishment"] },
    { type: "p", text: "Limits teach responsibility while preserving trust." },
    { type: "h2", text: "4. Replace punishment with problem-solving" },
    { type: "p", text: "Punishment often creates resentment and teaches fear, not self-discipline. Better alternatives:" },
    { type: "ul", items: ["Brainstorm solutions together: 'What can we do so homework gets done on time?'", "Focus on fixing, not blaming", "Let children experience reasonable consequences", "Acknowledge effort: 'You tried hard to finish your work'"] },
    { type: "p", text: "The goal is to help children learn to manage themselves." },
    { type: "h2", text: "5. Praise that actually builds confidence" },
    { type: "p", text: "Avoid global labels like 'You\'re so smart!' — they can create pressure. Instead:" },
    { type: "ul", items: ["Praise specifically: 'I noticed you shared your blocks and waited your turn'", "Describe effort and result: 'You worked carefully and finished the puzzle'", "Let them feel their own pride: 'How does it feel to have it done?'"] },
    { type: "p", text: "This builds genuine self-esteem and intrinsic motivation." },
    { type: "h2", text: "The takeaway" },
    { type: "p", text: "This book is not about controlling children — it\'s about connecting with them. By switching from judgment to empathy, commands to collaboration, and criticism to respect, parents reduce daily battles, strengthen trust and raise children who both listen and know how to speak up." },
  ]},

  // 💡 ARTICLE IDEAS — add live: true and body: [...] when ready to publish
  // { cat: "Education", emoji: "📚", title: "Public vs. private school in Sydney: what parents actually need to know", excerpt: "Fees, catchments, selective entry and what really predicts a happy school experience.", read: "8 min" },
  // { cat: "Health & Wellbeing", emoji: "🌿", title: "Screen time in 2026: the research, the guilt and a sensible middle ground", excerpt: "What the latest studies actually say — without the panic or the dismissal.", read: "5 min" },
  // { cat: "Child Development", emoji: "🧠", title: "The magic of boredom: why unstructured time is your child's secret superpower", excerpt: "The science behind doing less — and how to stop feeling guilty about it.", read: "4 min" },
  // { cat: "Activity Ideas", emoji: "🎨", title: "10 rainy day activities that aren't just YouTube", excerpt: "Real ideas that work for kids aged 3–12, tested by Sydney parents.", read: "3 min" },
  // { cat: "Parenting", emoji: "🤝", title: "Raising resilient kids: small daily habits with a big long-term payoff", excerpt: "The micro-moments that build grit, confidence and bounce-back in children.", read: "6 min" },
  // { cat: "Child Development", emoji: "🏃", title: "When should my child start organised sport? A guide by age", excerpt: "The developmental case for waiting — and the signs your child is ready.", read: "5 min" },
  // { cat: "Parenting", emoji: "😴", title: "The sleep issue nobody talks about: what happens when your child won't stay asleep", excerpt: "Night waking past toddlerhood is more common than you think.", read: "7 min" },
  // { cat: "Health & Wellbeing", emoji: "🥗", title: "Fussy eaters: what works, what doesn't, and when to stop stressing", excerpt: "Strategies that actually move the needle without turning every meal into a battle.", read: "6 min" },
  // { cat: "Activity Ideas", emoji: "🎵", title: "Is music really good for kids' brains? The evidence, and how to get started in Sydney", excerpt: "Research says yes — but not in the way most parents think.", read: "4 min" },
  // { cat: "Education", emoji: "🏫", title: "Selective schools in NSW: everything Sydney parents ask us about", excerpt: "Entry requirements, preparation, the right age to start — and whether the pressure is worth it.", read: "9 min" },
  // { cat: "Child Development", emoji: "👫", title: "Friendship troubles at school: how parents can help without taking over", excerpt: "When to step in, when to step back, and the questions that help kids solve social problems.", read: "5 min" },
];

const events = [
  { badge: "4–19 Jul 2026", title: "You & Me and The Land of Lost Things", venue: "Playhouse, Sydney Opera House", desc: "A brand-new stage show from the creators of the Treehouse series — Andy Griffiths & Bill Hope's bonkers book comes to life. Ages 6+. From $39.90.", url: "https://www.sydneyoperahouse.com/kids-families", img: "/images/you-and-me.jpg" },
  { badge: "4–11 Jul 2026", title: "Flying Fruit Fly Circus", venue: "Studio, Sydney Opera House", desc: "Thirteen young acrobats mix circus skills, comedy and sleight of hand in a high-energy show. Ages 6+. From $29.90.", url: "https://www.sydneyoperahouse.com/kids-families", img: "/images/flying-fruit-fly-circus.webp" },
  { badge: "10–19 Jul 2026", title: "Christmas in July Festival", venue: "The Rocks, Sydney CBD", desc: "Free entry. European-style winter market with snowfalls, fairy lights, live jazz sessions and roving performers. Perfect family day out.", url: "https://www.therocks.com", img: "/images/christmas-in-july.webp" },
  { badge: "5–12 Jul 2026", title: "NAIDOC Week Celebrations", venue: "Across Sydney", desc: "Celebrating Aboriginal and Torres Strait Islander culture. Djaadjawan Dancers perform at the Australian Maritime Museum. Many events free.", url: "https://www.naidoc.org.au" },
  { badge: "10–18 Jul 2026", title: "Art Gallery Family Festival", venue: "Art Gallery NSW, Sydney CBD", desc: "Free fun-filled festival for kids and families across 11–12 July. Drop-in workshops, roving art-making tours and interactive installations. Free entry.", url: "https://www.artgallery.nsw.gov.au" },
  { badge: "Daily", title: "Digipark — Immersive Entertainment", venue: "Westfield Sydney, Level 5", desc: "VR worlds, 9D cinemas and holographic tunnel. Fun for all ages in the heart of the CBD.", url: "https://www.digipark.com.au", img: "/images/digipark.jpg" },
  { badge: "Until Aug 2026", title: "Bondi Festival 2026", venue: "Bondi Beach precinct", desc: "17-day winter festival marking Bondi's milestone postcode year 2026. Comedy Gala, beachside Ice Rink, Ferris Wheel and free Paw Patrol events.", url: "https://bondifestival.com.au" },
];

const holidays = [
  { badge: "6–10 Jul 2026", title: "NIDA Holiday Course — Acting & Devising", venue: "NIDA Open, Kensington", desc: "A comprehensive holiday course igniting creativity through improvisation, character development and devising. Ages 8–18. From $735. Book early — sells out fast.", url: "https://www.open.nida.edu.au/courses/How/School+Holidays" },
  { badge: "Daily Jul 2026", title: "Taronga Zoo Adventures Program", venue: "Taronga Zoo, Mosman", desc: "Fully hosted full-day program led by Taronga educators. Special animal encounters and behind-the-scenes experiences. Ages 8–11. Book 3–4 weeks ahead.", url: "https://www.taronga.org.au/learn/sydney" },
  { badge: "11–12 Jul 2026", title: "Art Gallery Family Festival — FREE", venue: "Art Gallery NSW, Sydney CBD", desc: "Free drop-in workshops, roving art-making tours and hands-on activities for all ages. No booking required. Free entry.", url: "https://www.artgallery.nsw.gov.au/whats-on/programs/school-holidays/" },
  { badge: "4–19 Jul 2026", title: "Sydney Opera House Kids Shows", venue: "Sydney Opera House, Circular Quay", desc: "You & Me and The Land of Lost Things (ages 6+, from $39.90) plus Flying Fruit Fly Circus (ages 6+, from $29.90). Book now.", url: "https://www.sydneyoperahouse.com/kids-families" },
  { badge: "Throughout Jul", title: "Australian Museum — School Holiday Workshops", venue: "Australian Museum, College St, Sydney", desc: "Drop-in workshops and guided programs at one of Sydney's most iconic institutions. From $15 children (4–15 years). Check website for schedule.", url: "https://www.australian.museum" },
  { badge: "Throughout Jul", title: "Museums of History NSW Holiday Programs", venue: "6 heritage sites across Sydney", desc: "Drop-in activities across Hyde Park Barracks, The Rocks Discovery Museum and more. Most activities free with entry. Check website for dates.", url: "https://www.mhnsw.au" },
  { badge: "Throughout Jul", title: "Council Library Holiday Workshops", venue: "Libraries across Sydney", desc: "Free craft sessions, LEGO clubs, movie screenings and story time at council libraries across the city. No booking required at most.", url: "https://www.libraries.nsw.gov.au" },
  { badge: "25–26 Jul 2026", title: "Pinocchio — ACO String Quartet", venue: "Utzon Room, Sydney Opera House", desc: "The timeless tale of Pinocchio brought to life with live music by an Australian Chamber Orchestra string quartet. Ages 4+. $39.", url: "https://www.sydneyoperahouse.com/kids-families" },
  { badge: "Throughout Jul", title: "Headspace Bondi Junction — Free Youth Groups", venue: "Headspace, Bondi Junction", desc: "Free social and creative groups for young people aged 12–25. Craftspace Art Group (weekly drop-in), New Dimensions Social Club for neurodiverse young people (monthly), and Pickleball Tournament on 6 July in partnership with Rally 4 Ever. Attend with a friend or independently. Ph: 9366 8800.", url: "https://headspace.org.au/headspace-centres/bondi-junction/" },
  { badge: "Every Saturday 7am", title: "Centennial Park Parkrun", venue: "Centennial Park", desc: "Free 5km walk, jog or run every Saturday morning. All paces welcome including walking. A simple, social way to start the weekend — no registration needed on the day.", url: "https://www.parkrun.com.au/centennial/" },
  { badge: "3–19 Jul 2026", title: "Bondi Festival", venue: "Bondi area", desc: "Community festival with live music, art installations, comedy, workshops and food stalls across the Bondi area. A great way to engage with creativity and local community throughout the holidays.", url: "https://www.bondifestival.com.au/event/" },
  { badge: "Throughout Jul", title: "Creative Workshops — Magnolia Studio & WWAS", venue: "Darlinghurst & Waverley", desc: "Magnolia Studio (Darlinghurst) runs ceramics, charcoal and painting workshops. Waverley Woollahra Art School offers holiday programs in drawing, painting and mixed media.", url: "https://magnoliastudio.au/workshops/" },
  { badge: "Throughout Jul", title: "Woollahra Libraries School Holiday Program", venue: "Woollahra local libraries", desc: "Free activities across local libraries including robotics and STEM workshops, drawing, writing and creative arts, gaming, trivia, group activities and craft sessions. No booking required at most sessions.", url: "https://www.woollahra.nsw.gov.au/Library/Whats-on/School-Holidays" },
];

// ── Tag styles ─────────────────────────────────────────────────────────────
const TAG_STYLES_RES = {
  orange:  { background: "#FEF0E6", color: "#7a2e0a", border: "0.5px solid #f5c9a3" },
  blue:    { background: "#E6F1FB", color: "#0C447C", border: "0.5px solid #b5d4f4" },
  green:   { background: "#EAF3DE", color: "#27500A", border: "0.5px solid #c0dd97" },
  default: { background: "#f5f5f3", color: "#555",    border: "0.5px solid #ddd" },
};
function ResTag({ label, style = "default" }) {
  return <span style={{ fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 20, ...TAG_STYLES_RES[style] }}>{label}</span>;
}

// ── SVG Magazine Covers ─────────────────────────────────────────────────────
function CoverWeekJunior() {
  return (
    <svg viewBox="0 0 115 160" xmlns="http://www.w3.org/2000/svg" width="115" height="160">
      <rect width="115" height="160" fill="#1c2d5e"/>
      <rect x="8" y="8" width="99" height="144" rx="4" fill="none" stroke="#4a90d9" strokeWidth="1.5"/>
      <text x="57" y="50" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="system-ui">THE WEEK</text>
      <text x="57" y="72" textAnchor="middle" fill="#4a90d9" fontSize="20" fontWeight="900" fontFamily="system-ui">JUNIOR</text>
      <rect x="25" y="82" width="65" height="2" fill="#4a90d9"/>
      <text x="57" y="104" textAnchor="middle" fill="#cdd" fontSize="8" fontFamily="system-ui">NEWS · SCIENCE</text>
      <text x="57" y="118" textAnchor="middle" fill="#cdd" fontSize="8" fontFamily="system-ui">NATURE · SPORT</text>
      <text x="57" y="148" textAnchor="middle" fill="#aaa" fontSize="7" fontFamily="system-ui">Ages 8–14 · Weekly</text>
    </svg>
  );
}
function CoverScienceNature() {
  return (
    <svg viewBox="0 0 115 160" xmlns="http://www.w3.org/2000/svg" width="115" height="160">
      <rect width="115" height="160" fill="#0a3d2e"/>
      <rect x="6" y="6" width="103" height="148" rx="4" fill="none" stroke="#2ecc71" strokeWidth="1.5"/>
      <circle cx="57" cy="45" r="22" fill="none" stroke="#2ecc71" strokeWidth="1.5"/>
      <circle cx="57" cy="45" r="14" fill="#1a5e3a"/>
      <text x="57" y="51" textAnchor="middle" fill="#2ecc71" fontSize="14" fontFamily="system-ui">🔬</text>
      <text x="57" y="85" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700" fontFamily="system-ui">SCIENCE</text>
      <text x="57" y="97" textAnchor="middle" fill="#2ecc71" fontSize="8.5" fontWeight="700" fontFamily="system-ui">+NATURE</text>
      <rect x="20" y="105" width="75" height="1.5" fill="#2ecc71" opacity=".5"/>
      <text x="57" y="120" textAnchor="middle" fill="#aed6c0" fontSize="7.5" fontFamily="system-ui">THE WEEK JUNIOR</text>
      <text x="57" y="148" textAnchor="middle" fill="#888" fontSize="7" fontFamily="system-ui">Ages 8–15 · Monthly</text>
    </svg>
  );
}
function CoverNatGeo() {
  return (
    <svg viewBox="0 0 115 160" xmlns="http://www.w3.org/2000/svg" width="115" height="160">
      <rect width="115" height="160" fill="#fff8e1"/>
      <rect x="0" y="0" width="115" height="160" fill="none" stroke="#FFD700" strokeWidth="7"/>
      <rect x="8" y="8" width="99" height="144" fill="none" stroke="#FFD700" strokeWidth="2"/>
      <text x="57" y="38" textAnchor="middle" fill="#c9a200" fontSize="7" fontWeight="700" letterSpacing="2" fontFamily="system-ui">NATIONAL</text>
      <text x="57" y="52" textAnchor="middle" fill="#c9a200" fontSize="7" fontWeight="700" letterSpacing="2" fontFamily="system-ui">GEOGRAPHIC</text>
      <rect x="20" y="58" width="75" height="2" fill="#FFD700"/>
      <text x="57" y="76" textAnchor="middle" fill="#1a5276" fontSize="20" fontWeight="900" fontFamily="system-ui">KIDS</text>
      <text x="57" y="110" textAnchor="middle" fontSize="34" fontFamily="system-ui">🐆</text>
      <text x="57" y="133" textAnchor="middle" fill="#555" fontSize="7" fontFamily="system-ui">Animals · Science</text>
      <text x="57" y="148" textAnchor="middle" fill="#888" fontSize="6.5" fontFamily="system-ui">Ages 6–12 · Monthly</text>
    </svg>
  );
}
function CoverTimeForKids() {
  return (
    <svg viewBox="0 0 115 160" xmlns="http://www.w3.org/2000/svg" width="115" height="160">
      <rect width="115" height="160" fill="#cc0000"/>
      <rect x="6" y="6" width="103" height="148" rx="3" fill="none" stroke="#fff" strokeWidth="1" opacity=".3"/>
      <text x="57" y="40" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="-1">TIME</text>
      <rect x="10" y="48" width="95" height="2.5" fill="#fff" opacity=".7"/>
      <text x="57" y="66" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="system-ui" letterSpacing="1">FOR KIDS</text>
      <rect x="10" y="72" width="95" height="1" fill="#fff" opacity=".4"/>
      <text x="57" y="108" textAnchor="middle" fontSize="34" fontFamily="system-ui">📰</text>
      <text x="57" y="133" textAnchor="middle" fill="#ffcdd2" fontSize="7.5" fontFamily="system-ui">Current events for</text>
      <text x="57" y="146" textAnchor="middle" fill="#ffcdd2" fontSize="7.5" fontFamily="system-ui">every reading level</text>
    </svg>
  );
}

const PRINT_MAGAZINES = [
  { Cover: CoverWeekJunior, name: "The Week Junior", url: "https://theweekjunior.com/", meta: "Ages 8–14 · Weekly · Print & digital", desc: "The gold standard in kids' current affairs — 32 colourful pages of global news, science, nature, sports, and culture every week, delivered to your door. Balanced, age-appropriate, and genuinely loved by kids.", tags: [{ label: "Current events", style: "orange" }, { label: "Science", style: "blue" }, { label: "Debates", style: "default" }] },
  { Cover: CoverScienceNature, name: "The Week Junior Science+Nature", url: "https://sciencenature.theweekjunior.co.uk/", meta: "Ages 8–15 · Monthly · Print & digital", desc: "A STEM-focused spin-off packed with jaw-dropping facts, real experiments, incredible photography, and inspiring role models. Includes an award-winning podcast and free online activity hub.", tags: [{ label: "STEM", style: "blue" }, { label: "Experiments", style: "default" }, { label: "Environment", style: "green" }] },
  { Cover: CoverNatGeo, name: "National Geographic Kids", url: "https://www.natgeokids.com/au/", meta: "Ages 6–12 · Monthly · Australian edition available", desc: "Breathtaking photography meets fun features on animals, science, history, and geography. Quizzes, competitions, and poster pull-outs every issue. 97% of subscribers report an educational benefit for their child.", tags: [{ label: "Animals & nature", style: "green" }, { label: "Geography", style: "default" }, { label: "Photography", style: "orange" }] },
  { Cover: CoverTimeForKids, name: "Time for Kids", url: "https://www.timeforkids.com/", meta: "Ages 4–12 · Weekly during school year · Digital", desc: "From the Time magazine family — current events at five reading levels from K to Grade 6. A brilliant tool for building news literacy alongside reading skills. Browse free by grade on their website.", tags: [{ label: "News literacy", style: "blue" }, { label: "Levelled reading", style: "default" }, { label: "Social studies", style: "default" }] },
];

const ONLINE_PLATFORMS = [
  { name: "DOGO News", url: "https://www.dogonews.com/", age: "Ages 5–14 · Free", desc: "Current events, science, sports, and environment organised by grade (K–8). Kids can leave comments and read reviews — making it genuinely interactive." },
  { name: "Newsela", url: "https://newsela.com/", age: "Ages 8+ · Free (basic)", desc: "Real articles from major outlets rewritten at five reading levels. Great for kids above or below grade — also available in Spanish." },
  { name: "News for Kids", url: "https://newsforkids.net/", age: "Ages 8+ · Free", desc: "Clean, ad-free, and clearly written. Just straightforward summaries of what's happening in the world, written with kids in mind." },
];

function MagCard({ mag }) {
  const { Cover, name, url, meta, desc, tags } = mag;
  return (
    <div style={{ display: "flex", background: "#fff", border: "0.5px solid #e5e4e0", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ width: 115, minWidth: 115, flexShrink: 0 }}><Cover /></div>
      <div style={{ flex: 1, padding: "0.9rem 1.1rem", minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a1a18", textDecoration: "none" }}>{name}</a>
        </div>
        <div style={{ fontSize: 11, color: "#999", marginBottom: 6 }}>{meta}</div>
        <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "#555", marginBottom: 8 }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{tags.map(t => <ResTag key={t.label} label={t.label} style={t.style} />)}</div>
      </div>
    </div>
  );
}

function OnlineCard({ p }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #e5e4e0", borderRadius: 8, padding: "0.85rem 1rem" }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a1a18", textDecoration: "none" }}>{p.name}</a>
      </div>
      <div style={{ fontSize: 11, color: "#999", marginBottom: 5 }}>{p.age}</div>
      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.55 }}>{p.desc}</p>
    </div>
  );
}

function MagazinesArticle() {
  return (
    <div style={{ fontFamily: "system-ui,-apple-system,sans-serif", maxWidth: 680, padding: "0.5rem 0", color: "#1a1a18" }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#E8692A", marginBottom: 8 }}>Resources · Reading & Media</p>
      <h1 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.25, marginBottom: 10 }}>The best news magazines and media for curious kids</h1>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: "#666", marginBottom: "2rem", borderLeft: "3px solid #E8692A", paddingLeft: "1rem" }}>
        Keeping kids informed without overwhelming them is one of the quiet superpowers of good parenting. These magazines and platforms turn today's big stories into age-appropriate, genuinely engaging reads that spark real conversations at the dinner table.
      </p>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#999", marginBottom: 12, paddingBottom: 8, borderBottom: "0.5px solid #e5e4e0" }}>Weekly & monthly print magazines</p>
      {PRINT_MAGAZINES.map(mag => <MagCard key={mag.name} mag={mag} />)}
      <div style={{ height: 1, background: "#e5e4e0", margin: "1.75rem 0" }} />
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#999", marginBottom: 12, paddingBottom: 8, borderBottom: "0.5px solid #e5e4e0" }}>Free online platforms worth bookmarking</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: 10, marginBottom: "1.5rem" }}>
        {ONLINE_PLATFORMS.map(p => <OnlineCard key={p.name} p={p} />)}
      </div>
      <div style={{ background: "#FEF7F2", border: "0.5px solid #f5c9a3", borderRadius: 8, padding: "0.85rem 1.1rem" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#E8692A", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Parent tip</p>
        <p style={{ fontSize: 12.5, color: "#4A1B0C", lineHeight: 1.65 }}>The best way to make news reading stick is to do it together. Pick one story a week from any of these and chat about it over dinner — what surprised you, what questions it raised. Kids who feel their opinions are taken seriously become confident, curious thinkers.</p>
      </div>
      <p style={{ fontSize: 11, color: "#bbb", lineHeight: 1.7, marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "0.5px solid #e5e4e0" }}>
        All magazines listed here are editorially independent. Links go directly to publisher websites. Australian families can subscribe to Nat Geo Kids at natgeokids.com/au and The Week Junior via their UK site, both with home delivery.
      </p>
    </div>
  );
}

const resources = [
  {
    emoji: "📰",
    name: "Best news magazines & media for curious kids",
    org: "KiddiUp · Reading & Media",
    cat: "Reading & Media",
    bg: "#FEF7F2",
    desc: "A curated guide to the best kids' news magazines and free online platforms — from The Week Junior to National Geographic Kids. Spark real dinner-table conversations.",
    article: "magazines",
  },
  {
    emoji: "🔬",
    name: "LabXchange",
    org: "Harvard University & Amgen Foundation",
    cat: "Science & STEM",
    bg: "#EAF4FB",
    desc: "Free virtual science labs and personalised learning pathways developed at Harvard. Students can run simulated experiments — including CRISPR gene editing and molecular biology techniques — without any physical equipment. Ideal for curious kids from middle school through to university level.",
    url: "https://www.labxchange.org/org/labxchange",
  },
];

export default function KiddiUp() {
  const [tab, setTab] = useState("extra-curricular");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [blogCat, setBlogCat] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [buddyPosts, setBuddyPosts] = useState([
    { name: "Sarah M.", suburb: "Mosman", activity: "Swimming", childAge: "5", note: "Looking for swim buddies at Little Dippers! My daughter is 5 and loves the water.", time: "2h ago" },
    { name: "James K.", suburb: "Bondi", activity: "Fencing", childAge: "10", note: "Son just started at Sydney Academy of Fencing — anyone from the eastern suburbs doing fencing? Would love to carpool!", time: "5h ago" },
    { name: "Priya R.", suburb: "Chatswood", activity: "Dance", childAge: "7", note: "My 7-year-old is starting ballet. Looking for other dance mums/dads for after-class playdates!", time: "1d ago" },
    { name: "Tom & Lisa W.", suburb: "Balmain", activity: "Art", childAge: "9", note: "Kids doing Art House Kids — anyone in the Inner West want to share pickups on Saturdays?", time: "2d ago" },
  ]);
  const [buddyForm, setBuddyForm] = useState({ name: "", suburb: "", activity: "", childAge: "", note: "" });
  const [showBuddyForm, setShowBuddyForm] = useState(false);

  const toggleFav = (title) => {
    setFavourites(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const submitBuddy = () => {
    if (!buddyForm.name || !buddyForm.suburb || !buddyForm.activity) return;
    setBuddyPosts(prev => [{ ...buddyForm, time: "Just now" }, ...prev]);
    setBuddyForm({ name: "", suburb: "", activity: "", childAge: "", note: "" });
    setShowBuddyForm(false);
  };

  const filtered = activities.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q) || a.suburb.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q);
    const matchC = !catFilter || a.cat === catFilter;
    if (showSaved) return favourites.includes(a.title);
    return matchQ && matchC;
  });

  const livePosts = blogPosts.filter(p => p.live);
  const filteredBlog = blogCat === "all" ? livePosts : livePosts.filter(p => p.cat === blogCat);

  const navBtn = (id, label) => (
    <button key={id} onClick={() => setTab(id)} style={{
      padding: "0.4rem 0.9rem", border: `1px solid ${tab === id ? "#333" : "#D6D4CF"}`,
      borderRadius: 999, fontSize: "0.8rem", fontWeight: tab === id ? 600 : 500,
      background: "#fff", color: tab === id ? "#111" : "#333", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
    }}>{label}</button>
  );

  const blogCatBtn = (id, label) => (
    <button key={id} onClick={() => setBlogCat(id)} style={{
      padding: "0.32rem 0.85rem", border: `1px solid ${blogCat === id ? "#7B5EA7" : "#D6D4CF"}`,
      borderRadius: 999, fontSize: "0.78rem", background: blogCat === id ? "#7B5EA7" : "#fff",
      color: blogCat === id ? "#fff" : "#444", cursor: "pointer"
    }}>{label}</button>
  );

  const Card = ({ a }) => {
    const isFav = favourites.includes(a.title);
    return (
      <div style={{ background: "#fff", borderRadius: 13, padding: "1rem 1.1rem 0.85rem", border: "1px solid #E8E6E1", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
          <span style={{ display: "inline-block", fontSize: "0.67rem", fontWeight: 600, padding: "0.17rem 0.55rem", borderRadius: 999, ...badgeStyle(a.badge) }}>{a.cat}</span>
          <button onClick={() => toggleFav(a.title)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "1.1rem", lineHeight: 1, marginLeft: "0.5rem", flexShrink: 0 }}>
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
        <div style={{ fontSize: "0.93rem", fontWeight: 700, color: "#111", marginBottom: "0.2rem", lineHeight: 1.35 }}>{a.title}</div>
        <div style={{ fontSize: "0.75rem", color: "#666", marginBottom: "0.28rem" }}>
          {a.suburb} · Ages {a.age} · <span style={{ color: "#333", fontWeight: 600 }}>{a.price}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.4rem" }}>
          <Stars rating={a.rating} />
          <span style={{ fontSize: "0.7rem", color: "#666" }}>({a.rating} · {a.reviews} reviews)</span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#444", lineHeight: 1.5, flex: 1, marginBottom: "0.75rem" }}>{a.desc}</div>
        <div style={{ display: "flex", gap: "0.8rem", borderTop: "1px solid #F0EEE9", paddingTop: "0.6rem" }}>
          {a.web && <a href={a.web} target="_blank" rel="noreferrer" style={iconStyle}><WebIcon /></a>}
          {a.instagram && <a href={a.instagram} target="_blank" rel="noreferrer" style={iconStyle}><IGIcon /></a>}
          {a.facebook && <a href={a.facebook} target="_blank" rel="noreferrer" style={iconStyle}><FBIcon /></a>}
        </div>
      </div>
    );
  };

  const EventCard = ({ e }) => (
    <div style={{ background: "#fff", borderRadius: 13, overflow: "hidden", border: "1px solid #E8E6E1" }}>
      {e.img && <div style={{ height: 140, overflow: "hidden" }}><img src={e.img} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>}
      <div style={{ padding: "1.1rem" }}>
        <span style={{ display: "inline-block", fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: 999, background: "#F0EBF8", color: "#7B5EA7", fontWeight: 500, marginBottom: "0.65rem" }}>{e.badge}</span>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111", marginBottom: "0.25rem" }}>{e.title}</div>
        <div style={{ fontSize: "0.78rem", color: "#666", marginBottom: "0.4rem" }}>{e.venue}</div>
        <div style={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.5, marginBottom: "0.65rem" }}>{e.desc}</div>
        {e.url && <a href={e.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", color: "#7B5EA7", fontWeight: 500 }}>More info →</a>}
      </div>
    </div>
  );

  const s = { padding: "1.75rem 1.25rem" };
  const ph = (h, p) => (
    <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#111", marginBottom: "0.35rem" }}>{h}</h1>
      <p style={{ color: "#666", fontSize: "0.88rem" }}>{p}</p>
    </div>
  );

  return (
    <div style={{ background: "#F2F0EB", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E3DE", padding: "0 1rem", display: "flex", alignItems: "center", gap: "0.6rem", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.5px", flexShrink: 0, background: "linear-gradient(90deg,#7B5EA7,#D4874E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KiddiUp</span>
        <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", flex: 1 }}>
          {navBtn("whats-on", "What's On")}
          {navBtn("school-holidays", "School Holidays")}
          {navBtn("extra-curricular", "Extra-Curricular")}
          {navBtn("buddy-board", "👋 Buddy Board")}
          {navBtn("eduvibe", "EduVibe")}
          {navBtn("resources", "📚 Resources")}
        </div>
      </nav>

      <div style={s}>

        {tab === "whats-on" && (
          <div>
            {ph("What's On in Sydney", "Exhibitions, festivals and family events happening now and coming up.")}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
              {events.map((e, i) => <EventCard key={i} e={e} />)}
            </div>
          </div>
        )}

        {tab === "school-holidays" && (
          <div>
            {ph("School Holiday Programs", "Keep the kids entertained and learning all holidays long.")}
            <div style={{ background: "#fff", borderRadius: 13, padding: "1.2rem", border: "1px solid #E8E6E1", marginBottom: "1.2rem", textAlign: "center" }}>
              <strong style={{ fontSize: "1.05rem" }}>🌟 July School Holidays 2026</strong>
              <p style={{ color: "#666", fontSize: "0.83rem", marginTop: "0.25rem" }}>Sat 27 Jun – Sun 12 Jul 2026 · Sydney & surrounds</p>
              <p style={{ color: "#999", fontSize: "0.75rem", marginTop: "0.15rem" }}>Check individual programs for booking — popular ones sell out weeks ahead</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
              {holidays.map((e, i) => <EventCard key={i} e={e} />)}
            </div>
          </div>
        )}

        {tab === "extra-curricular" && (
          <div>
            {ph("Extra-Curricular Activities", "Weekly classes and programs for kids across Sydney.")}
            <div style={{ background: "linear-gradient(135deg, #FFF5EE 0%, #F0EBF8 100%)", borderRadius: 12, padding: "0.85rem 1.1rem", marginBottom: "1.25rem", borderLeft: "3px solid #FF6B5B", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
              <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                💡 <strong style={{ color: "#333", fontStyle: "normal" }}>It's not about quantity, it's about fit.</strong> Let kids explore broadly in the early years, then as they reach senior school, focus on the activities they love and excel at.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
              <input value={search} onChange={e => { setSearch(e.target.value); setShowSaved(false); }} placeholder="Search activities, suburbs..."
                style={{ flex: 1, minWidth: 0, padding: "0.5rem 0.9rem", border: "1px solid #D6D4CF", borderRadius: 999, fontSize: "0.85rem", background: "#fff", outline: "none" }} />
              <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setShowSaved(false); }}
                style={{ flexShrink: 0, padding: "0.5rem 0.8rem", border: "1px solid #D6D4CF", borderRadius: 999, fontSize: "0.8rem", background: "#fff", cursor: "pointer", outline: "none" }}>
                <option value="">All Categories</option>
                {["Art","Dance","Drama","Fencing","Golf","Gymnastics","Language","Martial Arts","Music","Sailing","STEM","Sport","Swimming"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => setShowSaved(s => !s)}
                style={{ padding: "0.5rem 0.9rem", border: `1px solid ${showSaved ? "#E05A5A" : "#D6D4CF"}`, borderRadius: 999, fontSize: "0.8rem", background: showSaved ? "#FFF0F0" : "#fff", cursor: "pointer", outline: "none", color: showSaved ? "#E05A5A" : "#666", fontWeight: showSaved ? 600 : 400, whiteSpace: "nowrap", flexShrink: 0 }}>
                {showSaved ? `❤️ Saved (${favourites.length})` : "🤍 Saved"}
              </button>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#999", marginBottom: "0.9rem" }}>{filtered.length} activit{filtered.length === 1 ? "y" : "ies"} found</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
              {filtered.map((a, i) => <Card key={i} a={a} />)}
            </div>
          </div>
        )}

        {tab === "buddy-board" && (
          <div>
            {ph("👋 Buddy Board", "Connect with Sydney families doing the same activities as your kids.")}
            <div style={{ maxWidth: 580, margin: "0 auto" }}>
              <button onClick={() => setShowBuddyForm(!showBuddyForm)} style={{ display: "block", margin: "0 auto 1.25rem", padding: "0.6rem 1.4rem", borderRadius: 999, border: "none", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, background: "linear-gradient(90deg,#7B5EA7,#D4874E)", color: "#fff" }}>
                {showBuddyForm ? "Cancel" : "+ Post a buddy request"}
              </button>
              {showBuddyForm && (
                <div style={{ background: "#fff", borderRadius: 14, padding: "1.25rem", border: "1px solid #E8E6E1", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111", marginBottom: "0.9rem" }}>Find a buddy</h3>
                  {[
                    { key: "name", label: "Your name *", ph: "e.g. Sarah M." },
                    { key: "suburb", label: "Suburb *", ph: "e.g. Mosman" },
                    { key: "activity", label: "Activity *", ph: "e.g. Swimming, Dance, Fencing" },
                    { key: "childAge", label: "Child's age", ph: "e.g. 7" },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: "0.65rem" }}>
                      <label style={{ fontSize: "0.75rem", color: "#666", display: "block", marginBottom: "0.2rem" }}>{f.label}</label>
                      <input value={buddyForm[f.key]} onChange={e => setBuddyForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.ph} style={{ width: "100%", padding: "0.5rem 0.8rem", border: "1px solid #D6D4CF", borderRadius: 8, fontSize: "0.83rem", outline: "none", fontFamily: "inherit" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.75rem", color: "#666", display: "block", marginBottom: "0.2rem" }}>Message</label>
                    <textarea value={buddyForm.note} onChange={e => setBuddyForm(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="Tell other families what you're looking for..." rows={3}
                      style={{ width: "100%", padding: "0.5rem 0.8rem", border: "1px solid #D6D4CF", borderRadius: 8, fontSize: "0.83rem", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                  </div>
                  <button onClick={submitBuddy} style={{ padding: "0.55rem 1.4rem", borderRadius: 999, border: "none", cursor: "pointer", background: "linear-gradient(90deg,#7B5EA7,#D4874E)", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>
                    Post request
                  </button>
                </div>
              )}
              {buddyPosts.map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "1.1rem 1.2rem", border: "1px solid #E8E6E1", marginBottom: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.45rem" }}>
                    <div><span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111" }}>{p.name}</span><span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "0.4rem" }}>· {p.suburb}</span></div>
                    <span style={{ fontSize: "0.7rem", color: "#bbb" }}>{p.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.18rem 0.55rem", borderRadius: 999, background: "#F0EBF8", color: "#7B5EA7" }}>{p.activity}</span>
                    {p.childAge && <span style={{ fontSize: "0.7rem", padding: "0.18rem 0.55rem", borderRadius: 999, background: "#F2F0EB", color: "#666" }}>Age {p.childAge}</span>}
                  </div>
                  {p.note && <p style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.55, marginBottom: "0.7rem" }}>{p.note}</p>}
                  <button style={{ fontSize: "0.78rem", color: "#7B5EA7", fontWeight: 600, background: "none", border: "1px solid #D6B8F0", borderRadius: 999, padding: "0.28rem 0.8rem", cursor: "pointer" }}>👋 Connect</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "eduvibe" && (
          <div>
            {/* Hero */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E8E6E1", padding: "2rem 1.75rem", marginBottom: "1.75rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7B5EA7", marginBottom: "0.55rem" }}>Coming soon</div>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: "0.6rem" }}>Expert parenting advice, written by real Sydney professionals</h1>
                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.65, marginBottom: "0.85rem" }}>EduVibe is building a library of honest, research-backed articles for Sydney parents — written by verified child psychologists, paediatricians, educators and family therapists. No fluff, no fake experts.</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#7B5EA7", fontWeight: 600 }}>⏱ First articles dropping soon</span>
                </div>
              </div>
              <div style={{ width: 100, height: 100, background: "#F0EBF8", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", flexShrink: 0 }}>📖</div>
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
              {[["all","All"],["Parenting","Parenting"],["Child Development","Child Development"],["Health & Wellbeing","Health & Wellbeing"],["Education","Education"],["Activity Ideas","Activity Ideas"]].map(([id, label]) => blogCatBtn(id, label))}
            </div>

            {/* Article cards */}
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111", marginBottom: "1rem" }}>Articles in the pipeline</div>
            {selectedArticle ? (
              <div style={{ maxWidth: 660, margin: "0 auto" }}>
                <button onClick={() => setSelectedArticle(null)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#7B5EA7", background: "none", border: "none", cursor: "pointer", padding: "0 0 1.25rem", fontWeight: 600 }}>
                  ← Back to articles
                </button>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.18rem 0.6rem", borderRadius: 999, ...catBlogStyle[selectedArticle.catClass] }}>{selectedArticle.cat}</span>
                  {selectedArticle.source && <span style={{ fontSize: "0.7rem", padding: "0.18rem 0.6rem", borderRadius: 999, background: "#F2F0EB", color: "#666" }}>{selectedArticle.source}</span>}
                  <span style={{ fontSize: "0.7rem", padding: "0.18rem 0.6rem", borderRadius: 999, background: "#F2F0EB", color: "#666" }}>{selectedArticle.read} read</span>
                </div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: "0.5rem" }}>{selectedArticle.title}</h1>
                <p style={{ fontSize: "0.88rem", color: "#888", marginBottom: "2rem", fontStyle: "italic" }}>{selectedArticle.excerpt}</p>
                <div style={{ borderTop: "1px solid #E8E6E1", paddingTop: "1.75rem" }}>
                  {selectedArticle.body && selectedArticle.body.map((block, i) => {
                    if (block.type === "intro") return <p key={i} style={{ fontSize: "1rem", color: "#333", lineHeight: 1.75, marginBottom: "1.5rem" }}>{block.text}</p>;
                    if (block.type === "h2") return <h2 key={i} style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "0.6rem", marginTop: "1.75rem" }}>{block.text}</h2>;
                    if (block.type === "p") return <p key={i} style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.7, marginBottom: "1rem" }}>{block.text}</p>;
                    if (block.type === "ul") return <ul key={i} style={{ paddingLeft: "1.25rem", marginBottom: "1rem" }}>{block.items.map((item, j) => <li key={j} style={{ fontSize: "0.88rem", color: "#444", lineHeight: 1.65, marginBottom: "0.35rem" }}>{item}</li>)}</ul>;
                    return null;
                  })}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(255px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {filteredBlog.map((p, i) => (
                  <div key={i} onClick={p.live ? () => setSelectedArticle(p) : undefined}
                    style={{ background: "#fff", borderRadius: 13, border: "1px solid #E8E6E1", overflow: "hidden", cursor: p.live ? "pointer" : "default" }}>
                    <div style={{ height: 95, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", background: catBlogStyle[p.catClass]?.background || "#F8F6F2" }}>{p.emoji}</div>
                    <div style={{ padding: "0.9rem 1rem 1rem" }}>
                      <span style={{ display: "inline-block", fontSize: "0.66rem", fontWeight: 600, padding: "0.16rem 0.55rem", borderRadius: 999, marginBottom: "0.45rem", ...catBlogStyle[p.catClass] }}>{p.cat}</span>
                      <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: "0.3rem" }}>{p.title}</div>
                      <div style={{ fontSize: "0.76rem", color: "#666", lineHeight: 1.55, marginBottom: "0.65rem" }}>{p.excerpt}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.68rem", color: "#aaa" }}>{p.read} read</span>
                        {p.live
                          ? <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: 999, background: "#F0EBF8", color: "#7B5EA7" }}>Read →</span>
                          : <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: 999, background: "#F2F0EB", color: "#999" }}>Coming soon</span>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contributor callout */}
            <div style={{ background: "#fff", borderRadius: 13, border: "1px solid #E8E6E1", padding: "1.4rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.93rem", fontWeight: 700, color: "#111", marginBottom: "0.4rem" }}>Are you a child health or education professional based in Sydney?</div>
              <p style={{ fontSize: "0.81rem", color: "#555", lineHeight: 1.6, marginBottom: "0.9rem" }}>EduVibe is looking for verified experts to contribute articles and advice. We're building something genuinely useful for Sydney parents — no sponsored content, no fluff.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                {["Child Psychologist","Paediatrician","Paediatric OT","Early Childhood Educator","Family Therapist","School Counsellor","Speech Pathologist","Nutritionist"].map(t => (
                  <span key={t} style={{ fontSize: "0.72rem", padding: "0.2rem 0.65rem", borderRadius: 999, border: "1px solid #E0DED9", color: "#666" }}>{t}</span>
                ))}
              </div>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.81rem", fontWeight: 600, color: "#7B5EA7", background: "none", border: "1px solid #D6B8F0", borderRadius: 999, padding: "0.4rem 1rem", cursor: "pointer" }}>
                ✉ Get in touch
              </button>
            </div>

            {/* Newsletter */}
            <div style={{ background: "#F0EBF8", borderRadius: 13, border: "1px solid #D6B8F0", padding: "1.5rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "0.97rem", fontWeight: 700, color: "#3C3489", marginBottom: "0.35rem" }}>Be first to read new articles</h3>
              <p style={{ fontSize: "0.81rem", color: "#5B3EAC", marginBottom: "1rem" }}>We'll notify you when expert-verified content goes live. No spam, unsubscribe anytime.</p>
              <div style={{ display: "flex", gap: "0.45rem", maxWidth: 340, margin: "0 auto" }}>
                <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "0.48rem 0.9rem", border: "1px solid #D6B8F0", borderRadius: 999, fontSize: "0.81rem", outline: "none", background: "#fff" }} />
                <button style={{ padding: "0.48rem 1.1rem", borderRadius: 999, border: "none", background: "#7B5EA7", color: "#fff", fontSize: "0.81rem", fontWeight: 600, cursor: "pointer" }}>Notify me</button>
              </div>
            </div>
          </div>
        )}

        {tab === "resources" && (
          <div>
            {selectedResource ? (
              <div>
                <button onClick={() => setSelectedResource(null)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#7B5EA7", background: "none", border: "none", cursor: "pointer", padding: "0 0 1.25rem", fontWeight: 600 }}>
                  ← Back to resources
                </button>
                {selectedResource === "magazines" && <MagazinesArticle />}
              </div>
            ) : (
              <>
                {ph("📚 Free Resources", "Handpicked free tools and platforms to support your child's learning.")}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
                  {resources.map((r, i) => (
                    <div key={i} onClick={r.article ? () => setSelectedResource(r.article) : undefined}
                      style={{ background: "#fff", borderRadius: 13, border: "1px solid #E8E6E1", overflow: "hidden", cursor: r.article ? "pointer" : "default" }}>
                      <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.4rem", background: r.bg || "#F8F6F2" }}>{r.emoji}</div>
                      <div style={{ padding: "1rem 1.1rem 1.1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.66rem", fontWeight: 600, padding: "0.16rem 0.55rem", borderRadius: 999, background: "#F0EBF8", color: "#7B5EA7" }}>{r.cat}</span>
                          <span style={{ fontSize: "0.66rem", padding: "0.16rem 0.55rem", borderRadius: 999, background: "#E8F5E9", color: "#2E7D32", fontWeight: 500 }}>FREE</span>
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111", marginBottom: "0.3rem" }}>{r.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#888", marginBottom: "0.5rem", fontStyle: "italic" }}>{r.org}</div>
                        <div style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.6, marginBottom: "0.85rem" }}>{r.desc}</div>
                        {r.article
                          ? <span style={{ fontSize: "0.78rem", color: "#7B5EA7", fontWeight: 600 }}>Read guide →</span>
                          : <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", color: "#7B5EA7", fontWeight: 600, textDecoration: "none" }}>Visit site →</a>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <footer style={{ borderTop: "1px solid #E8E6E1", marginTop: "2rem", padding: "1.5rem 1rem 2rem", textAlign: "center", background: "#FAF9F6" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "0.3rem" }}>KiddiUp</div>
        <div style={{ fontSize: "0.75rem", color: "#999", marginBottom: "0.9rem" }}>Sydney family activities &amp; resources</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
          <a href="mailto:zomes333@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#7B5EA7", textDecoration: "none", fontWeight: 500 }}>
            📧 Contact us
          </a>
          <span title="Instagram — coming soon" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#bbb", fontWeight: 500, cursor: "default" }}>
            📷 Instagram (coming soon)
          </span>
        </div>
      </footer>
    </div>
  );
}
