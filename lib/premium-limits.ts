export interface PremiumLimits {
  maxOrganizations: number
  maxMembersPerOrganization: number
  canInviteMembers: boolean
  canCreateCustomRoles: boolean
  hasAdvancedAnalytics: boolean
  hasPrioritySupport: boolean
}

export const FREE_LIMITS: PremiumLimits = {
  maxOrganizations: 1,
  maxMembersPerOrganization: 5,
  canInviteMembers: true,
  canCreateCustomRoles: false,
  hasAdvancedAnalytics: false,
  hasPrioritySupport: false,
}

export const PREMIUM_LIMITS: PremiumLimits = {
  maxOrganizations: Number.POSITIVE_INFINITY, // Unlimited
  maxMembersPerOrganization: Number.POSITIVE_INFINITY, // Unlimited
  canInviteMembers: true,
  canCreateCustomRoles: true,
  hasAdvancedAnalytics: true,
  hasPrioritySupport: true,
}

export function getPremiumLimits(isPremium: boolean): PremiumLimits {
  return isPremium ? PREMIUM_LIMITS : FREE_LIMITS
}

export function canCreateOrganization(isPremium: boolean, currentOrgCount: number): boolean {
  const limits = getPremiumLimits(isPremium)
  return currentOrgCount < limits.maxOrganizations
}

export function canInviteMoreMembers(isPremium: boolean, currentMemberCount: number): boolean {
  const limits = getPremiumLimits(isPremium)
  return currentMemberCount < limits.maxMembersPerOrganization
}

export function getOrganizationLimitMessage(isPremium: boolean, currentOrgCount: number): string {
  if (isPremium) {
    return "Premiumユーザーは無制限に組織を作成できます"
  }

  const remaining = FREE_LIMITS.maxOrganizations - currentOrgCount
  if (remaining > 0) {
    return `あと${remaining}個の組織を作成できます`
  }

  return "無料プランでは1つの組織のみ作成可能です。Premiumにアップグレードして無制限に組織を作成しましょう。"
}

export function getMemberLimitMessage(isPremium: boolean, currentMemberCount: number): string {
  if (isPremium) {
    return "Premiumユーザーは無制限にメンバーを招待できます"
  }

  const remaining = FREE_LIMITS.maxMembersPerOrganization - currentMemberCount
  if (remaining > 0) {
    return `あと${remaining}人のメンバーを招待できます`
  }

  return "無料プランでは5人までのメンバーを招待できます。Premiumにアップグレードして無制限に招待しましょう。"
}
