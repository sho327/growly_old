"use client"

import { Twitter, Github, Instagram, Linkedin, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserProfile } from "./types"

interface SettingsSocialLinksProps {
  socialLinks: UserProfile["socialLinks"]
  onSocialLinkUpdate: (platform: string, url: string) => void
}

export function SettingsSocialLinks({ socialLinks, onSocialLinkUpdate }: SettingsSocialLinksProps) {
  return (
    <div className="space-y-4">
      <Label>SNSリンク</Label>
      <div className="grid gap-3">
        <div className="flex items-center gap-3">
          <Twitter className="w-5 h-5 text-blue-500" />
          <Input
            placeholder="https://twitter.com/username"
            value={socialLinks.twitter || ""}
            onChange={(e) => onSocialLinkUpdate("twitter", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 text-gray-800" />
          <Input
            placeholder="https://github.com/username"
            value={socialLinks.github || ""}
            onChange={(e) => onSocialLinkUpdate("github", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-pink-500" />
          <Input
            placeholder="https://instagram.com/username"
            value={socialLinks.instagram || ""}
            onChange={(e) => onSocialLinkUpdate("instagram", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Linkedin className="w-5 h-5 text-blue-600" />
          <Input
            placeholder="https://linkedin.com/in/username"
            value={socialLinks.linkedin || ""}
            onChange={(e) => onSocialLinkUpdate("linkedin", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-green-600" />
          <Input
            placeholder="https://yourwebsite.com"
            value={socialLinks.website || ""}
            onChange={(e) => onSocialLinkUpdate("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
