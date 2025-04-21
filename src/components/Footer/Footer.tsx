import React from "react";

import { FooterText } from "../common/Typography";

function Footer() {
  return (
    <footer className="md:px4 bg-background fixed bottom-0 w-full border-t-2 border-t-violet-400 px-2 py-4 text-center text-sm md:text-base dark:border-b-blue-400">
      <FooterText>Made with ❤️ in Melbourne</FooterText>
      <FooterText>® 2016 Broccoli & Co. All rights reserved.</FooterText>
    </footer>
  );
}

export default Footer;
