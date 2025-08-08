-- Missions table
CREATE TABLE IF NOT EXISTS missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_type VARCHAR(20) NOT NULL CHECK (mission_type IN ('tasks', 'points', 'streak', 'level')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  reward_points INTEGER DEFAULT 0,
  reward_badge VARCHAR(100),
  difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  category VARCHAR(20) CHECK (category IN ('growth', 'social', 'consistency', 'achievement')),
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_current INTEGER DEFAULT 0,
  progress_total INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- User stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  level INTEGER DEFAULT 1,
  current_xp INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  last_login_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_missions_user_id ON missions(user_id);
CREATE INDEX IF NOT EXISTS idx_missions_week ON missions(week_start, week_end);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Insert default achievements
INSERT INTO achievements (name, description, icon, rarity, category, requirement_type, requirement_value) VALUES
('新芽', '最初のタスクを完了した', 'sprout', 'common', 'growth', 'tasks_completed', 1),
('成長する木', '10個のタスクを完了した', 'growing-tree', 'rare', 'growth', 'tasks_completed', 10),
('森の守護者', '100個のタスクを完了した', 'forest-guardian', 'epic', 'growth', 'tasks_completed', 100),
('チームワーク', '他のユーザーと協力してタスクを完了した', 'team-player', 'rare', 'social', 'collaborative_tasks', 1),
('メンター', '5人の新規ユーザーをサポートした', 'mentor', 'epic', 'social', 'users_helped', 5),
('継続の始まり', '3日連続でログインした', 'streak-starter', 'common', 'consistency', 'login_streak', 3),
('献身', '30日連続でログインした', 'dedication', 'legendary', 'consistency', 'login_streak', 30),
('レベルアップ', 'レベル2に到達した', 'first-level', 'common', 'achievement', 'level_reached', 2),
('ポイントマスター', '1000ポイントを獲得した', 'point-master', 'epic', 'achievement', 'total_points', 1000)
ON CONFLICT (name) DO NOTHING;
