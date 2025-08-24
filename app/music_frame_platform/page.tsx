"use client";

import React, { useState } from 'react';
import { Play, Plus, Upload, Music, Image, Sparkles, Share, Download, Heart, Eye, MessageCircle, Wand2, Palette, Volume2 } from 'lucide-react';

interface MusicTrack {
  id: number;
  name: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
}

interface Template {
  id: string;
  name: string;
  desc: string;
}

interface FeaturedVideo {
  id: number;
  title: string;
  views: string;
  likes: string;
  creator: string;
  thumbnail: string;
}

const MusicPhotoApp = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState('fade');

  // サンプルデータ
  const musicLibrary: MusicTrack[] = [
    { id: 1, name: '夏の思い出', artist: 'AI Music', duration: '2:30', genre: 'ポップ', mood: '爽やか' },
    { id: 2, name: 'カフェタイム', artist: 'Lofi Creator', duration: '3:15', genre: 'LoFi', mood: 'リラックス' },
    { id: 3, name: '青春', artist: 'Dream Wave', duration: '2:45', genre: 'シンセポップ', mood: 'ノスタルジック' },
    { id: 4, name: '都市の夜', artist: 'City Sounds', duration: '3:00', genre: 'アンビエント', mood: 'クール' }
  ];

  const templates: Template[] = [
    { id: 'fade', name: 'フェード', desc: 'ゆっくりとした切り替え' },
    { id: 'slide', name: 'スライド', desc: 'スムーズな横移動' },
    { id: 'zoom', name: 'ズーム', desc: '写真が拡大して表示' },
    { id: 'vintage', name: 'ヴィンテージ', desc: 'レトロな雰囲気' }
  ];

  const featuredVideos: FeaturedVideo[] = [
    { id: 1, title: '桜の季節', views: '12.5K', likes: '890', creator: 'さくら太郎', thumbnail: '🌸' },
    { id: 2, title: '海辺の思い出', views: '8.3K', likes: '654', creator: '海好きミカ', thumbnail: '🌊' },
    { id: 3, title: 'カフェ巡り', views: '15.2K', likes: '1.2K', creator: 'コーヒー愛好家', thumbnail: '☕' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MusicFrame
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors">
                ログイン
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all">
                無料で始める
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* タブナビゲーション */}
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-2xl mb-8 shadow-sm">
          {[
            { id: 'create', label: '作成', icon: Plus },
            { id: 'discover', label: '発見', icon: Sparkles },
            { id: 'library', label: 'ライブラリ', icon: Image }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white shadow-md text-purple-600' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 作成タブ */}
        {activeTab === 'create' && (
          <div className="space-y-8">
            {/* ヒーローセクション */}
            <div className="text-center py-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                写真に<span className="text-purple-600">音楽</span>をのせて
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                あなたの思い出を美しい動画に変換しましょう
              </p>
            </div>

            {/* ステップ */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. 写真を選ぶ</h3>
                <p className="text-gray-600">お気に入りの写真をアップロードまたは選択</p>
                <div className="mt-4">
                  <button className="w-full py-3 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 transition-colors flex items-center justify-center space-x-2 text-purple-600">
                    <Upload className="w-5 h-5" />
                    <span>写真をアップロード</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Music className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. 音楽を選ぶ</h3>
                <p className="text-gray-600">豊富な楽曲ライブラリから選択</p>
                <div className="mt-4 space-y-2">
                  {musicLibrary.slice(0, 2).map(music => (
                    <div key={music.id} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium">{music.name}</span>
                      </div>
                      <button className="text-xs text-pink-600 hover:underline">選択</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. スタイルを選ぶ</h3>
                <p className="text-gray-600">AIが最適なテンプレートを提案</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {templates.slice(0, 4).map(template => (
                    <button
                      key={template.id}
                      onClick={() => setCurrentTemplate(template.id)}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        currentTemplate === template.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI推奨セクション */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-800">AI がおすすめするスタイル</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">🌸 春の思い出スタイル</h4>
                  <p className="text-sm text-gray-600 mb-3">桜や新緑の写真に最適。優しいトランジションで季節感を演出</p>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors">
                    このスタイルで作成
                  </button>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">🌊 夏のバケーションスタイル</h4>
                  <p className="text-sm text-gray-600 mb-3">海や夏祭りの写真にぴったり。ダイナミックなエフェクトで開放感を表現</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    このスタイルで作成
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 発見タブ */}
        {activeTab === 'discover' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">人気の作品を発見</h2>
              <p className="text-gray-600">みんなが作った素敵な動画をチェック</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredVideos.map(video => (
                <div key={video.id} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {video.thumbnail}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {video.creator}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-pink-500" />
                          <span>{video.likes}</span>
                        </span>
                      </div>
                      <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700">
                        <Play className="w-4 h-4" />
                        <span>再生</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* トレンドタグ */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 トレンドタグ</h3>
              <div className="flex flex-wrap gap-2">
                {['#桜2025', '#卒業式', '#春の思い出', '#カフェ巡り', '#ペット動画', '#旅行記録'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm hover:shadow-md transition-all cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ライブラリタブ */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">マイライブラリ</h2>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                新規作成
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 group">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-3xl">📱</div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">マイビデオ {i}</h4>
                    <p className="text-xs text-gray-500">2025年8月作成</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="flex-1 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors">
                        編集
                      </button>
                      <button className="px-2 py-1 text-xs text-gray-500 hover:text-purple-600 transition-colors">
                        <Share className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 MusicFrame. すべての権利を留保します。</p>
            <p className="text-sm">使用楽曲は全て著作権フリー、またはライセンス許諾済みです。</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MusicPhotoApp;