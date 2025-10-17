export enum Stat {
  Strength = 'STRENGTH',
  Mind = 'MIND',
  Spirit = 'SPIRIT',
  Wealth = 'WEALTH',
  Relation = 'RELATION',
}

export enum Cadence {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Epic = 'EPIC',
}

export enum Verification {
  Self = 'SELF',
  Peer = 'PEER',
  Auto = 'AUTO',
}

export enum Visibility {
    Public = 'PUBLIC',
    Guild = 'GUILD',
}

export interface QuestTemplate {
  id: string;
  title: string;
  description: string;
  statTarget: Stat;
  baseXP: number;
  cadence: Cadence;
  verification: Verification;
  tags: string[];
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    statTarget: Stat;
    goalCount: number;
    startAt: string; // ISO Date string
    endAt: string; // ISO Date string
    visibility: Visibility;
}

export interface GuideSuggestion {
  title: string;
  description: string;
  statTarget: Stat;
}

export type View = 'dashboard' | 'quests' | 'challenges';