import { Footer } from "./_components/footeer";
import { Heading } from "./_components/heading";

const MarketingPage = ()  => {
  return (
   <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center sm:justify-start md:justify-center lm:justify-center  
      text-center-y-8 flex-1 px-6 ">
        <Heading />

      </div>
      <Footer />
   </div>
  );
}

export default MarketingPage