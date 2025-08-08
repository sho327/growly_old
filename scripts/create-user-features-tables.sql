-- User profiles table (extended)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  profile_public BOOLEAN DEFAULT true,
  show_level BOOLEAN DEFAULT true,
  show_achievements BOOLEAN DEFAULT true,
  social_links JSONB DEFAULT '{}',
  customization JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shop items table
CREATE TABLE IF NOT EXISTS shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) CHECK (category IN ('avatar', 'frame', 'background', 'tag')),
  rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  price INTEGER NOT NULL,
  currency VARCHAR(20) CHECK (currency IN ('points', 'premium')),
  preview_url TEXT,
  metadata JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User inventory (purchased items)
CREATE TABLE IF NOT EXISTS user_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES shop_items(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan_type VARCHAR(20) CHECK (plan_type IN ('free', 'premium')),
  status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User notifications settings
CREATE TABLE IF NOT EXISTS user_notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  task_reminders BOOLEAN DEFAULT true,
  achievement_unlocked BOOLEAN DEFAULT true,
  weekly_report BOOLEAN DEFAULT true,
  friend_activity BOOLEAN DEFAULT false,
  promotions BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table (for points and purchases)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) CHECK (type IN ('earn', 'spend', 'purchase', 'refund')),
  amount INTEGER NOT NULL,
  currency VARCHAR(20) CHECK (currency IN ('points', 'premium')),
  description TEXT,
  reference_id UUID, -- Can reference missions, shop items, etc.
  reference_type VARCHAR(50), -- 'mission', 'shop_item', 'achievement', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_shop_items_category ON shop_items(category);
CREATE INDEX IF NOT EXISTS idx_shop_items_featured ON shop_items(featured);
CREATE INDEX IF NOT EXISTS idx_user_inventory_user_id ON user_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- Insert sample shop items
INSERT INTO shop_items (name, description, category, rarity, price, currency, preview_url, featured) VALUES
-- Avatars
('サムライアバター', 'クールなサムライスタイルのアバター', 'avatar', 'rare', 500, 'points', '/placeholder.svg?height=80&width=80&text=Samurai', true),
('ロボットアバター', '未来的なロボットアバター', 'avatar', 'epic', 800, 'points', '/placeholder.svg?height=80&width=80&text=Robot', false),
('ドラゴンアバター', '伝説のドラゴンアバター', 'avatar', 'legendary', 1, 'premium', '/placeholder.svg?height=80&width=80&text=Dragon', false),

-- Frames
('ゴールデンフレーム', '豪華な金色の枠', 'frame', 'rare', 300, 'points', '/placeholder.svg?height=80&width=80&text=Gold', false),
('クリスタルフレーム', '美しいクリスタルの枠', 'frame', 'epic', 600, 'points', '/placeholder.svg?height=80&width=80&text=Crystal', false),
('レインボーフレーム', '虹色に輝く特別な枠', 'frame', 'legendary', 1, 'premium', '/placeholder.svg?height=80&width=80&text=Rainbow', false),

-- Backgrounds
('オーロラ背景', '美しいオーロラの背景', 'background', 'rare', 400, 'points', '/placeholder.svg?height=80&width=80&text=Aurora', false),
('宇宙背景', '神秘的な宇宙の背景', 'background', 'epic', 700, 'points', '/placeholder.svg?height=80&width=80&text=Space', false),

-- Tags
('マスタータグ', '熟練者を示すタグ', 'tag', 'common', 200, 'points', '/placeholder.svg?height=80&width=80&text=Master', false),
('レジェンドタグ', '伝説的な実績を示すタグ', 'tag', 'legendary', 1000, 'points', '/placeholder.svg?height=80&width=80&text=Legend', false)
ON CONFLICT DO NOTHING;
