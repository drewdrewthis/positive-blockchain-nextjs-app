import { Project } from "../../types";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/Github";
import LanguageIcon from "@mui/icons-material/Language";

export const VALID_FIELDS = [
  "facebook_url",
  "twitter_url",
  "linkedin_url",
  "github_url",
  "website",
] as const;

type LINK_KEYS = typeof VALID_FIELDS[number];
type Links = Pick<Project, LINK_KEYS>;

export default function LinksBlock(props: { links: Links }) {
  return (
    <div className="rounded border">
      {Object.entries(props.links).map(([key, value]) => {
        if (!value) return null;

        return (
          <div key={key} className="flex items-center gap-2 p-2">
            {getIcon(key as LINK_KEYS)}
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-sm"
            >
              {value}
            </a>
          </div>
        );
      })}
    </div>
  );
}

const icons = {
  "facebook.com": "facebook",
  "twitter.com": "twitter",
  "instagram.com": "instagram",
  "linkedin.com": "linkedin",
  "youtube.com": "youtube",
  "github.com": "github",
};

function getIcon(linkKey: LINK_KEYS) {
  const source = linkKey.replace("_url", "");

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

  return null;
}
