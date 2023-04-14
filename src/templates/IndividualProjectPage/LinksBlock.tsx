import { Project } from "../../types";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GithubIcon from "@mui/icons-material/Github";

export const VALID_FIELDS = [
  "website",
  "white_paper_url",
  "discord_url",
  "github_url",
  "github_link",
  "coinmarketcap_url",
  "other_links",
  "facebook_url",
  "twitter_url",
  "linkedin_url",
] as const;

type LINK_KEYS = typeof VALID_FIELDS[number];
type Links = Pick<Project, LINK_KEYS>;

export default function LinksBlock(props: { links: Links }) {
  return (
    <div className="rounded border p-2">
      {Object.entries(props.links).map(([key, value]) => {
        if (!value) return null;

        return (
          <div key={key} className="flex items-center gap-2 p-2">
            {getIcon(key as LINK_KEYS)}
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-link"
            >
              {value}
            </a>
          </div>
        );
      })}
    </div>
  );
}

function getIcon(linkKey: LINK_KEYS) {
  const source = linkKey.replace(/(_url|_link)/, "");

  if (source === "facebook") {
    return <FacebookIcon />;
  }

  if (source === "twitter") {
    return <TwitterIcon />;
  }

  if (source === "linkedin") {
    return <LinkedInIcon />;
  }

  if (source === "github") {
    return <GithubIcon />;
  }

  if (source === "website") {
    return <LanguageIcon />;
  }

  // Default
  return <LanguageIcon />;
}
