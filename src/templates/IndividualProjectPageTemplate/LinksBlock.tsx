import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
// @ts-ignore - No types available
import cx from "classnames";

import { Project } from "../../types";

export const VALID_FIELDS = [
  "website",
  "white_paper_url",
  "discord_url",
  "github_url",
  "github_link",
  "coinmarketcap_url",
  "facebook_url",
  "twitter_url",
  "linkedin_url",
] as const;

type LINK_KEYS = typeof VALID_FIELDS[number];
type Links = Pick<Project, LINK_KEYS>;

export default function LinksBlock(props: {
  links: Links;
  className?: string;
}) {
  const { links, className } = props;

  return (
    <div className={cx("rounded border p-2", className)}>
      {Object.entries(links).map(([key, value]) => {
        if (!value) return null;

        return (
          <div key={key} className="flex items-center gap-2 p-2">
            {getIcon(key as LINK_KEYS)}
            <a
              aria-label={`Link to ${value}`}
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-link"
              style={{
                overflowWrap: "anywhere",
              }}
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
