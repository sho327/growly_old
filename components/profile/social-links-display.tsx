"use client"

import { Twitter, Github, Instagram, Linkedin, Globe, LinkIcon } from "lucide-react"

interface SocialLinksDisplayProps {
  socialLinks: {
    twitter?: string
    github?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
  className?: string
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "twitter":
      return <Twitter className="w-4 h-4" />
    case "github":
      return <Github className="w-4 h-4" />
    case "instagram":
      return <Instagram className="w-4 h-4" />
    case "linkedin":
      return <Linkedin className="w-4 h-4" />
    case "website":
      return <Globe className="w-4 h-4" />
    default:
      return <LinkIcon className="w-4 h-4" />
  }
}

export function SocialLinksDisplay({ socialLinks, className = "" }: SocialLinksDisplayProps) {
  const hasSocialLinks = Object.keys(socialLinks).length > 0

  if (!hasSocialLinks) {
    return null
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      {Object.entries(socialLinks).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {getSocialIcon(platform)}
        </a>
      ))}
    </div>
  )
}
