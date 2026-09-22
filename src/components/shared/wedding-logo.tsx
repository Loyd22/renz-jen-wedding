import Image from "next/image";
import logoImage from "../../../public/images/logo-image.png";

interface WeddingLogoProps {
  className?: string;
  sizes?: string;
}

export function WeddingLogo({ className = "h-24 w-24", sizes = "96px" }: WeddingLogoProps) {
  return (
    <Image
      src={logoImage}
      alt="Renz and Jen wedding logo"
      className={`object-contain ${className}`}
      sizes={sizes}
    />
  );
}
