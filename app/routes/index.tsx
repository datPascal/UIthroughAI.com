import FAQ from "./faq";
import CONTACT from "./contact";
import FOOTER from "./footer";
import CUSTOMERQUOTES from "./customerquotes";
import NUMBERS from "./numerstoshare";
import THREEFEATURES from "./3featuresblock";
import HeroHome from "./heroHome";
import HEADERBEFORELOGIN from "./headerBeforeLogin";
import HEROTEXTLEFT from "./heroTextLeft";


export default function Index() {

  return (
    
    <main className="relative min-h-screen bg-white">
      <HEADERBEFORELOGIN />

      <HeroHome/>

      <FOOTER />

    </main>

  );
}