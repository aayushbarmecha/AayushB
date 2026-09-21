import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {siteConfig.name}.
        </p>
        <div className="flex items-center gap-4">
          {siteConfig.social.github && (
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
              <GithubIcon size={18} />
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
              <LinkedinIcon size={18} />
            </a>
          )}
          <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
            <Mail size={18} />
          </a>
          <Link href="/admin" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
