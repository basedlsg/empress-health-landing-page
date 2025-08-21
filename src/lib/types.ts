export type Stage = "peri" | "post";
export type Focus = "sleep" | "hot-flashes" | "mood";

export interface AskEmpressReq {
  question: string;
  context?: {
    stage?: Stage;
    focus?: Focus;
  };
}

export interface AskEmpressRes {
  answer: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

export interface AffirmationScheduleReq {
  times: string[];
  tone: "calm" | "confident";
  categories?: string[];
}

export interface BasicOk {
  ok: true;
}

export interface CheckinReq {
  hotFlashes: {
    count: number;
    severity: 1 | 2 | 3;
  };
  sleep: 1 | 2 | 3 | 4 | 5;
  mood: 1 | 2 | 3 | 4 | 5;
  adherence: boolean;
  note?: string;
}